import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import { IVideo } from "@/types";

interface IProps {
  post: IVideo;
}

export const VideoCard = ({ post }: IProps) => {
  const [isHover, setIsHover] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const onVideoPress = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  const buttonStyle = "text-3xl text-white lg:text-4xl drop-shadow-lg";

  return (
    <div className="flex w-full flex-col border-b-2 border-gray-200 pb-6">
      <div>
        <div className="flex cursor-pointer gap-3 rounded p-2 font-semibold">
          <div className="h-10 w-10 md:h-16 md:w-16">
            <Link href={`/profile/${post.postedBy._id}`} passHref>
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
            <Link href={`/profile/${post.postedBy._id}`} passHref>
              <div className="flex items-center gap-2">
                <p className="md:text-md flex items-center gap-1 font-bold lowercase text-primary">
                  {post.postedBy.userName.replaceAll(" ", "")}
                  <MdVerified className="text-md text-blue-500" />
                </p>
                <p className="hidden text-xs capitalize text-gray-400 md:block">
                  {post.postedBy.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="relative flex w-[200px] gap-4 lg:ml-20 lg:w-[600px]">
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className="overflow-hidden rounded-3xl"
        >
          <Link href={`/detail/${post._id} `} passHref>
            <video
              loop
              muted={isVideoMuted}
              className="h-[300px] w-[200px] cursor-pointer rounded-2xl bg-gray-100 md:h-[400px] lg:h-[530px] lg:w-[600px]"
              src={post.video.asset.url}
              ref={videoRef}
            ></video>
          </Link>

          {isHover && (
            <div className="absolute bottom-6 flex w-full cursor-pointer items-center justify-center gap-10 md:bottom-4">
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
