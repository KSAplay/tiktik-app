"use client";

import { IUser, IVideo } from "@/types";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { VideoCard } from "@/app/components/VideoCard";
import { NoResults } from "../components/NoResults";
import { MdVideocamOff, MdNoAccounts, MdVerified } from "react-icons/md";
import useAuthStore from "@/store/authStore";

export default function Search() {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const searchQuery: string = searchParams.get("q") || "";
  const [showAccount, setShowAccounts] = useState(false);
  const { allUsers } = useAuthStore();

  const accountStyle = showAccount
    ? "border-b-2 border-black"
    : "text-gray-400";
  const videoStyle = !showAccount ? "border-b-2 border-black" : "text-gray-400";

  const searchAccounts = allUsers.filter((user: IUser) =>
    user.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    <div className="w-full">
      <div className="flex gap-2 mb-4 mt-10 border-b-2 border-gray-200 bg-white w-full">
        <p
          className={`text-lg font-semibold cursor-pointer mt-2 mx-5 ${accountStyle}`}
          onClick={() => setShowAccounts(true)}
        >
          Cuentas
        </p>
        <p
          className={`text-lg font-semibold cursor-pointer mt-2 mx-5 ${videoStyle}`}
          onClick={() => setShowAccounts(false)}
        >
          Videos
        </p>
      </div>

      {showAccount ? (
        <div className="mt-5 flex flex-wrap gap-6 md:justify-start">
          {searchAccounts.length > 0 ? (
            searchAccounts.map((user: IUser, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 border-b-2 border-gray-200 p-4 w-full"
              >
                <Link href={`/profile/${user._id}`} key={idx}>
                  <div className="flex gap-4 items-center hover:bg-primary p-2 cursor-pointer font-semibold rounded">
                    <Image
                      src={user.image}
                      alt="User profile"
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <div className="flex flex-col justify-center">
                      <p className="flex gap-1 items-center text-lg font-bold text-primary lowercase">
                        {user.userName.replaceAll(" ", "")}
                        <MdVerified className="text-blue-500 text-lg" />
                      </p>
                      <p className="capitalize text-gray-400 text-sm">
                        {user.userName}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="w-full flex justify-center items-center h-96">
              <NoResults
                text={`No se encontraron cuentas para "${searchQuery}"`}
                icon={MdNoAccounts}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="md:mt-5 flex flex-wrap gap-6 md:justify-start">
          {videos.length ? (
            videos.map((video: IVideo, idx) => (
              <VideoCard post={video} key={idx} />
            ))
          ) : (
            <div className="w-full flex justify-center items-center h-96">
              <NoResults
                text={`No se encontraron videos para "${searchQuery}"`}
                icon={MdVideocamOff}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
