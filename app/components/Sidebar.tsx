"use client";

import { useState } from "react";
// import { NextPage } from "next";
// import { useRouter } from "next/router";
import Link from "next/link";
import { useGoogleLogin } from "@react-oauth/google";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import { Discover } from "./Discover";
import { SuggestedAccounts } from "./SuggestedAccounts";
import { Footer } from "./Footer";
import { svgGradient } from "../utils/svgGradient";

export const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  const normalLink =
    "flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold bg-gradient-to-b from-[#FFA600] to-[#FF007D] bg-clip-text text-transparent";
  const normalLinkHover = "hover:bg-primary rounded";
  const userProfile = false;
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
    onError: () => console.log("Login Failed"),
  });

  return (
    <>
      <div
        className="block xl:hidden m-2 ml-4 mt-3 text-xl"
        onClick={() => setShowSidebar((prev) => !prev)}
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <div className="xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3">
          <div className="xl:border-b-2 border-gray-200 xl:pb-4">
            <Link href="/">
              <div className={normalLinkHover}>
                <div className={normalLink}>
                  <p className="text-2xl">
                    {svgGradient(<AiFillHome fill="url(#grad)" />)}
                  </p>
                  <span className="text-xl hidden xl:block">Para ti</span>
                </div>
              </div>
            </Link>
          </div>
          {!userProfile && (
            <div className="px-2 py-4 hidden xl:block">
              <p className="text-gray-400 text-sm">
                Inicia sesión para dar me gusta y comentar los videos
              </p>
              <div className="pr-4">
                <button
                  className="cursor-pointer relative flex items-center justify-center rounded-md bg-white before:absolute before:content-[''] before:rounded-md 
                            before:bg-gradient-to-b before:from-[#FFA600] before:to-[#FF007D] before:w-[101%] before:h-[110%] before:-z-10 font-semibold outline-none w-full mt-3
                            hover:bg-transparent transition-all"
                  onClick={() => login()}
                >
                  <div className="bg-gradient-to-b from-[#FFA600] to-[#FF007D] bg-clip-text text-transparent hover:text-white w-full h-full px-6 py-3 transition-all">
                    Iniciar Sesión
                  </div>
                </button>
              </div>
            </div>
          )}

          <Discover />
          <SuggestedAccounts />
          <Footer />
        </div>
      )}
    </>
  );
};
