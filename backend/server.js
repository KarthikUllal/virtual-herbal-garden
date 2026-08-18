const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const plantRouter = require("./routes/v1/plant.routes");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

connectDB();

// Plant routes
app.use("/api/v1/plants", plantRouter);

app.get("/", (req, res) => {
    res.json({
        message: "Virtual Herbal Garden API is running"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});