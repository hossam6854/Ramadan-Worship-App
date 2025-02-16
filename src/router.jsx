import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Quran from "./pages/Quran";
import Worship from "./pages/WorshipPlan";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quran" element={<Quran />} />
        <Route path="/worship" element={<Worship />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;