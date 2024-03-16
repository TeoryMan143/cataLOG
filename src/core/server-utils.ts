'use server';

import bcrypt from 'bcrypt';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function hashPassword(password: string) {
  return bcrypt.hash(password, await bcrypt.genSalt());
}

export async function sendEmail(props: {
  to: string[];
  subject: string;
  react: any;
}) {
  try {
    const data = await resend.emails.send({
      from: 'cataLOG <noreplycatalog@resend.dev>',
      ...props,
    });

    return data;
  } catch (error) {
    return { error };
  }
}
