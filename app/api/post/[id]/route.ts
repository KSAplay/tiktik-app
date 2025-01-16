import { client } from "@/app/utils/client";
import { postDetailQuery } from "@/app/utils/queries";
import { NextResponse } from "next/server";

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