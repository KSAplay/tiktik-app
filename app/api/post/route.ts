import { client } from '@/app/utils/client';
import { allPostsQuery } from '@/app/utils/queries';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const query = allPostsQuery();
    const data = await client.fetch(query);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Something went wrong", details: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = await client.create(body);
    return NextResponse.json(data, { status: 201 });

  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post", details: String(error) },
      { status: 500 }
    );
  }
}