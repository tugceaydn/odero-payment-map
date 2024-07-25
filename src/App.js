import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MerchantPage from "./pages/MerchantPage";
import MapPage from "./pages/MapPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MapPage />} />
        <Route path="/merchant" element={<MerchantPage />} />
      </Routes>
    </Router>
  );
}

export default App;
