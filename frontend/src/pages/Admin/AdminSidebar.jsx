import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminSidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
      isActive
        ? "bg-green-100 text-green-800"
        : "text-gray-600 hover:bg-green-50 hover:text-green-700"
    }`;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-green-100 bg-white">
      
      {/* Logo */}
      <div className="border-b border-green-100 px-6 py-5">
        <div className="flex items-center gap-3">
          
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
            🌿
          </div>

          <div>
            <h1 className="font-bold text-green-900">
              Herbal Garden
            </h1>

            <p className="text-xs text-green-600">
              Admin Panel
            </p>
          </div>

        </div>
      </div>


      {/* Navigation */}
      <nav className="space-y-2 p-4">

        {/* Dashboard */}
        <NavLink
          to="/admin"
          end
          className={linkClass}
        >
          <span>📊</span>
          Dashboard
        </NavLink>


        {/* Manage Plants */}
        <NavLink
          to="/admin/plants"
          className={linkClass}
        >
          <span>🌿</span>
          Manage Plants
        </NavLink>


        {/* Add Plant */}
        <NavLink
          to="/admin/plants/add"
          className={linkClass}
        >
          <span>➕</span>
          Add Plant
        </NavLink>

      </nav>


      {/* Logout */}
      <div className="absolute bottom-0 w-full border-t border-green-100 p-4">

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-gray-600 transition hover:bg-red-50 hover:text-red-600"
        >
          <span>🚪</span>
          Logout
        </button>

      </div>

    </aside>
  );
};

export default AdminSidebar;