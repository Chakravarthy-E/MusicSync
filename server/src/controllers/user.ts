import { RequestHandler } from "express";
import crypto from "crypto";
import { CreateUser, VerifyEmailRequest } from "#/@types/user";
import User from "#/models/user";
import { generateToken } from "#/utils/helper";
import {
  sendForgetPasswordLink,
  sendPassResetSuccessEmail,
  sendVerificationMail,
} from "#/utils/mail";
import EmailVerificationToken from "#/models/emailVerificationToken";
import PasswordResetToken from "#/models/passwordResetToken";
import { isValidObjectId } from "mongoose";
import { PASSWORD_RESET_LINK } from "#/utils/variables";

//==> Create User

export const create: RequestHandler = async (req: CreateUser, res) => {
  const { email, password, name } = req.body;
  const user = await User.create({ name, email, password });

  const token = generateToken();
  await EmailVerificationToken.create({
    owner: user._id,
    token,
  });

  sendVerificationMail(token, { name, email, userId: user._id.toString() });

  res.status(201).json({ user: { id: user._id, email } });
};

//==> Verify Email
export const verifyEmail: RequestHandler = async (
  req: VerifyEmailRequest,
  res
) => {
  const { token, userId } = req.body;
  const verificationToken = await EmailVerificationToken.findOne({
    owner: userId,
  });

  if (!verificationToken) {
    return res.status(403).json({ error: "Invalid token!" });
  }

  const matched = await verificationToken.compareToken(token);
  if (!matched) {
    return res.status(403).json({ error: "Invalid token!" });
  }

  // If verification is successful, update the user and delete the token
  await User.findByIdAndUpdate(userId, {
    verified: true,
  });

  await EmailVerificationToken.findByIdAndDelete(verificationToken._id);

  // Send a success response
  return res.json({ message: "Your email is verified" });
};

// Resend Verification token
export const sendVerificationToken: RequestHandler = async (req, res) => {
  const { userId } = req.body;

  if (!isValidObjectId(userId)) {
    return res.status(403).json({ message: "Invalid request" });
  }

  const user = await User.findById(userId);

  if (!user) {
    return res.status(403).json({ message: "Invalid request" });
  }

  await EmailVerificationToken.findOneAndDelete({
    owner: userId,
  });

  const token = generateToken();

  await EmailVerificationToken.create({
    owner: userId,
    token,
  });

  sendVerificationMail(token, {
    name: user?.name,
    email: user?.email,
    userId: user?._id.toString(),
  });

  res.json({ message: "Please check your mail!" });
};

//==> Forget password

export const generateForgetPassword: RequestHandler = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ error: "Account not found" });

  await PasswordResetToken.findOneAndDelete({
    owner: user._id,
  });

  const token = crypto.randomBytes(36).toString("hex");

  await PasswordResetToken.create({
    owner: user._id,
    token,
  });

  const resetLink = `${PASSWORD_RESET_LINK}?token=${token}&userId=${user._id}`;

  sendForgetPasswordLink({ email: user.email, link: resetLink });
  res.json({ message: "Check your registered mail." });
};

export const isValidPassResetToken: RequestHandler = async (req, res) => {
  const { token, userId } = req.body;

  const resetToken = await PasswordResetToken.findOne({
    owner: userId,
  });

  if (!resetToken)
    return res
      .status(403)
      .json({ error: "Unauthorized access, invalid token" });
  const matched = await resetToken.compareToken(token);

  if (!matched)
    return res
      .status(403)
      .json({ error: "Unauthorized access, invalid token" });

  res.json({ message: "Your token is valid" });
};
export const grantValid: RequestHandler = async (req, res) => {
  res.json({ valid: true });
};

export const updatePassword: RequestHandler = async (req, res) => {
  const { password, userId } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(403).json({ error: "unauthorize access" });
  const matched = await user.comparePassword(password);
  if (matched)
    return res
      .status(422)
      .json({ error: "The new password much be different" });

  user.password = password;
  await user.save();

  await PasswordResetToken.findOneAndDelete({ owner: user._id });

  sendPassResetSuccessEmail(user.name, user.email);
  res.json({ message: "Password Reset Succssfully!" });
};