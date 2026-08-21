import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getAllPlants } from "../../services/plant.service";
import { deletePlant } from "../../services/admin.service";
import { useAuth } from "../../context/AuthContext";

const AdminPlants = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { token } = useAuth();
  const navigate = useNavigate();

  // ==========================================
  // Fetch Plants
  // ==========================================

  const fetchPlants = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getAllPlants();

      setPlants(result.data);
    } catch (error) {
      console.error("Fetch plants error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to fetch plants"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Edit Plant
  // ==========================================

  const handleEdit = (plantId) => {
    navigate(`/admin/plants/edit/${plantId}`);
  };

  // ==========================================
  // Delete Plant
  // ==========================================

  const handleDelete = async (plantId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this plant?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deletePlant(plantId, token);

      setPlants((prevPlants) =>
        prevPlants.filter(
          (plant) => plant._id !== plantId
        )
      );
    } catch (error) {
      console.error(
        "Delete plant error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete plant"
      );
    }
  };

  // ==========================================
  // Load Plants
  // ==========================================

  useEffect(() => {
    fetchPlants();
  }, []);

  // ==========================================
  // Loading State
  // ==========================================

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-gray-500">
          Loading plants...
        </p>
      </div>
    );
  }

  // ==========================================
  // Error State
  // ==========================================

  if (error) {
    return (
      <div className="rounded-2xl bg-red-50 p-6 text-red-600">
        {error}
      </div>
    );
  }

  // ==========================================
  // Page
  // ==========================================

  return (
    <div>

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold text-green-900">
            Manage Plants
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Add, edit and delete plants from the garden.
          </p>
        </div>

        <Link
          to="/admin/plants/add"
          className="rounded-xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
        >
          + Add Plant
        </Link>

      </div>

      {/* Plants Container */}
      <div className="overflow-hidden rounded-2xl border border-green-100 bg-white shadow-sm">

        {/* Total Plants */}
        <div className="border-b border-green-100 px-6 py-4">
          <p className="text-sm font-medium text-gray-600">
            Total Plants:{" "}
            <span className="font-bold text-green-700">
              {plants.length}
            </span>
          </p>
        </div>

        {/* Empty State */}
        {plants.length === 0 ? (

          <div className="p-10 text-center text-gray-500">
            No plants found.
          </div>

        ) : (

          /* Plant List */
          <div className="divide-y divide-green-50">

            {plants.map((plant) => (

              <div
                key={plant._id}
                className="flex items-center justify-between px-6 py-5 transition hover:bg-green-50/40"
              >

                {/* Plant Information */}
                <div className="flex items-center gap-4">

                  {/* Image */}
                  <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-green-50">

                    {plant.images?.length > 0 ? (

                      <img
                        src={plant.images[0]}
                        alt={plant.name}
                        className="h-full w-full object-cover"
                      />

                    ) : (

                      <span className="text-3xl">
                        🌿
                      </span>

                    )}

                  </div>

                  {/* Details */}
                  <div>

                    <h2 className="font-semibold text-gray-900">
                      {plant.name}
                    </h2>

                    <p className="text-sm italic text-gray-500">
                      {plant.botanicalName}
                    </p>

                    <p className="mt-1 text-xs text-green-600">
                      {plant.type}
                    </p>

                  </div>

                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">

                  {/* Edit */}
                  <button
                    type="button"
                    onClick={() =>
                      handleEdit(plant._id)
                    }
                    className="rounded-lg border border-blue-200 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
                  >
                    Edit
                  </button>

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(plant._id)
                    }
                    className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default AdminPlants;