import React, { useState, useEffect, useRef } from "react";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import { Video } from "@/types";

interface IProps {
  post: Video;
}

export const VideoCard: NextPage<IProps> = ({ post }) => {
  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">
      <div>
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
          <div className="md:w-16 md:h-16 w-10 h-10">
            <Link href="/">
              <Image
                src={post.postedBy.image}
                alt={post.postedBy.userName}
                width={62}
                height={62}
                className="rounded-full"
              />
            </Link>
          </div>
          <div>
            <Link href="/">
              <div className="flex items-center gap-2">
                <p className="flex gap-1 items-center md:text-md font-bold text-primary">
                  {post.postedBy.userName}
                  <MdVerified className="text-blue-500 text-md" />
                </p>
              </div>
            </Link>
            <p className="font-normal">{post.caption}</p>

            <video className="w-full" controls loop>
              <source src={post.video.asset.url} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};
