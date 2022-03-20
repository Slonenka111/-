import React from 'react';
import './App.css';
import StartWindow from "./route/start";
import GameWindow from "./route/game";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<StartWindow/>}/>
        <Route path="/game" element={<GameWindow/>}/>
      </Routes>
    </Router>
  );
}

export default App;
