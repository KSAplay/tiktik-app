"use client";

import { useState } from "react";
import Link from "next/link";
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

  return (
    <>
      <div
        className="m-2 ml-4 mt-3 block text-xl xl:hidden"
        onClick={() => setShowSidebar((prev) => !prev)}
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <div className="mb-10 flex w-20 flex-col justify-start border-r-2 border-gray-100 p-3 xl:w-400 xl:border-0">
          <div className="border-gray-200 xl:border-b-2 xl:pb-4">
            <Link href="/">
              <div className={normalLinkHover}>
                <div className={normalLink}>
                  <p className="text-2xl">
                    {svgGradient(<AiFillHome fill="url(#grad)" />)}
                  </p>
                  <span className="hidden text-xl xl:block">Para ti</span>
                </div>
              </div>
            </Link>
          </div>

          <Discover />
          <SuggestedAccounts />
          <Footer />
        </div>
      )}
    </>
  );
};
