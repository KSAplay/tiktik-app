"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { MdVerified } from "react-icons/md";
import Image from "next/image";
import { Video } from "@/types";
import Link from "next/link";
import { MdOutlineCancel } from "react-icons/md";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";

export default function DetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          setLoading(true);
          const res = await fetch(`/api/post/${id}`); // Llama al endpoint API con el ID dinámico
          if (!res.ok) {
            throw new Error("Error fetching post details");
          }
          const data = await res.json();
          setPost(data); // Actualiza el estado con los datos del post
        } catch (error) {
          console.error("Error fetching post:", error);
        } finally {
          setLoading(false); // Termina la carga
        }
      };

      fetchPost();
    }
  }, [id]);

  const onVideoClick = () => {};

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Cargando...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>No se encontró el video.</p>
      </div>
    );
  }

  return (
    <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
      <div className="relative flex-2 w-[900px] lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center">
        <div className="absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
          <p>
            <MdOutlineCancel className="text-white text-[35px]" />
          </p>
        </div>
        <div className="relative">
          <div className="lg:h-[100vh] h-[60vh]">
            <video
              ref={videoRef}
              onClick={onVideoClick}
              src={post.video.asset.url}
              className="h-full cursor-pointer"
            ></video>
          </div>

          <div className="absolute top-[45%] left-[45%] cursor-pointer">
            {!playing && (
              <button type="button" onClick={onVideoClick}>
                <BsFillPlayFill className="text-white text-6xl lg:text-8xl" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
