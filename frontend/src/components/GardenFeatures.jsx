const features = [
    {
        icon: "🌿",
        title: "Explore Plants",
        description:
            "Discover medicinal plants and learn about their botanical names, habitats, traditional uses, and cultivation."
    },
    {
        icon: "🎥",
        title: "Visual Learning",
        description:
            "Learn through plant images and educational videos that make information easier to understand."
    },
    {
        icon: "🔊",
        title: "Audio Guides",
        description:
            "Listen to short educational narrations while exploring different plants in the garden."
    },
    {
        icon: "🌱",
        title: "Virtual Experience",
        description:
            "Explore a digital herbal garden and interact with plants from anywhere."
    }
];

const GardenFeatures = () => {
    return (
        <section className="bg-[#f7faf5] px-6 py-20">
            <div className="mx-auto max-w-7xl">

                {/* Heading */}
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-widest text-green-600">
                        Why Virtual Herbal Garden?
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-green-950 sm:text-4xl">
                        Learn about nature in a new way
                    </h2>

                    <p className="mt-4 leading-7 text-gray-600">
                        Explore medicinal plants through an interactive
                        digital experience designed to make learning
                        engaging and accessible.
                    </p>
                </div>

                {/* Features */}
                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="group rounded-3xl border border-green-100 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-lg"
                        >
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-3xl transition group-hover:bg-green-100">
                                {feature.icon}
                            </div>

                            <h3 className="mt-5 text-lg font-semibold text-green-950">
                                {feature.title}
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-gray-600">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default GardenFeatures;