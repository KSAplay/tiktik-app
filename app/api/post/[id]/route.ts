import { client } from "@/app/utils/client";
import { postDetailQuery } from "@/app/utils/queries";
import { NextResponse } from "next/server";
import { v4 as uuid_v4 } from "uuid";

export async function GET(req: Request, { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { message: "ID no proporcionado" },
      { status: 400 }
    );
  }

  try {
    // Construye la consulta con el ID
    const query = postDetailQuery(id);
    const data = await client.fetch(query);

    // Si no hay datos, devolver un 404
    if (!data || data.length === 0) {
      return NextResponse.json(
        { message: "Post no encontrado" },
        { status: 404 }
      );
    }
    // Devuelve el primer elemento encontrado
    return NextResponse.json(data[0], { status: 200 });

  } catch (error) {
    console.error("Error al obtener el post:", error);
    return NextResponse.json(
      { message: "Error al obtener los detalles del post" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { comment, userId } = await req.json();
    const { id } = params;
    const data = await client
      .patch(id)
      .setIfMissing({ comments: [] })
      .insert('after', 'comments[-1]', [
        {
          comment,
          _key: uuid_v4(),
          postedBy: { _ref: userId },
        },
      ])
      .commit();
    return NextResponse.json(data);

  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Failed to create comment", details: String(error) },
      { status: 500 }
    );
  }
}