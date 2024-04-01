import { Inter } from "next/font/google";
import "./globals.css";
import TopNav from "@/components/navs/TopNav";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lista de Tareas",
  description: "App básica para lista de tareas",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TopNav/>
        {children}
      </body>
    </html>
  );
}
