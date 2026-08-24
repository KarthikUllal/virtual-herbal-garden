const connectDB = require("../config/db");
const { getPlantDetails } = require("./tools/plant.tool");

const test = async () => {
    try {
        await connectDB();

        const result = await getPlantDetails("Tulsi");

        console.log("TOOL RESULT:");
        console.log(result);

        process.exit(0);
    } catch (error) {
        console.error("Test error:", error);
        process.exit(1);
    }
};

test();