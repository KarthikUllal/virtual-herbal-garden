import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./components/MainLayout";

import Home from "./pages/Home/Home";
import Plants from "./pages/Plants/Plants";
import PlantDetails from "./pages/PlantDetails/PlantDetails";
import Garden from "./pages/Garden/Garden";

import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";

import MyBookmarks from "./pages/Bookmarks/MyBookmarks";
import Profile from "./pages/Profile/Profile";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import AdminLayout from "./pages/Admin/AdminLayout";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminPlants from "./pages/Admin/AdminPlants";
import AddPlant from "./pages/Admin/AddPlant";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= NORMAL WEBSITE ================= */}

        <Route element={<MainLayout />}>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/plants" element={<Plants />} />
          <Route path="/plants/:id" element={<PlantDetails />} />
          <Route path="/garden" element={<Garden />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected */}
          <Route element={<ProtectedRoute />}>
            <Route path="/bookmarks" element={<MyBookmarks />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>

        {/* ================= ADMIN ================= */}

        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            
            {/* /admin */}
            <Route index element={<AdminDashboard />} />

            {/* /admin/plants */}
            <Route path="plants" element={<AdminPlants />} />

            {/* /admin/plants/add */}
            <Route path="plants/add" element={<AddPlant />} />

            {/* /admin/plants/edit/:id */}
            <Route
              path="plants/edit/:id"
              element={<AddPlant />}
            />

          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;