"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { IUser, IVideo } from "@/types";
import { NoResults } from "@/app/components/NoResults";
import { useParams } from "next/navigation";
import { MdVerified, MdVideocamOff } from "react-icons/md";
import { VideoCard } from "@/app/components/VideoCard";

function ProfilePageContent() {
  const { id } = useParams();
  const [user, setUser] = useState<IUser | null>(null);
  const [userVideos, setUserVideos] = useState<IVideo[]>([]);
  const [userLikedVideos, setUserLikedVideos] = useState<IVideo[]>([]);
  const [showUserVideos, setShowUserVideos] = useState(true);
  const [videosList, setVideosList] = useState<IVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const videos = showUserVideos ? "border-b-2 border-black" : "text-gray-400";
  const liked = !showUserVideos ? "border-b-2 border-black" : "text-gray-400";

  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/users/${id}`);
        if (!res.ok) {
          throw new Error("Error fetching user data");
        }
        const data = await res.json();
        setUser(data.user);
        setUserVideos(data.userVideos);
        setUserLikedVideos(data.userLikedVideos);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchDataUser();
    }
  }, [id, showUserVideos]);

  useEffect(() => {
    if (showUserVideos) {
      setVideosList(userVideos);
    } else {
      setVideosList(userLikedVideos);
    }
  }, [showUserVideos, userLikedVideos, userVideos]);

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-xl font-bold text-gray-500">Usuario no encontrado</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-4 mt-2 flex w-full gap-6 bg-white md:gap-8">
        <div className="flex h-12 w-12 items-center justify-center md:h-28 md:w-28">
          <Image
            src={user.image}
            alt="User profile"
            width={100}
            height={100}
            className="rounded-full"
            priority
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="flex items-center justify-center gap-1 text-base font-bold lowercase tracking-wider text-primary md:text-xl">
            {user.userName.replaceAll(" ", "")}
            <MdVerified className="text-md text-blue-500" />
          </p>
          <p className="text-xs capitalize text-gray-400 md:text-lg">
            {user.userName}
          </p>
        </div>
      </div>

      <div>
        <div className="mb-10 mt-10 flex w-full gap-2 border-b-2 border-gray-200 bg-white">
          <p
            className={`mx-5 mt-2 cursor-pointer text-lg font-semibold ${videos}`}
            onClick={() => setShowUserVideos(true)}
          >
            Videos
          </p>
          <p
            className={`mx-5 mt-2 cursor-pointer text-lg font-semibold ${liked}`}
            onClick={() => setShowUserVideos(false)}
          >
            Me gusta
          </p>
        </div>

        <div className="flex flex-wrap gap-6 md:justify-start">
          {videosList.length > 0 ? (
            videosList.map((post: IVideo, idx: number) => (
              <VideoCard key={idx} post={post} />
            ))
          ) : (
            <NoResults
              text={`${showUserVideos ? "Aún no has subido ningun video" : "Aún no hay videos que te gusten"}`}
              icon={MdVideocamOff}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
        </div>
      }
    >
      <ProfilePageContent />
    </Suspense>
  );
}
