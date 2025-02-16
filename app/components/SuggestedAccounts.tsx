import React, { useEffect } from "react";
import useAuthStore from "@/store/authStore";
import Link from "next/link";
import { IUser } from "@/types";
import Image from "next/image";
import { MdVerified } from "react-icons/md";

export const SuggestedAccounts = () => {
  const { fetchAllUsers, allUsers } = useAuthStore();

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  return (
    <div className="border-gray-200 pb-4 xl:border-b-2">
      <p className="m-3 mt-4 hidden font-semibold text-gray-500 xl:block">
        Cuentas Sugeridas
      </p>
      <div>
        {allUsers?.slice(0, 6).map((user: IUser) => (
          <Link href={`/profile/${user._id}`} key={user._id}>
            <div className="flex cursor-pointer items-center gap-3 rounded p-2 font-semibold hover:bg-primary">
              <div className="h-8 w-8">
                <Image
                  src={user.image}
                  alt="User profile"
                  width={34}
                  height={34}
                  className="rounded-full"
                />
              </div>
              <div className="hidden xl:block">
                <p className="flex items-center gap-1 text-base font-bold lowercase text-primary">
                  {user.userName.replaceAll(" ", "")}
                  <MdVerified className="text-md text-blue-500" />
                </p>
                <p className="text-xs capitalize text-gray-400">
                  {user.userName}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
