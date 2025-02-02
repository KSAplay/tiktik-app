import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MdVerified } from "react-icons/md";
import useAuthStore from "@/store/authStore";
import { NoResults } from "@/app/components/NoResults";
import { BiCommentX } from "react-icons/bi";

const Comments = () => {
  const { userProfile } = useAuthStore();
  const comments = [];

  return (
    <div className="border-t-2 border-gray-200 pt-4 px-10 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]">
      <div className="overflow-scroll lg:h-[475px]">
        {comments.length ? (
          <div>Comentarios</div>
        ) : (
          <NoResults text="¡Sé el primero en comentar!" icon={BiCommentX} />
        )}
      </div>

      {userProfile && <div></div>}
    </div>
  );
};

export default Comments;
