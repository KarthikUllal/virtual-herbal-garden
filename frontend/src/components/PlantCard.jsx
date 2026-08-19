import { useState } from "react";
import { Link } from "react-router-dom";
import getOptimizedImageUrl from "../utils/cloudinary";

const PlantCard = ({ plant }) => {
  const [imageLoading, setImageLoading] = useState(
    plant.images?.length > 0
  );

  return (
    <article className="group overflow-hidden rounded-2xl border border-green-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Plant Image */}
      <div className="relative flex h-56 items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 to-emerald-100">

        {plant.images?.length > 0 ? (
          <>
            {/* Image Skeleton */}
            {imageLoading && (
              <div className="absolute inset-0 animate-pulse bg-gray-200" />
            )}

            <img
              src={getOptimizedImageUrl(plant.images[0])}
              alt={plant.name}
              onLoad={() => setImageLoading(false)}
              className={`h-full w-full object-cover transition duration-500 group-hover:scale-105 ${
                imageLoading
                  ? "opacity-0"
                  : "opacity-100"
              }`}
            />
          </>
        ) : (
          <span className="text-7xl transition duration-500 group-hover:scale-110">
            🌿
          </span>
        )}

        {/* Plant Type */}
        <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-green-700 shadow-sm backdrop-blur-sm">
          {plant.type}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">

        <h2 className="text-xl font-semibold text-gray-900">
          {plant.name}
        </h2>

        <p className="mt-1 text-sm italic text-gray-500">
          {plant.botanicalName}
        </p>

        <p className="mt-4 line-clamp-2 text-sm leading-6 text-gray-600">
          {plant.habitat}
        </p>

        <Link
          to={`/plants/${plant._id}`}
          className="mt-5 flex items-center justify-between rounded-xl bg-green-700 px-4 py-3 text-sm font-medium text-white transition hover:bg-green-800"
        >
          <span>Explore Plant</span>

          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>

      </div>
    </article>
  );
};

export default PlantCard;