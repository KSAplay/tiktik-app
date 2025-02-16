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
    <div className="relative z-10 flex w-full items-center justify-center border-b-2 border-gray-200 bg-white px-4 py-3">
      <div className="flex w-[1600px] items-center justify-between xl:max-w-[1600px]">
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
            className="absolute -left-20 top-10 bg-white md:static"
          >
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Busca cuentas y videos"
              className="w-[300px] rounded-full border-2 border-gray-100 bg-primary p-3 pl-5 font-medium focus:border-2 focus:border-gray-300 focus:outline-none md:top-0 md:w-[350px] md:text-base"
            />
            <button
              onClick={handleSearch}
              type="submit"
              className="absolute right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400 md:right-5"
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
                  className={`mr-3 cursor-pointer rounded-lg px-[2px] py-[2px] ${isUploadHover ? "mr-3 cursor-pointer rounded-lg bg-gradient-to-b from-[#FFA600] to-[#FF007D] px-[2px] py-[2px]" : "bg-gray-300"}`}
                >
                  <div className="rounded-[6px] bg-white">
                    <div
                      className={`flex items-center gap-1 px-3 py-1 font-semibold ${isUploadHover ? "bg-gradient-to-b from-[#FFA600] to-[#FF007D] bg-clip-text text-transparent" : "bg-transparent"}`}
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
                  <div className="flex cursor-pointer items-center rounded-full bg-gray-100 px-[3px] pb-[2px] pt-[3px] hover:bg-gradient-to-b hover:from-[#FFA600] hover:to-[#FF007D]">
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
    </div>
  );
};
