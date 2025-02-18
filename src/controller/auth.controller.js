import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorHandler.js";
import { UserModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateJwtToken } from "../utils/jwt.helper.js";
import jwt from "jsonwebtoken";
import { USER_ROLE } from "../config/enums/enums.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { sendMail } from "../config/NodeMailer.js";
import otpGenerator from 'otp-generator'
import { OTP } from "../models/otpModel.js";

export const registerClient = catchAsyncErrors(async (req, res, next) => {
  const { fullname, email, password, otp } = req.body;

  const user = await UserModel.exists({ email });

  if (Boolean(user)) {
    return next(new ErrorHandler("Client already exists", 400));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const userInstance = new UserModel({
    fullname,
    email,
    password: hashedPassword,
    role: USER_ROLE.CLIENT,
  });

  const savedUser = (await userInstance.save()).toJSON();

  const token = generateJwtToken({
    data: {
      role: savedUser?.role,
      email: savedUser?.email,
      type: USER_ROLE.CLIENT,
    },
    exp: "30m",
  });


  // Find the most recent OTP for the email
  const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
  if (response.length === 0 || otp !== response[0].otp) {
    return res.status(400).json({
      success: false,
      message: 'The OTP is not valid',
    });
  }


  // const verificationUrl = `https://malls11.com/api/auth/verify-client?token=${token}`;

  // sendMail({
  //   to: email,
  //   subject: "Please verify your Client Account",
  //   text: `Please visit this link to verify your account : ${verificationUrl}`,
  // });

  const { password: dummyPass, ...resUser } = savedUser;
  res
    .status(201)
    .json(ApiResponse(true, "Verify link has been sent.", { user: resUser, token }));
});





export const sendOTP = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email } = req.body;
    // Check if user is already present
    const checkUserPresent = await UserModel.findOne({ email });
    // If user found with provided email
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: 'User is already registered',
      });
    }
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    let result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
      result = await OTP.findOne({ otp: otp });
    }
    const otpPayload = { email, otp };
    console.log("🛠 OTP Payload Before Saving:", otpPayload);
    const otpBody = await OTP.create(otpPayload);
    console.log("✅ OTP saved to DB:", otpBody);

    res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
      otp,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
})



export const registerAdmin = catchAsyncErrors(async (req, res, next) => {
  const { fullname, email, password } = req.body;
  const user = await UserModel.exists({ email });

  if (user) {
    return next(new ErrorHandler("User with this email already exists", 400));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const userInstance1 = await UserModel.create({
    fullname,
    email,
    password: hashedPassword,
    role: USER_ROLE.ADMIN,
    isVerified: true,
  });

  const savedUser = (await userInstance1.save()).toJSON();

  const { password: dummyPass, ...restUser } = savedUser;

  return res
    .status(201)
    .json(ApiResponse(true, "Admin created", { user: restUser }));
});

export const registerFreelancer = catchAsyncErrors(async (req, res, next) => {
  const { fullname, email, password } = req.body;
  const user = await UserModel.exists({ email });

  if (user) {
    return next(new ErrorHandler("Freelancer already exists", 400));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const userInstance2 = await UserModel.create({
    fullname,
    email,
    password: hashedPassword,
    role: USER_ROLE.FREELANCER,
  });

  const savedUser = (await userInstance2.save()).toJSON();

  const token = generateJwtToken({
    data: {
      role: savedUser?.role,
      email: savedUser?.email,
      type: USER_ROLE.FREELANCER,
    },
    exp: "30m",
  });

  const verificationUrl = `https://malls11.com/api/auth/verify-freelancer?token=${token}`;

  console.log(verificationUrl);

  sendMail({
    to: email,
    subject: "Please verify your Freelancer Account",
    text: `Please visit this link to verify your account : ${verificationUrl}`,
  });
  const { password: dummyPass, ...resUser } = savedUser;
  return res
    .status(201)
    .json(ApiResponse(true, "Freelancer created", { user: resUser, token }));
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  const resUser = await UserModel.findOne({
    email,
  })
    .lean()
    .exec();

  if (!resUser) {
    return next(new ErrorHandler("User not found", 404));
  }

  const { password: savedPassword, ...user } = resUser;

  const isPasswordMatched = await bcrypt.compare(password, savedPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const token = generateJwtToken({
    data: {
      role: user?.role,
      email: user?.email,
    },
    exp: "7d",
  });

  return res
    .status(200)
    .json(ApiResponse(true, "Login successfully", { user, token }));
});


export const verifyClient = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.query;

  if (!token) {
    return next(new ErrorHandler("Token is required", 400));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  if (decoded.type !== USER_ROLE.CLIENT) {
    return next(new ErrorHandler("Invalid token", 400));
  }

  const alReadyVerifiedClient = await UserModel.exists({
    email: decoded.email,
    isVerified: true,
  });

  if (alReadyVerifiedClient !== null) {
    return next(new ErrorHandler("Client is already verified", 409));
  }

  await UserModel.findOneAndUpdate(
    { email: decoded.email },
    { isVerified: true }
  );

  return res
    .status(200)
    .json(ApiResponse(true, "Client verified successfully!", null));
});

export const verifyFreelancer = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.query;

  if (!token) {
    return next(new ErrorHandler("Token is required", 400));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  if (decoded.type !== USER_ROLE.FREELANCER) {
    return next(new ErrorHandler("Invalid token", 400));
  }

  const allReadyVerifiedSeller = await UserModel.exists({
    email: decoded.email,
    isVerified: true,
  });

  if (Boolean(allReadyVerifiedSeller)) {
    return next(new ErrorHandler("Freelancer Allready Verified", 409));
  }

  await UserModel.findOneAndUpdate(
    { email: decoded.email },
    { isVerified: true }
  );

  return res
    .status(200)
    .json(ApiResponse(true, "Freelancer verified successfully!", { decoded }));
});
