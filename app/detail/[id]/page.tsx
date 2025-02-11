"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { MdVerified } from "react-icons/md";
import Image from "next/image";
import { IVideo } from "@/types";
import Link from "next/link";
import { MdOutlineCancel } from "react-icons/md";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsFillPlayFill } from "react-icons/bs";
import useAuthStore from "@/store/authStore";
import Comments from "@/app/components/Comments";
import LikeButton from "@/app/components/LikeButton";
import { Any } from "next-sanity";

export default function DetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState<IVideo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [playing, setPlaying] = useState<boolean>(false);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);
  const { userProfile } = useAuthStore();
  const [comment, setComment] = useState<string>("");
  const [isPostingComment, setIsPostingComment] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const router = useRouter();

  const buttonStyle = "text-2xl text-white lg:text-3xl drop-shadow-lg";

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          setLoading(true);
          const res = await fetch(`/api/post/${id}`);
          if (!res.ok) {
            throw new Error("Error fetching post details");
          }
          const data = await res.json();
          console.log(data);
          setPost(data);
        } catch (error) {
          console.error("Error fetching post:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchPost();
    }
  }, [id]);

  const onVideoClick = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const response = await fetch(`/api/post/${id}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userProfile._id,
          postId: post ? post._id : "",
          like,
        }),
      });
      const data = await response.json();
      if (post) {
        setPost({ ...post, likes: data.likes });
      }
    }
  };

  const addComment = async (e: Any) => {
    e.preventDefault();
    if (userProfile && comment) {
      setIsPostingComment(true);
      const response = await fetch(`/api/post/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment,
          userId: userProfile._id,
        }),
      });
      const data = await response.json();
      if (post) {
        setPost({ ...post, comments: data.comments });
        setComment("");
        setIsPostingComment(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Cargando...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>No se encontró el video.</p>
      </div>
    );
  }

  return (
    <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
      <div className="relative flex-2 w-[900px] lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center">
        <div className="absolute w-full h-full bg-gradient-to-r from-black/80 via-black/40 to-black/80"></div>
        <div className="absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
          <p className="cursor-pointer" onClick={() => router.back()}>
            <MdOutlineCancel className="text-white text-[35px]" />
          </p>
        </div>
        <div className="relative">
          <div className="lg:h-[100vh] h-[60vh]">
            <video
              ref={videoRef}
              muted={isVideoMuted}
              loop
              onClick={onVideoClick}
              src={post.video.asset.url}
              className="h-full cursor-pointer"
            ></video>
          </div>

          <div className="absolute top-[45%] left-[45%] cursor-pointer">
            {!playing && (
              <button type="button" onClick={onVideoClick}>
                <BsFillPlayFill className="text-white text-6xl lg:text-8xl" />
              </button>
            )}
          </div>
          <div className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer">
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
        </div>
      </div>
      <div className="relative w-[1000px] md:w-[900px] lg:w-[700px]">
        <div className="mt-10 lg:mt-20">
          <div className="px-10 flex gap-3 pb-2 cursor-pointer font-semibold rounded">
            <div className="md:w-16 md:h-16 w-10 h-10">
              <Link href={`/profile/${post.postedBy._id}`}>
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
              <Link href={`/profile/${post.postedBy._id}`}>
                <div className="mt-1 flex flex-col gap-1">
                  <p className="flex gap-1 items-center md:text-md font-bold text-primary">
                    {post.postedBy.userName}
                    <MdVerified className="text-blue-500 text-md" />
                  </p>
                  <p className="capitalize font-medium text-xs text-gray-400 hidden md:block">
                    {post.postedBy.userName}
                  </p>
                </div>
              </Link>
            </div>
          </div>

          <p className="px-10 mt-2 text-base text-gray-600">
            {post.caption}{" "}
            <span className="font-semibold text-primary">
              {post.hashtags && post.hashtags.map((hashtag) => ` #${hashtag}`)}
            </span>
          </p>

          <div className="px-10 mt-2 mb-2 flex flex-col justify-center">
            {userProfile && (
              <LikeButton
                likes={post.likes}
                handleLike={() => handleLike(true)}
                handleDislike={() => handleLike(false)}
              />
            )}
          </div>
          <Comments
            comment={comment}
            setComment={setComment}
            addComment={addComment}
            comments={post.comments}
            isPostingComment={isPostingComment}
          />
        </div>
      </div>
    </div>
  );
}
