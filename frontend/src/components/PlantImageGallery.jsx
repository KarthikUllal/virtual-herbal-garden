import { useState } from "react";
import getOptimizedImageUrl from "../utils/cloudinary";

const PlantImageGallery = ({ images, plantName }) => {
    const [selectedImage, setSelectedImage] = useState(0);

    if (!images || images.length === 0) {
        return (
            <div className="flex h-[450px] items-center justify-center rounded-3xl bg-green-50">
                <span className="text-8xl">🌿</span>
            </div>
        );
    }

    return (
        <div>
            {/* Main Image */}
            <div className="overflow-hidden rounded-3xl border border-green-100 bg-white shadow-sm">
                <img
                    src={getOptimizedImageUrl(
                        images[selectedImage],
                        1200,
                        800
                    )}
                    alt={plantName}
                    className="h-[450px] w-full object-cover"
                />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="mt-4 flex gap-3">
                    {images.map((image, index) => (
                        <button
                            key={image}
                            onClick={() => setSelectedImage(index)}
                            className={`overflow-hidden rounded-xl border-2 transition ${
                                selectedImage === index
                                    ? "border-green-600"
                                    : "border-transparent"
                            }`}
                        >
                            <img
                                src={getOptimizedImageUrl(
                                    image,
                                    160,
                                    120
                                )}
                                alt={`${plantName} ${index + 1}`}
                                className="h-20 w-24 object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PlantImageGallery;