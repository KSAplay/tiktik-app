import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ClientLayout from "./ClientLayout";

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
}: {
  children: React.ReactNode;
}) {
  return (
    <GoogleOAuthProvider clientId="817671314675-ak9me0l8cc896u2tdk3dhunl3gnvkgc8.apps.googleusercontent.com">
      <html lang="es">
        <head>
          <link rel="icon" href="./favicon.ico" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          suppressHydrationWarning={true}
        >
          <ClientLayout>{children}</ClientLayout>
        </body>
      </html>
    </GoogleOAuthProvider>
  );
}
