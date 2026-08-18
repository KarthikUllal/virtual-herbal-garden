//this hook is used to fetch plant data from the backend using id
import { useEffect, useState } from "react";
import { getPlantById } from "../services/plant.service";
import { useParams } from "react-router-dom";

const usePlant = () => {
    const { id } = useParams();

    const [plant, setPlant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlant = async () => {
            try {
                const response = await getPlantById(id);

                setPlant(response.data);
            } catch (error) {
                console.error("Error fetching plant:", error);
                setError("Failed to load plant");
            } finally {
                setLoading(false);
            }
        };

        fetchPlant();
    }, [id]);

    return {
        plant,
        loading,
        error
    };
};

export default usePlant;