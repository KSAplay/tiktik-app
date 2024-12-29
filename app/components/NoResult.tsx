import React from "react";

interface IProps {
  text: string;
}

export const NoResult = ({ text }: IProps) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  );
};
