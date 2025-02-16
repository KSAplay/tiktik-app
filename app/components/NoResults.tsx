import React from "react";

interface IProps {
  text: string;
  icon: React.ElementType;
}

export const NoResults = ({ text, icon: Icon }: IProps) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <p className="text-center text-8xl">
        <Icon />
      </p>
      <p className="mt-5 text-center text-base">{text}</p>
    </div>
  );
};
