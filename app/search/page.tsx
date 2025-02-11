"use client";

import { IVideo } from "@/types";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { VideoCard } from "../components/VideoCard";
import { NoResults } from "../components/NoResults";
import { MdVideocamOff } from "react-icons/md";

export default function Search() {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/search?q=${searchQuery}`);
        const result = await response.json();
        setVideos(result);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchQuery) {
      fetchData();
    }
  }, [searchQuery]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 h-full w-full p-10">
      {videos.length ? (
        videos.map((video: IVideo) => (
          <VideoCard post={video} key={video._id} />
        ))
      ) : (
        <NoResults text="No hay videos disponibles" icon={MdVideocamOff} />
      )}
    </div>
  );
}
