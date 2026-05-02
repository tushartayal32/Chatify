import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwtToken", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    httpOnly: true, //prevent xss attack: cross site attack
    sameSite: "strict", // prevent CSRF attack: cross site request forgery
    secure: process.env.NODE_ENV === "development" ? false : true, // Use secure cookies in production
  });
};
