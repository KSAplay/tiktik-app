"use client";

import { IUser, IVideo } from "@/types";
import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { ClientSearchParams } from "@/app/components/ClientSeartchParams";
import Link from "next/link";
import { VideoCard } from "@/app/components/VideoCard";
import { NoResults } from "../components/NoResults";
import { MdVideocamOff, MdNoAccounts, MdVerified } from "react-icons/md";
import useAuthStore from "@/store/authStore";

const SearchContent = () => {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = ClientSearchParams();
  const searchQuery: string = searchParams.get("q") || "";
  const [showAccount, setShowAccounts] = useState(false);
  const { allUsers } = useAuthStore();

  const accountStyle = showAccount
    ? "border-b-2 border-black"
    : "text-gray-400";
  const videoStyle = !showAccount ? "border-b-2 border-black" : "text-gray-400";

  const searchAccounts = allUsers.filter((user: IUser) =>
    user.userName.toLowerCase().includes(searchQuery.toLowerCase()),
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
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-4 mt-10 flex w-full gap-2 border-b-2 border-gray-200 bg-white">
        <p
          className={`mx-5 mt-2 cursor-pointer text-lg font-semibold ${accountStyle}`}
          onClick={() => setShowAccounts(true)}
        >
          Cuentas
        </p>
        <p
          className={`mx-5 mt-2 cursor-pointer text-lg font-semibold ${videoStyle}`}
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
                className="flex w-full items-center gap-4 border-b-2 border-gray-200 p-4"
              >
                <Link href={`/profile/${user._id}`} key={idx}>
                  <div className="flex cursor-pointer items-center gap-4 rounded p-2 font-semibold hover:bg-primary">
                    <Image
                      src={user.image}
                      alt="User profile"
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <div className="flex flex-col justify-center">
                      <p className="flex items-center gap-1 text-lg font-bold lowercase text-primary">
                        {user.userName.replaceAll(" ", "")}
                        <MdVerified className="text-lg text-blue-500" />
                      </p>
                      <p className="text-sm capitalize text-gray-400">
                        {user.userName}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="flex h-96 w-full items-center justify-center">
              <NoResults
                text={`No se encontraron cuentas para "${searchQuery}"`}
                icon={MdNoAccounts}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-wrap gap-6 md:mt-5 md:justify-start">
          {videos.length ? (
            videos.map((video: IVideo, idx) => (
              <VideoCard post={video} key={idx} />
            ))
          ) : (
            <div className="flex h-96 w-full items-center justify-center">
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
};

export default function Search() {
  <Suspense
    fallback={
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
      </div>
    }
  >
    <SearchContent />
  </Suspense>;
}
