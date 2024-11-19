import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { GoogleOAuthProvider } from "@react-oauth/google";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "TikTik",
  description: "Mira los últimos videos o comparte uno con tus amigos!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GoogleOAuthProvider clientId="817671314675-ak9me0l8cc896u2tdk3dhunl3gnvkgc8.apps.googleusercontent.com">
      <html lang="es">
        <head>
          <link rel="icon" href="./favicon.ico" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div>
            <Navbar />
            <div className="flex gap-6 md:gap-20">
              <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
                <Sidebar />
              </div>
              <div className="mt-4 flex flex-col gap-10 overflow-auto h-[88vh]">
                {children}
              </div>
            </div>
          </div>
        </body>
      </html>
    </GoogleOAuthProvider>
  );
}
