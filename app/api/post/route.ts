import { client } from '@/app/utils/client';
import { allPostsQuery } from '@/app/utils/queries';
import { NextResponse } from 'next/server';

export async function GET() {
  const query = allPostsQuery();
  const data = await client.fetch(query);
  return NextResponse.json(data);
}