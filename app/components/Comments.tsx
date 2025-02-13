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
    <div className="flex flex-col h-full">
      <div className="border-t-2 border-gray-200 pt-4 px-10 bg-[#F8F8F8] border-b-2 lg:pb-0 flex-1 overflow-scroll">
        {comments?.length ? (
          comments.map((item, idx) => (
            <div key={idx} className="my-2">
              {allUsers.map(
                (user) =>
                  user._id === (item.postedBy._id || item.postedBy._ref) && (
                    <div className="p-2 items-center" key={idx}>
                      <div className="flex center gap-3">
                        <Link href={`/profile/${user._id}`}>
                          <Image
                            src={user.image}
                            alt="User profile"
                            width={40}
                            height={40}
                            className="mt-1 rounded-full"
                          />
                        </Link>
                        <div className="flex flex-col flex-1">
                          <div className="flex gap-1 items-center text-sm font-bold text-primary lowercase">
                            <Link
                              href={`/profile/${user._id}`}
                              className="hover:underline"
                            >
                              {user.userName}
                            </Link>
                            <MdVerified className="text-blue-500 text-sm" />
                          </div>
                          <div>
                            <p className="md:text-base text-sm">
                              {item.comment}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full w-full py-10">
            <NoResults
              text="¡Sé el primero en comentar!"
              icon={FaRegCommentDots}
            />
          </div>
        )}
      </div>

      {userProfile ? (
        <div className="bottom-0 left-0 lg:py-4 py-4 px-4 w-full">
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
              className="bg-primary px-6 py-4 text-base font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg"
              max={150}
            />
            <button
              className={`text-base px-2 ${isPostingComment ? "text-gray-400" : "text-black font-semibold"}`}
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
