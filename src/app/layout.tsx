"use client";
import "./globals.scss";
import Header from "./components/header/header";
import { Provider } from "react-redux";
import { store } from "./store/store";
import React from "react";

export const metadata = {
  title: "Starwar stars",
  description: "A simple app to view starwar stars",
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
        <React.StrictMode>
          <Provider store={store}>{children}</Provider>
        </React.StrictMode>
      </body>
    </html>
  );
}
