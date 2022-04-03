import React from 'react';
import './App.css';
import StartWindow from "./route/start";
import GameWindow from "./route/game";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import PageLayout from "./components/PageLayout";

function App() {
    return (
        <PageLayout>
            <Router>
                <Routes>
                    <Route path="*" element={<StartWindow/>}/>
                    <Route path="/game" element={<GameWindow/>}/>
                </Routes>
            </Router>
        </PageLayout>
    );
}

export default App;
