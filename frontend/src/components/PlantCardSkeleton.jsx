const PlantCardSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-green-100 bg-white shadow-sm">
      {/* Image skeleton */}
      <div className="aspect-[4/3] animate-pulse bg-gray-200" />

      {/* Content skeleton */}
      <div className="space-y-4 p-5">

        {/* Type */}
        <div className="h-5 w-20 animate-pulse rounded-full bg-gray-200" />

        {/* Plant name */}
        <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />

        {/* Botanical name */}
        <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />

        {/* Description */}
        <div className="space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-3 w-5/6 animate-pulse rounded bg-gray-200" />
        </div>

        {/* Button */}
        <div className="h-10 w-full animate-pulse rounded-xl bg-gray-200" />

      </div>
    </div>
  );
};

export default PlantCardSkeleton;