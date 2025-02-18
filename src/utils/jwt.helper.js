import jwt from "jsonwebtoken";

function getJwtKey() {
  return process.env.JWT_SECRET_KEY;
}

export const generateJwtToken = ({ data, exp = "1h" }) => {
  const secretKey = getJwtKey();

  const options = { expiresIn: exp };

  return jwt.sign(data, secretKey, options);
};

export const verifyJwtToken = (token) => {
  const secretKey = getJwtKey();

  return jwt.verify(token, secretKey);
};

export const decodeJwtToken = (token) => {
  const secretKey = getJwtKey();

  return jwt.decode(token, secretKey);
};
