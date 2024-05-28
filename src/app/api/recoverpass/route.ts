import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function GET({ nextUrl }: NextRequest) {
  const { searchParams } = nextUrl;

  const token = searchParams.get('token');

  if (!token) {
    return Response.redirect(
      new URL(
        '/api/error?type=token validation&message=token no encontrado',
        nextUrl,
      ),
      400,
    );
  }

  cookies().set('recover_token', token, {
    httpOnly: true,
  });

  return Response.redirect(new URL(`/login/recoverpass`, nextUrl));
}
