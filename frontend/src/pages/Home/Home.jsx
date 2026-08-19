import { Link } from "react-router-dom";

const Home = () => {
    return (
        <main className="min-h-screen bg-[#f7faf5]">

            {/* Hero */}
            <section className="relative overflow-hidden">
                
                {/* Background decoration */}
                <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-green-200/40 blur-3xl" />

                <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl" />

                <div className="relative mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2">

                    {/* Left Content */}
                    <div>

                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-600">
                            Virtual Herbal Garden
                        </p>

                        <h1 className="mt-5 text-5xl font-bold leading-tight tracking-tight text-green-950 sm:text-6xl">
                            Discover the
                            <span className="block text-green-600">
                                world of medicinal plants.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
                            Explore traditional medicinal plants, learn about
                            their uses, discover how they grow, and experience
                            them through an interactive digital garden.
                        </p>

                        {/* Buttons */}
                        <div className="mt-8 flex flex-wrap gap-4">

                            <Link
                                to="/garden"
                                className="rounded-full bg-green-700 px-7 py-3.5 font-semibold text-white shadow-lg shadow-green-700/20 transition hover:-translate-y-0.5 hover:bg-green-800"
                            >
                                Discover the Garden
                            </Link>

                            <Link
                                to="/plants"
                                className="rounded-full border border-green-200 bg-white px-7 py-3.5 font-semibold text-green-800 transition hover:border-green-400 hover:bg-green-50"
                            >
                                Explore Plants
                            </Link>

                        </div>

                    </div>

                    {/* Right Visual */}
                    <div className="relative flex justify-center">

                        <div className="relative flex h-[420px] w-[420px] items-center justify-center rounded-full bg-green-100/70 shadow-inner sm:h-[500px] sm:w-[500px]">

                            {/* Decorative circles */}
                            <div className="absolute h-[80%] w-[80%] rounded-full border border-green-300/50" />

                            <div className="absolute h-[65%] w-[65%] rounded-full border border-green-300/40" />

                            {/* Main visual */}
                            <div className="relative text-center">

                                <div className="text-[9rem] drop-shadow-xl">
                                    🌿
                                </div>

                                <div className="mt-2 rounded-full bg-white/80 px-6 py-3 shadow-lg backdrop-blur-sm">
                                    <p className="font-semibold text-green-950">
                                        Explore. Learn. Discover.
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </section>

        </main>
    );
};

export default Home;