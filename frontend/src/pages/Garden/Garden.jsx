import { useMemo, useState } from "react";
import GardenPlant from "../../components/GardenPlant";
import usePlants from "../../hooks/usePlants";

const Garden = () => {
  const [search, setSearch] = useState("");

  const filters = useMemo(() => {
    return {
      search,
    };
  }, [search]);

  const { plants, loading, error } = usePlants(filters);

  return (
    <main className="min-h-screen bg-[#eef7e9]">
      {/* Header */}
      <section className="px-6 py-16 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-green-600">
          Virtual Experience
        </p>

        <h1 className="mt-3 text-5xl font-bold text-green-950">
          Virtual Herbal Garden
        </h1>

        <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
          Explore medicinal plants and discover their traditional uses.
        </p>
      </section>

      {/* Search */}
      <section className="mx-auto max-w-3xl px-6 pb-8">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search plants..."
          className="w-full rounded-2xl border border-green-200 bg-white px-5 py-4 shadow-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
        />
      </section>

      {/* Garden */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="relative min-h-[800px] overflow-hidden rounded-[2rem] border border-green-200 bg-gradient-to-b from-sky-100 via-green-100 to-green-200 shadow-xl lg:min-h-[650px]">
          {/* Sky glow */}
          <div className="absolute left-1/2 top-10 h-32 w-32 -translate-x-1/2 rounded-full bg-yellow-100/60 blur-2xl" />

          {/* Grass */}
          <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-green-300 to-green-200/60" />

          {/* Garden soil */}
          <div className="absolute bottom-0 left-1/2 h-24 w-[70%] -translate-x-1/2 rounded-t-[50%] bg-amber-100/70 blur-[1px]" />

          {/* Garden path */}
          <div className="absolute bottom-0 left-1/2 h-[65%] w-24 -translate-x-1/2 rotate-3 rounded-t-full bg-amber-50/80 sm:w-32" />

          {/* Decorative stones */}
          <div className="absolute bottom-8 left-[15%] h-5 w-8 rounded-full bg-stone-200/80" />

          <div className="absolute bottom-16 right-[18%] h-4 w-7 rounded-full bg-stone-200/80" />

          <div className="absolute bottom-12 right-[35%] h-5 w-9 rounded-full bg-stone-300/70" />

          {/* Plants */}
          {!loading &&
            !error &&
            plants.map((plant, index) => (
              <GardenPlant key={plant._id} plant={plant} index={index} />
            ))}

          {/* Loading */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="rounded-full bg-white/80 px-5 py-3 text-sm font-medium text-green-700 shadow-sm">
                Preparing your garden...
              </p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="rounded-full bg-white/90 px-5 py-3 text-sm text-red-600 shadow-sm">
                {error}
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Garden;
