
import { Outlet } from "react-router-dom";
import Sidebar from "./layouts/SideBar";    

function AdminDash() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminDash;
