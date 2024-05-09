"use client";
import Sidebar from "@/components/navs/Sidebar";
import TopNav from "@/components/navs/TopNav";
import TopNavList from "@/components/navs/TopNavList";
import FilterProvider from "@/context/FilterContext";


const MainLayout = ({ children }) => {
  return (
    <div className="px-4">
      <div style={{ display: "flex" }}>
        <FilterProvider>
          <Sidebar />
          <div style={{ flex: 1, marginTop: "20px" }}>
            <TopNav/> {children}
          </div>
        </FilterProvider>
      </div>
      <TopNavList />
    </div>
  );
};

export default MainLayout;
