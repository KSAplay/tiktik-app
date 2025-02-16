import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { topics } from "../utils/constants";
import { svgGradient } from "../utils/svgGradient";

export const Discover = () => {
  const searchParams = useSearchParams();
  const topic = searchParams.get("topic");
  const activeTopicStyle = `relative hover:bg-primary px-3 py-2 rounded xl:rounded-full flex items-center gap-2
    justify-center cursor-pointer bg-gradient-to-b from-[#FFA600] to-[#FF007D] bg-clip-text text-transparent`;
  const activeTopicBgStyle = `mt-[2px] mx-[2px] relative flex items-center justify-center bg-white rounded-full before:absolute before:content-[''] before:rounded-full 
    before:bg-gradient-to-b before:from-[#FFA600] before:to-[#FF007D] before:w-[104%] before:h-[110%] before:-z-10`;
  const topicStyle =
    "xl:border-2 hover:bg-primary xl:border-gray-300 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black";

  return (
    <>
      <div className="pb-6 xl:border-b-2 xl:border-gray-200">
        <p className="m-3 mt-4 hidden font-semibold text-gray-500 xl:block">
          Temas Populares
        </p>
        <div className="flex flex-wrap gap-3">
          {topics.map((item) => (
            <Link href={`/?topic=${item.name}`} key={item.name}>
              <div className={topic === item.name ? activeTopicBgStyle : ""}>
                <div
                  className={
                    topic === item.name ? activeTopicStyle : topicStyle
                  }
                >
                  <span className="xl:text-md text-2xl font-bold">
                    {svgGradient(
                      topic === item.name ? item.iconGradient : item.icon,
                    )}
                  </span>
                  <span className="text-md hidden font-medium capitalize xl:block">
                    {item.name}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
