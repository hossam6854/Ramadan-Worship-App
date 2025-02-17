import React, { lazy, Suspense } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const Quran = lazy(() => import("./pages/Quran"));
const Worship = lazy(() => import("./pages/WorshipPlan"));

const AppRouter = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quran" element={<Quran />} />
          <Route path="/worship" element={<Worship />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
