import { Inter } from "next/font/google";
import "./globals.css";
import TopNav from "@/components/navs/TopNav";
import Sidebar from "@/components/navs/Sidebar";
import FilterProvider  from "@/context/FilterContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lista de Tareas",
  description: "App básica para lista de tareas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          
          <TopNav />
          <div style={{ display: "flex" }}>
        <FilterProvider>
            <Sidebar />
            <div style={{ flex: 1, marginTop: "20px" }}>{children}</div>
        </FilterProvider>
          </div>
      </body>
    </html>
  );
}
