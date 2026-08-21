import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-green-50/30">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="ml-64 min-h-screen">
        <div className="px-8 py-8">
          <Outlet />
        </div>
      </main>

    </div>
  );
};

export default AdminLayout;