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
    <div>
      <Navbar />
      <div className="flex gap-6 md:gap-20">
        <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
          <Sidebar />
        </div>
        <div className="mt-4 flex flex-col gap-10 overflow-auto h-[88vh] w-full">
          {children}
        </div>
      </div>
    </div>
  ) : (
    <div>{children}</div>
  );
}
