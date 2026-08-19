import { useEffect, useState } from "react";

import api from "../../utils/axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/users/me");

        setUser(response.data.data);
      } catch (error) {
        console.error("Failed to load profile:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load profile."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7faf5]">
        <p className="text-green-700">
          Loading profile...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7faf5] px-6">
        <div className="rounded-2xl bg-red-50 px-6 py-4">
          <p className="text-red-600">{error}</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#f7faf5] px-6 py-12">

      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-8">

          <p className="text-sm font-semibold uppercase tracking-widest text-green-600">
            Account
          </p>

          <h1 className="mt-3 text-4xl font-bold text-green-950">
            My Profile
          </h1>

          <p className="mt-3 text-gray-600">
            View your account information.
          </p>

        </div>

        {/* Profile Card */}
        <div className="rounded-3xl border border-green-100 bg-white p-8 shadow-sm">

          {/* Avatar */}
          <div className="flex items-center gap-5">

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl font-bold text-green-700">
              {user.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-xl font-semibold text-green-950">
                {user.name}
              </h2>

              <p className="text-sm text-gray-500">
                {user.email}
              </p>
            </div>

          </div>

          {/* Information */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">

            <div className="rounded-2xl border border-green-100 bg-green-50/50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-green-600">
                Name
              </p>

              <p className="mt-2 text-gray-800">
                {user.name}
              </p>
            </div>

            <div className="rounded-2xl border border-green-100 bg-green-50/50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-green-600">
                Email
              </p>

              <p className="mt-2 break-words text-gray-800">
                {user.email}
              </p>
            </div>

          </div>

          {/* Account Created */}
          <div className="mt-4 rounded-2xl border border-green-100 bg-green-50/50 p-5">

            <p className="text-xs font-semibold uppercase tracking-wider text-green-600">
              Member Since
            </p>

            <p className="mt-2 text-gray-800">
              {new Date(user.createdAt).toLocaleDateString()}
            </p>

          </div>

        </div>

      </div>

    </main>
  );
};

export default Profile;