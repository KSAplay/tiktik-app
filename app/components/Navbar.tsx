import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GoogleLogin } from "@react-oauth/google";
import Logo from "../utils/tiktik-logo.svg";
import { createOrGetUser } from "../utils";
import useAuthStore from "@/store/authStore";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineLogout } from "react-icons/ai";

export const Navbar = () => {
  const { userProfile, addUser } = useAuthStore();

  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-3 px-4">
      <Link href="/">
        <div className="w-[100px] md:w-[160px]">
          <Image className="cursor-pointer" src={Logo} alt="TikTik" />
        </div>
      </Link>

      <div>SEARCH</div>
      <div>
        {userProfile ? (
          <div className="flex items-center gap-5 md:gap-10">
            <Link href="/upload">
              <button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2 rounded-lg">
                <IoMdAdd className="text-xl" />
                <span className="hidden md:block">Uplodad</span>
              </button>
            </Link>
            {userProfile.image && (
              <Link href="/">
                <Image
                  src={userProfile.image}
                  alt={userProfile.userName}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </Link>
            )}
            <button type="button">
              <AiOutlineLogout color="red" fontSize={21} />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => {
              if (response.credential) {
                createOrGetUser({ credential: response.credential }, addUser);
              } else {
                console.log("Credential is undefined");
              }
            }}
            onError={() => {
              console.log("Error");
            }}
          />
        )}
      </div>
    </div>
  );
};
