import { Link } from "react-router-dom";

const Home = () => {
    return (
        <main className="min-h-screen bg-[#f7faf5]">

            {/* Hero Section */}
            <section className="relative overflow-hidden">

                <div className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2">

                    {/* Hero Content */}
                    <div>

                        <span className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
                            🌿 Discover the world of medicinal plants
                        </span>

                        <h1 className="mt-6 max-w-3xl text-5xl font-bold leading-tight tracking-tight text-green-950 sm:text-6xl">
                            Explore the
                            <span className="block text-green-700">
                                healing world of nature.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
                            Discover medicinal plants, learn about their
                            traditional uses, explore their habitats, and
                            experience a virtual herbal garden.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">

                            <Link
                                to="/plants"
                                className="rounded-xl bg-green-700 px-6 py-3 font-medium text-white shadow-lg shadow-green-700/20 transition hover:bg-green-800"
                            >
                                Explore Plants →
                            </Link>

                            <button
                                className="rounded-xl border border-green-200 bg-white px-6 py-3 font-medium text-green-800 transition hover:bg-green-50"
                            >
                                Discover the Garden
                            </button>

                        </div>

                    </div>

                    {/* Hero Visual */}
                    <div className="relative flex justify-center">

                        <div className="absolute h-80 w-80 rounded-full bg-green-200/50 blur-3xl"></div>

                        <div className="relative flex h-[420px] w-full max-w-md items-center justify-center overflow-hidden rounded-[2rem] border border-green-100 bg-gradient-to-br from-green-100 to-emerald-50 shadow-2xl">

                            <span className="text-[10rem]">
                                🌿
                            </span>

                        </div>

                    </div>

                </div>

            </section>

            {/* Introduction */}
            <section className="border-t border-green-100 bg-white py-20">

                <div className="mx-auto max-w-7xl px-6">

                    <div className="max-w-2xl">

                        <p className="text-sm font-semibold uppercase tracking-widest text-green-600">
                            Explore • Learn • Discover
                        </p>

                        <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
                            Nature has a story to tell.
                        </h2>

                        <p className="mt-5 leading-8 text-gray-600">
                            The Virtual Herbal Garden brings traditional
                            knowledge about medicinal plants into an
                            interactive digital experience.
                        </p>

                    </div>

                    <div className="mt-12 grid gap-6 md:grid-cols-3">

                        <div className="rounded-2xl border border-green-100 bg-green-50/50 p-6">
                            <div className="text-3xl">🌱</div>

                            <h3 className="mt-4 text-lg font-semibold text-gray-900">
                                Discover Plants
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-gray-600">
                                Browse plants and learn about their
                                characteristics, habitats and regions.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-green-100 bg-green-50/50 p-6">
                            <div className="text-3xl">📖</div>

                            <h3 className="mt-4 text-lg font-semibold text-gray-900">
                                Learn Their Uses
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-gray-600">
                                Explore traditional medicinal knowledge
                                associated with each plant.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-green-100 bg-green-50/50 p-6">
                            <div className="text-3xl">🌍</div>

                            <h3 className="mt-4 text-lg font-semibold text-gray-900">
                                Experience Nature
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-gray-600">
                                Discover an immersive digital garden with
                                multimedia and interactive experiences.
                            </p>
                        </div>

                    </div>

                </div>

            </section>

        </main>
    );
};

export default Home;