import { Link } from "react-router-dom";
import usePlants from "../hooks/usePlants";
import PlantCard from "./PlantCard";

const FeaturedPlants = () => {
    const { plants, loading, error } = usePlants();

    const featuredPlants = plants.slice(0, 4);

    if (loading) {
        return (
            <section className="px-6 py-20">
                <div className="mx-auto max-w-7xl text-center text-green-700">
                    Loading plants...
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="px-6 py-20">
                <div className="mx-auto max-w-7xl text-center text-red-600">
                    {error}
                </div>
            </section>
        );
    }

    return (
        <section className="bg-white px-6 py-20">
            <div className="mx-auto max-w-7xl">

                {/* Heading */}
                <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

                    <div>
                        <p className="text-sm font-semibold uppercase tracking-widest text-green-600">
                            Explore
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-green-950 sm:text-4xl">
                            Featured Plants
                        </h2>

                        <p className="mt-3 max-w-xl text-gray-600">
                            Discover some of the medicinal plants available
                            in our virtual garden.
                        </p>
                    </div>

                    <Link
                        to="/plants"
                        className="font-semibold text-green-700 transition hover:text-green-900"
                    >
                        View all plants →
                    </Link>

                </div>

                {/* Plants */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {featuredPlants.map((plant) => (
                        <PlantCard
                            key={plant._id}
                            plant={plant}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default FeaturedPlants;