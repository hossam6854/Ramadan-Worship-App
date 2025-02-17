import AppRouter from "./router";
import "./styles/global.css";
import React from "react";
import { QuranProvider } from "./context/QuranContext";

function App() {
  return (
    <QuranProvider>

      <AppRouter />
    </QuranProvider>
  );
}

export default App;



   


