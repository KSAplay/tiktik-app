import Image from "next/image";
import Link from "next/link";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import Logo from "../utils/tiktik-logo.svg";
import { createOrGetUser } from "../utils";
import useAuthStore from "@/store/authStore";
import { IoMdAdd } from "react-icons/io";
import { TbLogout } from "react-icons/tb";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BiSearch } from "react-icons/bi";

export const Navbar = () => {
  const { userProfile, addUser, removeUser } = useAuthStore();
  const [isUploadHover, setIsUploadHover] = useState(false);
  const [isLogoutHover, setIsLogoutHover] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (searchValue) {
      router.push(`/search?q=${searchValue}`);
    }
  };

  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-3 px-4">
      <Link href="/">
        <div className="w-[100px] md:w-[160px]">
          <Image
            className="cursor-pointer"
            src={Logo}
            alt="TikTik Logo"
            priority
          />
        </div>
      </Link>

      <div className="relative hidden md:block">
        <form
          action="/search"
          onSubmit={handleSearch}
          className="absolute md:static top-10 -left-20 bg-white"
        >
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Busca cuentas y videos"
            className="bg-primary p-3 pl-5 md:text-base font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full md:top-0"
          />
          <button
            onClick={handleSearch}
            type="submit"
            className="absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400"
          >
            <BiSearch />
          </button>
        </form>
      </div>

      <div>
        {userProfile ? (
          <div className="flex items-center gap-5 md:gap-5">
            <Link
              href="/upload"
              onMouseEnter={() => setIsUploadHover(true)}
              onMouseLeave={() => setIsUploadHover(false)}
            >
              <button
                className={`px-[2px] py-[2px] mr-3 rounded-lg cursor-pointer ${isUploadHover ? "bg-gradient-to-b from-[#FFA600] to-[#FF007D] px-[2px] py-[2px] mr-3 rounded-lg cursor-pointer" : "bg-gray-300"}`}
              >
                <div className="bg-white rounded-[6px]">
                  <div
                    className={`flex items-center px-3 py-1 gap-1 font-semibold ${isUploadHover ? "bg-gradient-to-b from-[#FFA600] to-[#FF007D] bg-clip-text text-transparent" : "bg-transparent"}`}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <linearGradient
                          id="gradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop offset="0%" stopColor="#FFA600" />
                          <stop offset="100%" stopColor="#FF007D" />
                        </linearGradient>
                      </defs>
                      <IoMdAdd
                        fill={isUploadHover ? "url(#gradient)" : "black"}
                        className="text-xl"
                      />
                    </svg>
                    <span className="hidden md:block">Cargar</span>
                  </div>
                </div>
              </button>
            </Link>
            {userProfile.image && (
              <Link href={`/profile/${userProfile._id}`}>
                <div className="flex items-center cursor-pointer rounded-full bg-gray-100 hover:bg-gradient-to-b hover:from-[#FFA600] hover:to-[#FF007D] px-[3px] pt-[3px] pb-[2px]">
                  <Image
                    src={userProfile.image}
                    alt={userProfile.userName}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
              </Link>
            )}
            <button
              type="button"
              onMouseEnter={() => setIsLogoutHover(true)}
              onMouseLeave={() => setIsLogoutHover(false)}
              onClick={() => {
                googleLogout();
                removeUser();
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FFA600" />
                    <stop offset="100%" stopColor="#FF007D" />
                  </linearGradient>
                </defs>
                <TbLogout
                  stroke={isLogoutHover ? "url(#gradient)" : "black"}
                  className="text-2xl"
                />
              </svg>
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
