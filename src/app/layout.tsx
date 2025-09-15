import "./globals.scss";
import React from "react";
import Header from "../components/header/header";
import StoreProvider from "@/store/provider/StoreProvider";

export const metadata = {
  title: "Starwar Stars",
  description: "A simple starwar stars app built with Next.js and Redux Toolkit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
