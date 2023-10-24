import { RequestHandler } from "express";
import nodemailer from "nodemailer";
import { CreateUser } from "#/@types/user";
import User from "#/models/user";
import { MAILTRAP_PASS, MAILTRAP_USER } from "#/utils/variables";
import emailVerificationToken from "#/models/emailVerificationToken";
import { generateToken } from "#/utils/helper";

export const create: RequestHandler = async (req: CreateUser, res) => {
  const { email, password, name } = req.body;
  const user = await User.create({ name, email, password });

  // send verification email
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: MAILTRAP_USER,
      pass: MAILTRAP_PASS,
    },
  });

  const token = generateToken();
  await emailVerificationToken.create({
    owner: user._id,
    token,
  });

  transport.sendMail({
    to: user.email,
    from: "chakravarthy.8328@gmail.com",
    html: `<h1>your verification token ${token}</h1>`,
  });

  res.status(201).json({ user });
};
