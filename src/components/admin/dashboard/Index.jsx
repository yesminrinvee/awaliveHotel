import { Outlet } from "react-router-dom";
import SideBar from "./component/sideBar/SideBar";
import AdminNavBar from "./component/adminNavBar/AdminNavBar";
import { useState } from "react";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    
      <div dir="ltr" className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden ">
        <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <AdminNavBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <Header  /> */}
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <Outlet />
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
      </div>
    </div>
    
  );
};

export default Index;
