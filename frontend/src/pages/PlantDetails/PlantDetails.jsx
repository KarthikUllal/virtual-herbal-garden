import { Link } from "react-router-dom";
import usePlant from "../../hooks/usePlant";
import PlantImageGallery from "../../components/PlantImageGallery";
import PlantVideo from "../../components/PlantVideo";
import PlantAudio from "../../components/PlantAudio";

const PlantDetails = () => {
  const { plant, loading, error } = usePlant();

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7faf5]">
        <p className="text-green-700">Loading plant...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7faf5]">
        <p className="text-red-600">{error}</p>
      </main>
    );
  }

  if (!plant) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7faf5]">
        <p className="text-gray-600">Plant not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7faf5]">
      {/* Header */}
      <section className="border-b border-green-100 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <Link
            to="/plants"
            className="text-sm font-medium text-green-700 transition hover:text-green-900"
          >
            ← Back to Plants
          </Link>
        </div>
      </section>

      {/* Main Plant Section */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Image */}
          <PlantImageGallery images={plant.images} plantName={plant.name} />

          {/* Basic Information */}
          <div className="flex flex-col justify-center">
            <span className="w-fit rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
              {plant.type}
            </span>

            <h1 className="mt-5 text-5xl font-bold tracking-tight text-green-950">
              {plant.name}
            </h1>

            <p className="mt-3 text-xl italic text-gray-500">
              {plant.botanicalName}
            </p>

            <div className="mt-8">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-green-600">
                Common Names
              </h2>

              <div className="mt-3 flex flex-wrap gap-2">
                {plant.commonNames?.map((name, index) => (
                  <span
                    key={index}
                    className="rounded-full border border-green-200 bg-white px-4 py-2 text-sm text-gray-700"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>

           <div className="mt-8 grid gap-4 sm:grid-cols-2">

    <div className="rounded-2xl border border-green-100 bg-green-50/50 p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-green-600">
            Region
        </p>

        <p className="mt-2 leading-6 text-gray-700">
            {plant.region}
        </p>
    </div>

    <div className="rounded-2xl border border-green-100 bg-green-50/50 p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-green-600">
            Habitat
        </p>

        <p className="mt-2 leading-6 text-gray-700">
            {plant.habitat}
        </p>
    </div>

</div>
          </div>
        </div>
      </section>

      {/* Plant Information */}
      <section className="border-t border-green-100 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Medicinal Uses */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-green-600">
                Traditional Knowledge
              </p>

              <h2 className="mt-3 text-3xl font-bold text-gray-900">
                Medicinal Uses
              </h2>

              <div className="mt-6 space-y-4">
                {plant.medicinalUses?.map((use, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-green-100 bg-green-50/50 p-5"
                  >
                    <p className="leading-7 text-gray-700">{use}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Cultivation */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-green-600">
                Growing Information
              </p>

              <h2 className="mt-3 text-3xl font-bold text-gray-900">
                Cultivation
              </h2>

              <div className="mt-6 rounded-2xl border border-green-100 bg-green-50/50 p-6">
                <p className="leading-8 text-gray-700">
                  {plant.cultivationMethod}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Media Section */}
      <section className="bg-[#f7faf5]">
        <div className="mx-auto max-w-7xl px-6 py-16">
          {/* Section Header */}
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-green-600">
              Experience
            </p>

            <h2 className="mt-3 text-3xl font-bold text-green-950">
              Explore {plant.name}
            </h2>

            <p className="mt-3 max-w-2xl leading-7 text-gray-600">
              Learn more about {plant.name} through visual and audio
              experiences.
            </p>
          </div>

          {/* Media Grid */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Video */}
            <PlantVideo video={plant.video} plantName={plant.name} />

            {/* Audio */}
            <PlantAudio audio={plant.audio} plantName={plant.name} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default PlantDetails;
