const PlantAudio = ({ audio, plantName }) => {
    if (!audio) {
        return null;
    }

    return (
        <div className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm">

            <div className="mb-5">
                <div className="text-3xl">🔊</div>

                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                    Audio Guide
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                    Listen to a short introduction about {plantName}.
                </p>
            </div>

            <audio
                controls
                preload="metadata"
                className="w-full"
            >
                <source
                    src={audio}
                    type="audio/mpeg"
                />

                Your browser does not support audio playback.
            </audio>

        </div>
    );
};

export default PlantAudio;