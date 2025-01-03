"use client";

import { Video } from "@/types";
import { useState, useEffect } from "react";
import { VideoCard } from "./components/VideoCard";
import { NoResult } from "./components/NoResult";

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/api/post");
      const result = await response.json();
      setVideos(result);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-10 videos h-full">
      {videos.length ? (
        videos.map((video: Video) => <VideoCard post={video} key={video._id} />)
      ) : (
        <NoResult text="No hay videos disponibles" />
      )}
    </div>
  );
}
