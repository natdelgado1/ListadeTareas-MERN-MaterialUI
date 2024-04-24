import { Inter } from "next/font/google";
import "./globals.css";
import TopNav from "@/components/navs/TopNav";
import Sidebar from "@/components/navs/Sidebar";
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
        <div style={{display:"flex"}}>
        <Sidebar/>
        <div style={{flex:1, marginTop: "70px"}}>
        {children}         
        </div>
        </div>        
      </body>
    </html>
  );
}
