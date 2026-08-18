import { useEffect, useState } from "react";
import { getAllPlants } from "../services/plant.service";

const usePlants = (filters) => {
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlants = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await getAllPlants(filters);

                setPlants(data.data);
            } catch (error) {
                console.error("Error fetching plants:", error);
                setError("Failed to load plants");
            } finally {
                setLoading(false);
            }
        };

        fetchPlants();
    }, [filters]);

    return {
        plants,
        loading,
        error
    };
};

export default usePlants;