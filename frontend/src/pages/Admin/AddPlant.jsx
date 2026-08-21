import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import {
  createPlant,
  updatePlant,
} from "../../services/admin.service";

import { getPlantById } from "../../services/plant.service";

const AddPlant = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  // If id exists -> Edit mode
  // If id does not exist -> Add mode
  const isEditMode = Boolean(id);

  // ==========================================
  // Form Data
  // ==========================================

  const [formData, setFormData] = useState({
    name: "",
    botanicalName: "",
    commonNames: "",
    habitat: "",
    medicinalUses: "",
    cultivationMethod: "",
    region: "",
    type: "",
  });

  // ==========================================
  // New Files
  // ==========================================

  const [files, setFiles] = useState({
    images: [],
    video: null,
    audio: null,
    model3D: null,
  });

  // ==========================================
  // Existing Media
  // ==========================================

  const [existingMedia, setExistingMedia] = useState({
    images: [],
    video: "",
    audio: "",
    model3D: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetchingPlant, setFetchingPlant] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // Fetch Existing Plant
  // ==========================================

  useEffect(() => {
    if (!isEditMode) {
      return;
    }

    const fetchPlant = async () => {
      try {
        setFetchingPlant(true);
        setError("");

        const result = await getPlantById(id);

        const plant = result.data;

        // Fill text fields
        setFormData({
          name: plant.name || "",
          botanicalName: plant.botanicalName || "",

          commonNames: Array.isArray(plant.commonNames)
            ? plant.commonNames.join(", ")
            : plant.commonNames || "",

          habitat: plant.habitat || "",

          medicinalUses: Array.isArray(plant.medicinalUses)
            ? plant.medicinalUses.join(", ")
            : plant.medicinalUses || "",

          cultivationMethod: plant.cultivationMethod || "",
          region: plant.region || "",
          type: plant.type || "",
        });

        // Save existing media URLs
        setExistingMedia({
          images: plant.images || [],
          video: plant.video || "",
          audio: plant.audio || "",
          model3D: plant.model3D || "",
        });
      } catch (error) {
        console.error("Error fetching plant:", error);

        setError(
          error.response?.data?.message ||
            error.message ||
            "Failed to load plant"
        );
      } finally {
        setFetchingPlant(false);
      }
    };

    fetchPlant();
  }, [id, isEditMode]);

  // ==========================================
  // Handle Text Fields
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // Handle File Fields
  // ==========================================

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;

    setFiles((prev) => ({
      ...prev,
      [name]:
        name === "images"
          ? Array.from(selectedFiles)
          : selectedFiles[0] || null,
    }));
  };

  // ==========================================
  // Submit
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const data = new FormData();

      // ========================================
      // Text Fields
      // ========================================

      data.append("name", formData.name);
      data.append("botanicalName", formData.botanicalName);
      data.append("commonNames", formData.commonNames);
      data.append("habitat", formData.habitat);
      data.append("medicinalUses", formData.medicinalUses);
      data.append(
        "cultivationMethod",
        formData.cultivationMethod
      );
      data.append("region", formData.region);
      data.append("type", formData.type);

      // ========================================
      // Images
      // ========================================

      files.images.forEach((image) => {
        data.append("images", image);
      });

      // ========================================
      // Video
      // ========================================

      if (files.video) {
        data.append("video", files.video);
      }

      // ========================================
      // Audio
      // ========================================

      if (files.audio) {
        data.append("audio", files.audio);
      }

      // ========================================
      // 3D Model
      // ========================================

      if (files.model3D) {
        data.append("model3D", files.model3D);
      }

      // ========================================
      // Add OR Update
      // ========================================

      let response;

      if (isEditMode) {
        response = await updatePlant(
          id,
          data,
          token
        );

        console.log(
          "Plant updated:",
          response.data
        );

        alert("Plant updated successfully!");
      } else {
        response = await createPlant(
          data,
          token
        );

        console.log(
          "Plant created:",
          response.data
        );

        alert("Plant added successfully!");
      }

      // Go back to Manage Plants
      navigate("/admin/plants");
    } catch (error) {
      console.error(
        isEditMode
          ? "Error updating plant:"
          : "Error adding plant:",
        error
      );

      setError(
        error.response?.data?.message ||
          error.message ||
          (isEditMode
            ? "Failed to update plant"
            : "Failed to add plant")
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Loading Existing Plant
  // ==========================================

  if (fetchingPlant) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-gray-500">
          Loading plant...
        </p>
      </div>
    );
  }

  // ==========================================
  // Page
  // ==========================================

  return (
    <div>
      {/* ====================================== */}
      {/* Page Header */}
      {/* ====================================== */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-900">
          {isEditMode ? "Edit Plant" : "Add Plant"}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          {isEditMode
            ? "Update the plant information in the virtual herbal garden."
            : "Add a new medicinal plant to the virtual herbal garden."}
        </p>
      </div>

      {/* ====================================== */}
      {/* Error */}
      {/* ====================================== */}

      {error && (
        <div className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* ====================================== */}
      {/* Form */}
      {/* ====================================== */}

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-green-100 bg-white p-8 shadow-sm"
      >
        <div className="space-y-6">
          {/* ================================== */}
          {/* Plant Information */}
          {/* ================================== */}

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-green-900">
              Plant Information
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Enter the basic information about the medicinal plant.
            </p>
          </div>

          {/* Plant Name + Botanical Name */}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Plant Name */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Plant Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g. Tulsi"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-500"
              />
            </div>

            {/* Botanical Name */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Botanical Name
              </label>

              <input
                type="text"
                name="botanicalName"
                value={formData.botanicalName}
                onChange={handleChange}
                placeholder="e.g. Ocimum tenuiflorum"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-500"
              />
            </div>
          </div>

          {/* Common Names */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Common Names
            </label>

            <textarea
              name="commonNames"
              value={formData.commonNames}
              onChange={handleChange}
              rows={4}
              placeholder="Enter common names, regional names, local names, etc..."
              className="w-full resize-y rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-500"
            />

            <p className="mt-1 text-xs text-gray-400">
              Separate multiple names with commas.
            </p>
          </div>

          {/* Habitat */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Habitat
            </label>

            <textarea
              name="habitat"
              value={formData.habitat}
              onChange={handleChange}
              rows={6}
              placeholder="Describe the natural habitat, climate, soil conditions, altitude, environment, etc..."
              className="w-full resize-y rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-500"
            />
          </div>

          {/* Medicinal Uses */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Medicinal Uses
            </label>

            <textarea
              name="medicinalUses"
              value={formData.medicinalUses}
              onChange={handleChange}
              rows={8}
              placeholder="Describe the medicinal uses, traditional uses, benefits, and applications..."
              className="w-full resize-y rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-500"
            />

            <p className="mt-1 text-xs text-gray-400">
              Separate multiple uses with commas.
            </p>
          </div>

          {/* Cultivation Method */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Cultivation Method
            </label>

            <textarea
              name="cultivationMethod"
              value={formData.cultivationMethod}
              onChange={handleChange}
              rows={8}
              placeholder="Describe soil requirements, planting method, watering, sunlight, propagation, harvesting, etc..."
              className="w-full resize-y rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-500"
            />
          </div>

          {/* Region */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Region
            </label>

            <textarea
              name="region"
              value={formData.region}
              onChange={handleChange}
              rows={5}
              placeholder="Describe the regions where this plant is commonly found or cultivated..."
              className="w-full resize-y rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-500"
            />
          </div>

          {/* Plant Type */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Plant Type
            </label>

            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="e.g. Herb, Shrub, Tree, Climber"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-500"
            />
          </div>

          {/* ================================== */}
          {/* Plant Media */}
          {/* ================================== */}

          <div className="mt-10 border-t border-green-100 pt-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-green-900">
                Plant Media
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Upload images, video, audio, and a 3D model for this plant.
              </p>
            </div>

            <div className="space-y-6">
              {/* Images */}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Plant Images
                </label>

                {/* Existing Images */}

                {isEditMode &&
                  existingMedia.images.length > 0 && (
                    <div className="mb-4">
                      <p className="mb-2 text-sm font-medium text-gray-600">
                        Current Images
                      </p>

                      <div className="flex flex-wrap gap-3">
                        {existingMedia.images.map(
                          (image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`Plant ${index + 1}`}
                              className="h-24 w-24 rounded-xl border object-cover"
                            />
                          )
                        )}
                      </div>
                    </div>
                  )}

                <input
                  type="file"
                  name="images"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm"
                />

                <p className="mt-1 text-xs text-gray-400">
                  {isEditMode
                    ? "Upload new images only if you want to replace the current images."
                    : "Upload up to 5 plant images."}
                </p>

                {files.images.length > 0 && (
                  <p className="mt-2 text-sm text-green-700">
                    {files.images.length} image(s) selected
                  </p>
                )}
              </div>

              {/* Video */}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Plant Video
                </label>

                {isEditMode &&
                  existingMedia.video && (
                    <div className="mb-3">
                      <p className="mb-2 text-sm font-medium text-gray-600">
                        Current Video
                      </p>

                      <a
                        href={existingMedia.video}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-green-700 underline"
                      >
                        View current video
                      </a>
                    </div>
                  )}

                <input
                  type="file"
                  name="video"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm"
                />

                <p className="mt-1 text-xs text-gray-400">
                  {isEditMode
                    ? "Upload a new video only if you want to replace the current one."
                    : "Upload one video related to the plant."}
                </p>

                {files.video && (
                  <p className="mt-2 text-sm text-green-700">
                    Selected: {files.video.name}
                  </p>
                )}
              </div>

              {/* Audio */}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Plant Audio
                </label>

                {isEditMode &&
                  existingMedia.audio && (
                    <div className="mb-3">
                      <p className="mb-2 text-sm font-medium text-gray-600">
                        Current Audio
                      </p>

                      <a
                        href={existingMedia.audio}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-green-700 underline"
                      >
                        Play / View current audio
                      </a>
                    </div>
                  )}

                <input
                  type="file"
                  name="audio"
                  accept="audio/*"
                  onChange={handleFileChange}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm"
                />

                <p className="mt-1 text-xs text-gray-400">
                  {isEditMode
                    ? "Upload a new audio file only if you want to replace the current one."
                    : "Upload one audio file for the plant."}
                </p>

                {files.audio && (
                  <p className="mt-2 text-sm text-green-700">
                    Selected: {files.audio.name}
                  </p>
                )}
              </div>

              {/* 3D Model */}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  3D Plant Model
                </label>

                {isEditMode &&
                  existingMedia.model3D && (
                    <div className="mb-3">
                      <p className="mb-2 text-sm font-medium text-gray-600">
                        Current 3D Model
                      </p>

                      <a
                        href={existingMedia.model3D}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-green-700 underline"
                      >
                        View current 3D model
                      </a>
                    </div>
                  )}

                <input
                  type="file"
                  name="model3D"
                  accept=".glb,.gltf,.obj,.fbx"
                  onChange={handleFileChange}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm"
                />

                <p className="mt-1 text-xs text-gray-400">
                  {isEditMode
                    ? "Upload a new model only if you want to replace the current model."
                    : "Upload a 3D model of the plant."}
                </p>

                {files.model3D && (
                  <p className="mt-2 text-sm text-green-700">
                    Selected: {files.model3D.name}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ================================== */}
        {/* Submit */}
        {/* ================================== */}

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-green-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? isEditMode
                ? "Updating Plant..."
                : "Adding Plant..."
              : isEditMode
                ? "Update Plant"
                : "Add Plant"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPlant;