import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home/Home";
import Plants from "./pages/Plants/Plants";
import PlantDetails from "./pages/PlantDetails/PlantDetails";

const App = () => {
    return (
        <BrowserRouter>

            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/plants" element={<Plants />} />
                <Route path="/plants/:id" element={<PlantDetails />} />
            </Routes>

        </BrowserRouter>
    );
};

export default App;