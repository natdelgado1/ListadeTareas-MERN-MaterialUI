"use client";
import Sidebar from "@/components/navs/Sidebar";
import TopNav from "@/components/navs/TopNav";
import TopNavList from "@/components/navs/TopNavList";
import FilterProvider from "@/context/FilterContext";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


const MainLayout = ({ children }) => {
  const router = useRouter();
  const { user, loading } = useUser();

  useEffect(() => {
    if(!loading && !user){
      router.push('/login');
    }
  }, [loading, user]);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <FilterProvider>
          <Sidebar />
          <div style={{ flex: 1}}>
            <TopNav/> 
            <TopNavList />
            <hr className="mb-2" />
            <div className="px-2">
            {children}

            </div>
          </div>
        </FilterProvider>
      </div>
      
    </div>
  );
};

export default MainLayout;
