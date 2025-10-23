import nodemailer from "nodemailer";
import config from "../config";

export const sendEmail = async (to:string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: config.NODE_ENV === 'production', // true for 465, false for other ports
    auth: {
      user: "a.s.m.merajujjaman.meraj@gmail.com",
      pass: "swjd joih arge stgr",
    },
  });

  await transporter.sendMail({
    from: '"Meraj-University" <a.s.m.merajujjaman.meraj@gmail.com>',
    to,
    subject: "Reset your password within 10 minutes", // Subject line
    text: '', // plain‑text body
    html
  });
};
