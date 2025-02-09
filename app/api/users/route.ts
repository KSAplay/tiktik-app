import { client } from '@/app/utils/client';
import { allUsersQuery } from '@/app/utils/queries';
import { NextResponse } from 'next/server';

export async function GET() {
  const users = await client.fetch(allUsersQuery());
  return users ? NextResponse.json(users) : NextResponse.json([]);
}