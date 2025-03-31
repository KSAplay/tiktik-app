import React, { useState, useEffect } from "react";
import { MdFavorite } from "react-icons/md";
import useAuthStore from "@/store/authStore";
import { svgGradient } from "../utils/svgGradient";

interface IProps {
  handleLike: () => void;
  handleDislike: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  likes: any[];
}

const LikeButton = ({ likes, handleLike, handleDislike }: IProps) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const { userProfile } = useAuthStore();
  const filterLikes = likes?.filter((item) => item._ref === userProfile?._id);

  useEffect(() => {
    if (filterLikes?.length > 0) {
      setAlreadyLiked(true);
    } else {
      setAlreadyLiked(false);
    }
  }, [filterLikes, likes]);

  return (
    <div className="flex gap-6">
      <div className="mt-4 flex cursor-pointer flex-col items-center justify-center">
        {alreadyLiked ? (
          <div
            className="rounded-full bg-primary p-2 md:p-4"
            onClick={handleDislike}
          >
            {svgGradient(
              <MdFavorite className="flex text-2xl" fill="url(#grad)" />,
            )}
          </div>
        ) : (
          <div
            className="rounded-full bg-primary p-2 md:p-4"
            onClick={handleLike}
          >
            <MdFavorite className="text-2xl" />
          </div>
        )}
        <p className="text-md font-semibold">{likes?.length || 0}</p>
      </div>
    </div>
  );
};

export default LikeButton;
