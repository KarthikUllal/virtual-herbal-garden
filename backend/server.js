const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const plantRouter = require("./routes/v1/plant.routes");
const authRouter = require("./routes/v1/auth.routes");
const bookmarkRouter = require("./routes/v1/bookmark.routes");
const userRouter = require("./routes/v1/user.routes");
const adminRouter = require("./routes/v1/admin.routes");


const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

connectDB();

// Plant routes
app.use("/api/v1/plants", plantRouter);

//auth routes

app.use("/api/v1/auth", authRouter);

// Bookmark routes
app.use("/api/v1/bookmarks", bookmarkRouter);

// User routes
app.use("/api/v1/users", userRouter);

// Admin routes
app.use("/api/v1/admin", adminRouter);



// Home route
app.get("/", (req, res) => {
    res.json({
        message: "Virtual Herbal Garden API is running"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});