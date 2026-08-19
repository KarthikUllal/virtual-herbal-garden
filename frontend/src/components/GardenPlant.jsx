import { Link } from "react-router-dom";
import getOptimizedImageUrl from "../utils/cloudinary";

const positions = [
  "left-[5%] top-[10%] lg:left-[8%] lg:top-[15%]",
  "left-[38%] top-[5%] lg:left-[35%] lg:top-[8%]",
  "right-[5%] top-[12%] lg:right-[8%] lg:top-[18%]",
  "left-[8%] top-[38%] lg:left-[18%] lg:top-[45%]",
  "left-[42%] top-[35%] lg:left-[48%] lg:top-[38%]",
  "right-[7%] top-[40%] lg:right-[12%] lg:top-[45%]",
  "left-[3%] bottom-[8%] lg:left-[5%] lg:bottom-[8%]",
  "left-[35%] bottom-[5%] lg:left-[38%] lg:bottom-[5%]",
  "right-[32%] bottom-[8%] lg:right-[35%] lg:bottom-[8%]",
  "right-[3%] bottom-[5%] lg:right-[5%] lg:bottom-[5%]",
];

const GardenPlant = ({ plant, index }) => {
  const position = positions[index % positions.length];

  const isTopPlant = index < 3;

  return (
    <div className={`group absolute z-10 hover:z-50 ${position}`}>
      <div className="relative flex flex-col items-center">
        <Link to={`/plants/${plant._id}`}>
          <div className="h-24 w-24 sm:h-32 sm:w-32 lg:h-40 lg:w-40">
            <img
    src={getOptimizedImageUrl(
        plant.images?.[0],
        300,
        300
    )}
    alt={plant.name}
    style={{
        animationDelay: `${index * 0.4}s`
    }}
    className="h-full w-full object-contain drop-shadow-lg animate-[float_5s_ease-in-out_infinite] transition duration-500 group-hover:-translate-y-3 group-hover:scale-110"
/>
          </div>
        </Link>

        <div className="mt-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-green-900 shadow-md sm:px-4 sm:py-2 sm:text-sm">
          {plant.name}
        </div>

        {/* Hover Information */}
        <div
          className={`pointer-events-none absolute left-1/2 z-50 w-56 -translate-x-1/2 rounded-2xl bg-white p-4 opacity-0 shadow-xl transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 ${
            isTopPlant
              ? "top-full mt-4 translate-y-2"
              : "bottom-full mb-4 translate-y-2"
          }`}
        >
          <p className="text-lg font-semibold text-green-950">{plant.name}</p>

          <p className="mt-1 text-xs italic text-gray-500">
            {plant.botanicalName}
          </p>

          <p className="mt-2 text-sm text-gray-600">{plant.type}</p>

          <Link
            to={`/plants/${plant._id}`}
            className="mt-3 inline-block text-sm font-semibold text-green-600 hover:text-green-800"
          >
            View Plant →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GardenPlant;
