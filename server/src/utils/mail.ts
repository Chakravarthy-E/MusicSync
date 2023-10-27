import nodemailer from "nodemailer";
import path from "path";
import {
  MAILTRAP_PASS,
  MAILTRAP_USER,
  VERIFICATION_EMAIL,
} from "#/utils/variables";
import emailVerificationToken from "#/models/emailVerificationToken";
import { generateTemplate } from "#/mail/templete";

const generateMailTransporter = () => {
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: MAILTRAP_USER,
      pass: MAILTRAP_PASS,
    },
  });

  return transport;
};

interface Profile {
  name: string;
  email: string;
  userId: string;
}

export const sendVerificationMail = async (token: string, profile: Profile) => {
  const transport = generateMailTransporter();

  const { name, email, userId } = profile;
  await emailVerificationToken.create({
    owner: userId,
    token,
  });

  const welocomeMessage = `Hi ${name} Welcome to MusicSync! There are so much thing that we do for verified users.Use the given OTP to verify your email`;

  transport.sendMail({
    to: email,
    from: VERIFICATION_EMAIL,
    subject: "Welcome message",
    html: generateTemplate({
      title: "Welcome to MusicSync",
      message: welocomeMessage,
      logo: "cid:logo",
      banner: "cid:welcome",
      link: "#",
      btnTitle: token,
    }),
    attachments: [
      {
        filename: "logo.png",
        path: path.join(__dirname, "../mail/logo.png"),
        cid: "logo",
      },
      {
        filename: "welcome.png",
        path: path.join(__dirname, "../mail/welcome.png"),
        cid: "welcome",
      },
    ],
  });
};
