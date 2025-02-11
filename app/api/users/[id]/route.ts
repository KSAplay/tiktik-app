import { singleUserQuery, userCreatedPostsQuery, userLikedPostsQuery } from "@/app/utils/queries";
import { NextResponse } from "next/server";
import { client } from "@/app/utils/client";

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
    const user = await client.fetch(singleUserQuery(id));
    const userVideos = await client.fetch(userCreatedPostsQuery(id));
    const userLikedVideos = await client.fetch(userLikedPostsQuery(id));

    if (!user) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json({ user: user[0], userVideos, userLikedVideos }, { status: 200 });

  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    return NextResponse.json(
      { message: "Error al obtener el usuario" },
      { status: 500 }
    );
  }
}