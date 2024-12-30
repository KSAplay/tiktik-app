import { client } from '@/app/utils/client';

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const user = await request.json();
  await client.createIfNotExists(user);
  return NextResponse.json('Login successful');
}