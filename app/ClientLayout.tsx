"use client";

import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { usePathname } from "next/navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isStudioRoute = pathname.startsWith("/studio");

  return !isStudioRoute ? (
    <div className="flex flex-col items-center w-full m-auto overflow-hidden h-[100vh]">
      <Navbar />
      <div className="w-full xl:max-w-[1600px] flex gap-6 md:gap-20">
        <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
          <Sidebar />
        </div>
        <div className="mt-2 flex flex-1 flex-col gap-10 overflow-auto h-[88vh]">
          {children}
        </div>
      </div>
    </div>
  ) : (
    <div>{children}</div>
  );
}
