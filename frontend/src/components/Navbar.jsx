import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 border-b border-green-100 bg-white/90 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                {/* Logo */}
                <NavLink
                    to="/"
                    className="flex items-center gap-2"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                        <span className="text-xl">🌿</span>
                    </div>

                    <div>
                        <h1 className="text-lg font-bold text-green-900">
                            Virtual Herbal Garden
                        </h1>

                        <p className="text-xs text-green-600">
                            Explore • Learn • Discover
                        </p>
                    </div>
                </NavLink>

                {/* Navigation */}
                <div className="flex items-center gap-8">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `text-sm font-medium transition ${
                                isActive
                                    ? "text-green-700"
                                    : "text-gray-600 hover:text-green-700"
                            }`
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/plants"
                        className={({ isActive }) =>
                            `text-sm font-medium transition ${
                                isActive
                                    ? "text-green-700"
                                    : "text-gray-600 hover:text-green-700"
                            }`
                        }
                    >
                        Plants
                    </NavLink>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;