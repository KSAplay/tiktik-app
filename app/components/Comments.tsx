import React, { Dispatch, SetStateAction } from "react";
//import Image from "next/image";
//import Link from "next/link";
//import { MdVerified } from "react-icons/md";
import useAuthStore from "@/store/authStore";
import { NoResults } from "@/app/components/NoResults";
import { BiCommentX } from "react-icons/bi";

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
  postedBy: { _ref: string };
}

const Comments = ({
  comment,
  setComment,
  addComment,
  comments,
  isPostingComment,
}: IProps) => {
  const { userProfile } = useAuthStore();

  return (
    <div className="border-t-2 border-gray-200 pt-4 px-10 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]">
      <div className="overflow-scroll lg:h-[475px]">
        {comments?.length ? (
          <div>Comentario</div>
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
            <button className="text-base text-gray-400" onClick={addComment}>
              {isPostingComment ? "Commentando..." : "Comentar"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comments;
