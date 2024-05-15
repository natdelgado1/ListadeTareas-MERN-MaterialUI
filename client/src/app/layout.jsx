"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>         
          <UserProvider>
          {children}
          </UserProvider>
      </body>
    </html>
  );
}
