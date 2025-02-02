import React from "react";

interface IProps {
  text: string;
  icon: React.ElementType;
}

export const NoResults = ({ text, icon: Icon }: IProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <p className="text-8xl text-center">
        <Icon />
      </p>
      <p className="text-base text-center">{text}</p>
    </div>
  );
};
