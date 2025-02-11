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
    <div className="flex flex-col border-b-2 border-gray-200 pb-6 w-full">
      <div>
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
          <div className="md:w-16 md:h-16 w-10 h-10">
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
                <p className="flex gap-1 items-center md:text-md font-bold text-primary lowercase">
                  {post.postedBy.userName.replaceAll(" ", "")}
                  <MdVerified className="text-blue-500 text-md" />
                </p>
                <p className="capitalize text-gray-400 text-xs">
                  {post.postedBy.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="relative lg:ml-20 flex lg:w-[600px] w-[200px] gap-4">
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className="rounded-3xl overflow-hidden"
        >
          <Link href={`/detail/${post._id} `} passHref>
            <video
              loop
              muted={isVideoMuted}
              className="lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[200px] rounded-2xl cursor-pointer bg-gray-100"
              src={post.video.asset.url}
              ref={videoRef}
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
