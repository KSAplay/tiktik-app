"use client";

import { Suspense } from "react";
import { IVideo } from "@/types";
import { useState, useEffect } from "react";
import { VideoCard } from "@/app/components/VideoCard";
import { NoResults } from "./components/NoResults";
import { MdVideocamOff } from "react-icons/md";
import { ClientSearchParams } from "./components/ClientSeartchParams";

export default function HomeContent() {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const topicParams = ClientSearchParams();
  const topicQuery = topicParams.get("topic");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = topicQuery
          ? `/api/discover?topic=${topicQuery}`
          : "/api/post";
        const response = await fetch(endpoint);
        const result = await response.json();
        setVideos(result);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
      }
    };

    fetchData();
  }, [topicQuery]);

  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
        </div>
      }
    >
      <div className="flex h-full w-full flex-col gap-10 p-10">
        {videos.length ? (
          videos.map((video: IVideo) => (
            <VideoCard post={video} key={video._id} />
          ))
        ) : (
          <NoResults text="No hay videos disponibles" icon={MdVideocamOff} />
        )}
      </div>
    </Suspense>
  );
}
