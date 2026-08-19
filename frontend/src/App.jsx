import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home/Home";
import Plants from "./pages/Plants/Plants";
import PlantDetails from "./pages/PlantDetails/PlantDetails";
import Garden from "./pages/Garden/Garden";

import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";

import MyBookmarks from "./pages/Bookmarks/MyBookmarks";
import Profile from "./pages/Profile/Profile";

import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/plants" element={<Plants />} />
        <Route path="/plants/:id" element={<PlantDetails />} />
        <Route path="/garden" element={<Garden />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/bookmarks"
            element={<MyBookmarks />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />
        </Route>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;