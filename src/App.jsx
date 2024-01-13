import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Pomodoro from "./pages/Pomodoro";
import Error from "./pages/Error";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pomodoro />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
