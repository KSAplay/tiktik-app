import React, { useState, useRef } from "react";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import { Video } from "@/types";

interface IProps {
  post: Video;
}

export const VideoCard: NextPage<IProps> = ({ post }) => {
  const [isHover, setIsHover] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const onVideoPress = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  const buttonStyle = "text-2xl text-white lg:text-3xl drop-shadow-lg";

  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6 w-full">
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
          </div>
        </div>
      </div>
      <div className="relative lg:ml-20 flex gap-4">
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className="rounded-3xl overflow-hidden"
        >
          <Link href="/">
            <video
              loop
              muted={isVideoMuted}
              className="lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[200px] rounded-2xl cursor-pointer bg-gray-100"
              src={post.video.asset.url}
              ref={videoRef}
              onClick={onVideoPress}
            ></video>
          </Link>

          {isHover && (
            <div className="absolute bottom-6 md:bottom-4 cursor-pointer w-full flex justify-center items-center gap-10">
              {playing ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className={buttonStyle} />
                </button>
              ) : (
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className={buttonStyle} />
                </button>
              )}
              {isVideoMuted ? (
                <button onClick={() => setIsVideoMuted(false)}>
                  <HiVolumeOff className={buttonStyle} />
                </button>
              ) : (
                <button onClick={() => setIsVideoMuted(true)}>
                  <HiVolumeUp className={buttonStyle} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
