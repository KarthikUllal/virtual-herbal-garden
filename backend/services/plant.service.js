const plantModel = require("../models/plant.model");

//create plant model
const createPlant = async (plantData) => {
    return await plantModel.create(plantData);
}

//get all plants
const getAllPlants = async (filters = {}) => {
    const {search, type, region} = filters;
    const query = {};
    if (search){
        query.$or = [
            { name: { $regex: search, $options: "i" } },
            { botanicalName: { $regex: search, $options: "i" } },
            { commonNames: { $regex: search, $options: "i" } }
        ]
    }
    if (type){
        query.type = { $regex: type, $options: "i" };
    }
    if (region){
        query.region = { $regex: region, $options: "i" };
    }
    return await plantModel.find(query);
}

//get plant by id
const getPlantById = async (plantId) => {
    return await plantModel.findById(plantId);
}

//update plant by id
const updatePlant = async (plantId, plantData) => {
    return await plantModel.findByIdAndUpdate(plantId, plantData, { new: true, runValidators: true });
}

//delete plant by id
const deletePlant = async (plantId) => {
    return await plantModel.findByIdAndDelete(plantId);
}

module.exports = {
    createPlant,
    getAllPlants,
    getPlantById,
    updatePlant,
    deletePlant
}
