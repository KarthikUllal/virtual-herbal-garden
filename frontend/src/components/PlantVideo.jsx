const PlantVideo = ({ video, plantName }) => {
    if (!video) {
        return null;
    }

    return (
        <div className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm">

            <div className="mb-5">
                <div className="text-3xl">🎥</div>

                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                    Explore {plantName}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                    Watch a short video about this plant.
                </p>
            </div>

            <div className="overflow-hidden rounded-xl bg-black">
                <video
                    controls
                    preload="metadata"
                    className="aspect-video w-full"
                    aria-label={`${plantName} video`}
                >
                    <source
                        src={video}
                        type="video/mp4"
                    />

                    Your browser does not support video playback.
                </video>
            </div>

        </div>
    );
};

export default PlantVideo;