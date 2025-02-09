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
    <div className="xl:border-b-2 border-gray-200 pb-4">
      <p className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block">
        Cuentas Sugeridas
      </p>
      <div>
        {allUsers?.slice(0, 6).map((user: IUser) => (
          <Link href={`/profile/${user._id}`} key={user._id}>
            <div className="flex gap-3 items-center hover:bg-primary p-2 cursor-pointer font-semibold rounded">
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
                  {user.userName.replaceAll(" ", "")}
                  <MdVerified className="text-blue-500 text-md" />
                </p>
                <p className="capitalize text-gray-400 text-xs">
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
