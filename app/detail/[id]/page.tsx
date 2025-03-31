"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef, Suspense } from "react";
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

function DetailPageContent() {
  const { id } = useParams();
  const [post, setPost] = useState<IVideo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [playing, setPlaying] = useState<boolean>(false);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);
  const { userProfile, fetchAllUsers } = useAuthStore();
  const [comment, setComment] = useState<string>("");
  const [isPostingComment, setIsPostingComment] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const router = useRouter();

  const buttonStyle = "text-2xl text-white lg:text-3xl drop-shadow-lg";

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

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
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>No se encontró el video.</p>
      </div>
    );
  }

  return (
    <div className="absolute left-0 top-0 z-20 flex h-full w-full flex-wrap bg-white lg:flex-nowrap">
      <div className="flex-2 relative flex w-[900px] items-center justify-center bg-blurred-img bg-cover bg-center bg-no-repeat lg:w-9/12">
        <div className="absolute h-full w-full bg-gradient-to-r from-black/80 via-black/40 to-black/80"></div>
        <div className="absolute left-2 top-6 z-50 flex gap-6 lg:left-6">
          <p className="cursor-pointer" onClick={() => router.back()}>
            <MdOutlineCancel className="text-[35px] text-white" />
          </p>
        </div>
        <div className="relative">
          <div className="h-[60vh] lg:h-[100vh]">
            <video
              ref={videoRef}
              muted={isVideoMuted}
              loop
              onClick={onVideoClick}
              src={post.video.asset.url}
              className="h-full cursor-pointer"
            ></video>
          </div>

          <div className="absolute left-[45%] top-[45%] cursor-pointer">
            {!playing && (
              <button type="button" onClick={onVideoClick}>
                <BsFillPlayFill className="text-6xl text-white lg:text-8xl" />
              </button>
            )}
          </div>
          <div className="absolute bottom-5 right-5 cursor-pointer lg:bottom-10 lg:right-10">
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
      <div className="relative w-[1000px] md:w-[900px] lg:h-full lg:w-[700px]">
        <div className="flex flex-col pt-10 lg:h-full lg:pt-20">
          <div className="flex cursor-pointer gap-3 rounded px-10 pb-2 font-semibold">
            <div className="h-10 w-10 md:h-16 md:w-16">
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
                  <p className="md:text-md flex items-center gap-1 font-bold text-primary">
                    {post.postedBy.userName}
                    <MdVerified className="text-md text-blue-500" />
                  </p>
                  <p className="hidden text-xs font-medium capitalize text-gray-400 md:block">
                    {post.postedBy.userName}
                  </p>
                </div>
              </Link>
            </div>
          </div>

          <p className="mt-2 px-10 text-base text-gray-600">
            {post.caption}{" "}
            <span className="font-semibold text-primary">
              {post.hashtags && post.hashtags.map((hashtag) => ` #${hashtag}`)}
            </span>
          </p>

          <div className="mb-2 mt-2 flex flex-col justify-center px-10">
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
export default function DetailPage() {
  return (
    <Suspense fallback="">
      <DetailPageContent />
    </Suspense>
  );
}
