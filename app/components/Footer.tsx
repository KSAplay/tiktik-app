import React from "react";

import { footerList1, footerList2, footerList3 } from "../utils/constants";

const List = ({ items, mt }: { items: string[]; mt: boolean }) => (
  <div className={`flex flex-wrap gap-2 ${mt && "mt-5"}`}>
    {items.map((item) => (
      <p
        key={item}
        className="text-sm text-gray-400 hover:cursor-pointer hover:underline"
      >
        {item}
      </p>
    ))}
  </div>
);

export const Footer = () => {
  return (
    <div className="mt-6 hidden xl:block">
      <List items={footerList1} mt={false} />
      <List items={footerList2} mt />
      <List items={footerList3} mt />

      <p className="mt-5 text-sm text-gray-400">2024 KSA TikTik</p>
    </div>
  );
};
