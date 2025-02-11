"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IUser, IVideo } from "@/types";
import { NoResults } from "@/app/components/NoResults";
import { useParams } from "next/navigation";
import { VideoCard } from "@/app/components/VideoCard";
import { MdVerified, MdVideocamOff } from "react-icons/md";

const ProfilePage = () => {
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
      <div className="flex justify-center items-center h-full w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <p className="text-xl font-bold text-gray-500">Usuario no encontrado</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex gap-6 md:gap-8 mt-2 mb-4 bg-white w-full">
        <div className="flex items-center justify-center w-12 h-12 md:w-28 md:h-28">
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
          <p className="md:text-xl tracking-wider flex gap-1 items-center justify-center text-base font-bold text-primary lowercase">
            {user.userName.replaceAll(" ", "")}
            <MdVerified className="text-blue-500 text-md" />
          </p>
          <p className="capitalize md:text-lg text-gray-400 text-xs">
            {user.userName}
          </p>
        </div>
      </div>

      <div>
        <div className="flex gap-2 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
          <p
            className={`text-lg font-semibold cursor-pointer mt-2 mx-5 ${videos}`}
            onClick={() => setShowUserVideos(true)}
          >
            Videos
          </p>
          <p
            className={`text-lg font-semibold cursor-pointer mt-2 mx-5 ${liked}`}
            onClick={() => setShowUserVideos(false)}
          >
            Me gusta
          </p>
        </div>

        <div className="flex gap-6 flex-wrap md:justify-start">
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
};

export default ProfilePage;
