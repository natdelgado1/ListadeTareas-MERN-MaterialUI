
import TopNavList from "@/components/navs/TopNavList";


const MainLayout = ({ children }) => {
  return (
    <div className="px-4">
      <TopNavList/>
      {children}
    </div>
  );
};

export default MainLayout;
