import { useMemo, useState } from "react";
import PlantCard from "../../components/PlantCard";
import usePlants from "../../hooks/usePlants";

const Plants = () => {
    const [search, setSearch] = useState("");
    const [type, setType] = useState("");

    const filters = useMemo(() => {
        return {
            search,
            type
        };
    }, [search, type]);

    const { plants, loading, error } = usePlants(filters);

    const clearFilters = () => {
        setSearch("");
        setType("");
    };

    return (
        <main className="min-h-screen bg-[#f7faf5]">

            {/* Header */}
            <section className="border-b border-green-100 bg-white">
                <div className="mx-auto max-w-7xl px-6 py-16">

                    <p className="text-sm font-semibold uppercase tracking-widest text-green-600">
                        Explore • Learn • Discover
                    </p>

                    <div className="mt-3 flex flex-col justify-between gap-6 md:flex-row md:items-end">

                        <div>
                            <h1 className="text-4xl font-bold tracking-tight text-green-950 sm:text-5xl">
                                Medicinal Plants
                            </h1>

                            <p className="mt-4 max-w-2xl leading-7 text-gray-600">
                                Explore traditional medicinal plants and
                                discover their uses, habitats, cultivation
                                methods, and regions.
                            </p>
                        </div>

                        <div className="shrink-0 rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
                            {plants.length} Plants
                        </div>

                    </div>

                </div>
            </section>

            {/* Search & Filters */}
            <section className="mx-auto max-w-7xl px-6 pt-10">

                <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">

                    <div className="grid gap-4 md:grid-cols-[1fr_220px_auto]">

                        {/* Search */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Search plants
                            </label>

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by plant name..."
                                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                            />
                        </div>

                        {/* Type */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Type
                            </label>

                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                            >
                                <option value="">All Types</option>
                                <option value="Herb">Herb</option>
                                <option value="Tree">Tree</option>
                                <option value="Shrub">Shrub</option>
                                <option value="Succulent Herb">
                                    Succulent Herb
                                </option>
                                <option value="Climbing Herb">
                                    Climbing Herb
                                </option>
                            </select>
                        </div>

                        {/* Clear */}
                        <div className="flex items-end">
                            <button
                                onClick={clearFilters}
                                className="w-full rounded-xl border border-green-200 px-5 py-3 font-medium text-green-700 transition hover:bg-green-50 md:w-auto"
                            >
                                Clear
                            </button>
                        </div>

                    </div>

                </div>

            </section>

            {/* Results */}
            <section className="mx-auto max-w-7xl px-6 py-10">

                {loading && (
                    <div className="py-20 text-center">
                        <p className="text-green-700">
                            Loading plants...
                        </p>
                    </div>
                )}

                {error && (
                    <div className="py-20 text-center">
                        <p className="text-red-600">
                            {error}
                        </p>
                    </div>
                )}

                {!loading && !error && plants.length === 0 && (
                    <div className="rounded-2xl border border-green-100 bg-white py-20 text-center">
                        <p className="text-lg font-medium text-gray-800">
                            No plants found
                        </p>

                        <p className="mt-2 text-sm text-gray-500">
                            Try a different search or filter.
                        </p>
                    </div>
                )}

                {!loading && !error && plants.length > 0 && (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {plants.map((plant) => (
                            <PlantCard
                                key={plant._id}
                                plant={plant}
                            />
                        ))}
                    </div>
                )}

            </section>

        </main>
    );
};

export default Plants;