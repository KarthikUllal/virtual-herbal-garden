import api from "../utils/axios";

const getAllPlants = async (params = {}) => {
    const response = await api.get("/plants", { params });
    return response.data;
};

const getPlantById = async (plantId) => {
    const response = await api.get(`/plants/${plantId}`);
    return response.data;
};

export {
    getAllPlants,
    getPlantById
};