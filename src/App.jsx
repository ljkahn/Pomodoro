import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Pomodoro from "./pages/Pomodoro";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pomodoro />} />
      </Routes>
    </Router>
  );
}

export default App;
