import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { MdVerified } from "react-icons/md";
import useAuthStore from "@/store/authStore";
import { NoResults } from "@/app/components/NoResults";
import { BiCommentX } from "react-icons/bi";
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
    <div className="border-t-2 border-gray-200 pt-4 px-10 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]">
      <div className="overflow-scroll lg:h-[475px]">
        {comments?.length ? (
          comments.map((item, idx) => (
            <div key={idx} className="flex gap-2 items-center">
              {allUsers.map(
                (user) =>
                  user._id === (item.postedBy._id || item.postedBy._ref) && (
                    <div className="p-2 items-center" key={idx}>
                      <Link
                        href={`/profile/${user._id}`}
                        className="flex gap-2"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8">
                            <Image
                              src={user.image}
                              alt="User profile"
                              width={34}
                              height={34}
                              className="rounded-full"
                            />
                          </div>
                          <div className="hidden xl:block">
                            <p className="flex gap-1 items-center text-base font-bold text-primary lowercase">
                              {user.userName}
                              <MdVerified className="text-blue-500 text-md" />
                            </p>
                          </div>
                        </div>
                      </Link>
                      <div>
                        <p>{item.comment}</p>
                      </div>
                    </div>
                  )
              )}
            </div>
          ))
        ) : (
          <NoResults text="¡Sé el primero en comentar!" icon={BiCommentX} />
        )}
      </div>

      {userProfile && (
        <div className="absolute bottom-0 left-0 pb-6 px-2 md:px-10 w-full">
          <form onSubmit={addComment} className="flex gap-4" id="comment-form">
            <input
              id="comment"
              type="text"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              placeholder="Añade un comentario..."
              className="bg-primary px-6 py-4 text-base font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg"
            />
            <button
              className={`text-base ${isPostingComment ? "text-gray-400" : "text-black font-semibold"}`}
              onClick={addComment}
            >
              {isPostingComment ? "Comentando..." : "Comentar"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comments;
