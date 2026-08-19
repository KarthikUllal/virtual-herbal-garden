const PlantDetailsSkeleton = () => {
  return (
    <main className="min-h-screen bg-[#f7faf5] animate-pulse">

      {/* Header */}
      <section className="border-b border-green-100 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="h-4 w-28 rounded bg-gray-200" />
        </div>
      </section>

      {/* Main Plant Section */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-2">

          {/* Image */}
          <div className="aspect-square rounded-3xl bg-gray-200" />

          {/* Basic Information */}
          <div className="flex flex-col justify-center">

            <div className="h-7 w-20 rounded-full bg-gray-200" />

            <div className="mt-5 h-12 w-3/4 rounded bg-gray-200" />

            <div className="mt-4 h-6 w-1/2 rounded bg-gray-200" />

            {/* Common Names */}
            <div className="mt-8">
              <div className="h-4 w-32 rounded bg-gray-200" />

              <div className="mt-4 flex gap-2">
                <div className="h-9 w-20 rounded-full bg-gray-200" />
                <div className="h-9 w-24 rounded-full bg-gray-200" />
                <div className="h-9 w-20 rounded-full bg-gray-200" />
              </div>
            </div>

            {/* Region / Habitat */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="h-28 rounded-2xl bg-gray-200" />
              <div className="h-28 rounded-2xl bg-gray-200" />
            </div>

          </div>
        </div>
      </section>

      {/* Information Skeleton */}
      <section className="border-t border-green-100 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">

          <div className="grid gap-12 lg:grid-cols-2">

            <div>
              <div className="h-4 w-36 rounded bg-gray-200" />
              <div className="mt-4 h-9 w-52 rounded bg-gray-200" />

              <div className="mt-6 space-y-4">
                <div className="h-24 rounded-2xl bg-gray-200" />
                <div className="h-24 rounded-2xl bg-gray-200" />
                <div className="h-24 rounded-2xl bg-gray-200" />
              </div>
            </div>

            <div>
              <div className="h-4 w-36 rounded bg-gray-200" />
              <div className="mt-4 h-9 w-48 rounded bg-gray-200" />

              <div className="mt-6 h-48 rounded-2xl bg-gray-200" />
            </div>

          </div>
        </div>
      </section>

      {/* Media Skeleton */}
      <section className="bg-[#f7faf5]">
        <div className="mx-auto max-w-7xl px-6 py-16">

          <div className="h-4 w-24 rounded bg-gray-200" />

          <div className="mt-4 h-9 w-64 rounded bg-gray-200" />

          <div className="mt-3 h-5 w-96 max-w-full rounded bg-gray-200" />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="aspect-video rounded-2xl bg-gray-200" />
            <div className="aspect-video rounded-2xl bg-gray-200" />
          </div>

        </div>
      </section>

    </main>
  );
};

export default PlantDetailsSkeleton;