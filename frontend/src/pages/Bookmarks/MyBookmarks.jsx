import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import PlantCard from "../../components/PlantCard";
import { getUserBookmarks } from "../../services/bookmark.service";

const MyBookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getUserBookmarks();

        setBookmarks(response.data || []);
      } catch (error) {
        console.error("Failed to load bookmarks:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load your bookmarks."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7faf5]">
        <p className="text-green-700">
          Loading your bookmarks...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7faf5] px-6">
        <div className="rounded-2xl bg-red-50 px-6 py-4 text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7faf5]">

      {/* Header */}
      <section className="border-b border-green-100 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12">

          <p className="text-sm font-semibold uppercase tracking-widest text-green-600">
            Your Collection
          </p>

          <h1 className="mt-3 text-4xl font-bold text-green-950">
            My Bookmarks
          </h1>

          <p className="mt-3 max-w-2xl leading-7 text-gray-600">
            Plants you have saved while exploring the Virtual Herbal Garden.
          </p>

        </div>
      </section>

      {/* Bookmarks */}
      <section className="mx-auto max-w-7xl px-6 py-12">

        {bookmarks.length === 0 ? (
          <div className="rounded-3xl border border-green-100 bg-white px-6 py-16 text-center shadow-sm">

            <div className="text-5xl">
              🔖
            </div>

            <h2 className="mt-5 text-2xl font-semibold text-green-950">
              No bookmarked plants yet
            </h2>

            <p className="mx-auto mt-3 max-w-md leading-7 text-gray-600">
              Explore the plants in our garden and save the ones
              you would like to learn about later.
            </p>

            <Link
              to="/plants"
              className="mt-6 inline-flex rounded-full bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
            >
              Explore Plants
            </Link>

          </div>
        ) : (
          <>
            <div className="mb-8">
              <p className="text-sm text-gray-600">
                {bookmarks.length}{" "}
                {bookmarks.length === 1 ? "plant" : "plants"} saved
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {bookmarks.map((bookmark) => (
                <PlantCard
                  key={bookmark._id}
                  plant={bookmark.plant}
                />
              ))}
            </div>
          </>
        )}

      </section>
    </main>
  );
};

export default MyBookmarks;