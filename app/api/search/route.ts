import { NextResponse } from 'next/server';
import { searchPostsQuery } from '@/app/utils/queries';
import { client } from '@/sanity/lib/client';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json(
      { message: 'No search query provided' },
      { status: 400 }
    );
  }

  try {
    const posts = await client.fetch(searchPostsQuery(query));
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error('Error fetching search results:', error);
    return NextResponse.json(
      { message: 'Error fetching search results' },
      { status: 500 }
    );
  }
}