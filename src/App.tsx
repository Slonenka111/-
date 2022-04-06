import React, {useState} from 'react';
import './App.css';
import StartWindow from './route/start';
import GameWindow from './route/game';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import PageLayout from './components/PageLayout';
import {GameContext} from "./store/game-context";

function App() {
	const [isGame, setIsGame] = useState(false)
	const [questionNumber, setQuestionNumber] = useState(0)

	return (
		<GameContext.Provider value={{isGame, setIsGame, questionNumber, setQuestionNumber}}>
			<PageLayout>
				<Router>
					<Routes>
						<Route path="*" element={<StartWindow/>}/>
						<Route path="/game" element={<GameWindow/>}/>
					</Routes>
				</Router>
			</PageLayout>
		</GameContext.Provider>
	);
}

export default App;
