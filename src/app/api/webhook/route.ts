import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const url = new URL(req.nextUrl).searchParams;

  console.log(url);
}
