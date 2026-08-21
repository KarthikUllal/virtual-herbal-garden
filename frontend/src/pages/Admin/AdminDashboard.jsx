import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <main className="min-h-screen bg-[#f7faf5] px-6 py-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-green-600">
            Administration
          </p>

          <h1 className="mt-2 text-4xl font-bold text-green-950">
            Admin Dashboard
          </h1>

          <p className="mt-3 text-gray-600">
            Manage plants and content in your Virtual Herbal Garden.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">

          {/* Manage Plants */}
          <div className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-2xl">
              🌿
            </div>

            <h2 className="mt-5 text-xl font-semibold text-gray-900">
              Manage Plants
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Add, edit, and delete medicinal plants.
            </p>

            <Link
              to="/admin/plants"
              className="mt-5 inline-block rounded-xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
            >
              Manage Plants
            </Link>
          </div>

          {/* Add Plant */}
          <div className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-2xl">
              ➕
            </div>

            <h2 className="mt-5 text-xl font-semibold text-gray-900">
              Add Plant
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Add a new medicinal plant with images, video, audio, and 3D
              models.
            </p>

            <Link
              to="/admin/plants/add"
              className="mt-5 inline-block rounded-xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
            >
              Add Plant
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;