import { client } from '@/app/utils/client';
import { NextResponse } from 'next/server';
import { v4 as uuid_v4 } from "uuid";

export async function POST(req: Request) {
  const { userId, postId, like } = await req.json();

  const data =
    like ? await client
      .patch(postId)
      .setIfMissing({ likes: [] })
      .insert('after', 'likes[-1]', [
        {
          _key: uuid_v4(),
          _ref: userId,
        },
      ])
      .commit()
      : await client
        .patch(postId)
        .unset([`likes[_ref=="${userId}"]`])
        .commit();

  return NextResponse.json(data);
}
