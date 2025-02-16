import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { MdVerified } from "react-icons/md";
import useAuthStore from "@/store/authStore";
import { NoResults } from "@/app/components/NoResults";
import { FaRegCommentDots } from "react-icons/fa6";
import Link from "next/link";

interface IProps {
  isPostingComment: boolean;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  comments: IComment[];
}

interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref: string; _id: string };
}

const Comments = ({
  comment,
  setComment,
  addComment,
  comments,
  isPostingComment,
}: IProps) => {
  const { userProfile, allUsers } = useAuthStore();

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-scroll border-b-2 border-t-2 border-gray-200 bg-[#F8F8F8] px-10 pt-4 lg:pb-0">
        {comments?.length ? (
          comments.map((item, idx) => (
            <div key={idx} className="my-2">
              {allUsers.map(
                (user) =>
                  user._id === (item.postedBy._id || item.postedBy._ref) && (
                    <div className="items-center p-2" key={idx}>
                      <div className="center flex gap-3">
                        <Link href={`/profile/${user._id}`}>
                          <Image
                            src={user.image}
                            alt="User profile"
                            width={40}
                            height={40}
                            className="mt-1 rounded-full"
                          />
                        </Link>
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-center gap-1 text-sm font-bold lowercase text-primary">
                            <Link
                              href={`/profile/${user._id}`}
                              className="hover:underline"
                            >
                              {user.userName}
                            </Link>
                            <MdVerified className="text-sm text-blue-500" />
                          </div>
                          <div>
                            <p className="text-sm md:text-base">
                              {item.comment}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
              )}
            </div>
          ))
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center py-10">
            <NoResults
              text="¡Sé el primero en comentar!"
              icon={FaRegCommentDots}
            />
          </div>
        )}
      </div>

      {userProfile ? (
        <div className="bottom-0 left-0 w-full px-4 py-4 lg:py-4">
          <form
            onSubmit={addComment}
            className="flex justify-around gap-4"
            id="comment-form"
          >
            <input
              id="comment"
              type="text"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              placeholder="Añade un comentario..."
              className="flex-1 rounded-lg border-2 border-gray-100 bg-primary px-6 py-4 text-base font-medium focus:border-2 focus:border-gray-300 focus:outline-none"
              max={150}
            />
            <button
              className={`px-2 text-base ${isPostingComment ? "text-gray-400" : "font-semibold text-black"}`}
              onClick={addComment}
            >
              {isPostingComment ? "Comentando..." : "Comentar"}
            </button>
          </form>
        </div>
      ) : (
        <div>
          <p>Inicia sesión para comentar</p>
        </div>
      )}
    </div>
  );
};

export default Comments;
