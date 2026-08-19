import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="border-t border-green-100 bg-green-950 text-green-100">

            <div className="mx-auto max-w-7xl px-6 py-12">

                <div className="grid gap-10 md:grid-cols-3">

                    {/* Brand */}
                    <div>
                        <Link
                            to="/"
                            className="text-xl font-bold text-white"
                        >
                            Virtual Herbal Garden
                        </Link>

                        <p className="mt-4 max-w-sm text-sm leading-6 text-green-200">
                            Explore medicinal plants, discover traditional
                            knowledge, and learn through an interactive
                            digital garden.
                        </p>
                    </div>

                    {/* Explore */}
                    <div>
                        <h3 className="font-semibold text-white">
                            Explore
                        </h3>

                        <div className="mt-4 flex flex-col gap-3 text-sm">
                            <Link
                                to="/"
                                className="transition hover:text-white"
                            >
                                Home
                            </Link>

                            <Link
                                to="/plants"
                                className="transition hover:text-white"
                            >
                                Plants
                            </Link>

                            <Link
                                to="/garden"
                                className="transition hover:text-white"
                            >
                                Virtual Garden
                            </Link>
                        </div>
                    </div>

                    {/* Project */}
                    <div>
                        <h3 className="font-semibold text-white">
                            About
                        </h3>

                        <p className="mt-4 text-sm leading-6 text-green-200">
                            An interactive educational platform for
                            exploring medicinal plants and learning about
                            their traditional uses.
                        </p>
                    </div>

                </div>

                {/* Bottom */}
                <div className="mt-10 border-t border-green-800 pt-6 text-center text-sm text-green-300">
                    © {new Date().getFullYear()} Virtual Herbal Garden.
                    All rights reserved.
                </div>

            </div>

        </footer>
    );
};

export default Footer;