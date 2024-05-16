'use server';

import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import { render } from '@react-email/components';

const trans = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

export async function hashPassword(password: string) {
  return bcrypt.hash(password, await bcrypt.genSalt());
}

export async function sendEmail({
  to,
  subject,
  react,
}: {
  to: string[];
  subject: string;
  react: React.ReactElement;
}) {
  try {
    await trans.sendMail({
      from: `"Catalog No Reply" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html: render(react),
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return { error: true };
  }
}
