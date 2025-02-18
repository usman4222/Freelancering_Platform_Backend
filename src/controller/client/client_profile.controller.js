import { catchAsyncErrors } from "../../middlewares/catchAsyncErrors.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import ClientModel from "../../models/client_profile.model.js"; // Adjust the path to your model
import { UserModel } from "../../models/user.model.js";

export const updateClientProfile = catchAsyncErrors(async (req, res, next) => {
  const {
    image,
    fullname,
    email,
    website,
    whatsappNumber,
    country,
    state,
    friendlyAddress,
    introduceYourself,
    instagram,
    linkedin,
    facebook,
    twitter,
  } = req.body;


  if (fullname || email) {

  }


  const client = await ClientModel.create({
    image,
    website,
    whatsappNumber,
    country,
    state,
    friendlyAddress,
    introduceYourself,
    social: {
      instagram,
      linkedin,
      facebook,
      twitter,
    }
  });

  console.log("clinet :- ", client);
  console.log("user :- ", req?.user);

  await UserModel.findByIdAndUpdate(req?.user?._id, {
    clientProfile: client?._id,
    ...(fullname ? { fullname } : {}),
    ...(email ? { email } : {})
  })

  const { password, ...resUser } = (await UserModel.findById(req?.user?._id).populate("clientProfile") ?? {}).toJSON();

  res
    .status(201)
    .json(ApiResponse(true, "Client created successfully", { profile: resUser }));
});
