import { NextResponse } from 'next/server';
import { topicPostsQuery } from '@/app/utils/queries';
import { client } from '@/app/utils/client';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('topic');

  if (!query) {
    return NextResponse.json(
      { message: 'No se ha proporcionado un topic' },
      { status: 400 }
    );
  }

  try {
    const posts = await client.fetch(topicPostsQuery(query));
    return NextResponse.json(posts, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: 'Error al obtener los resultados de la búsqueda' },
      { status: 500 }
    );
  }
}