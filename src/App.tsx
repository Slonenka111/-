import React from 'react';
import './App.css';
import StartWindow from './route/start';
import GameWindow from './route/game';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageLayout from './components/PageLayout/PageLayout';
import GameContextWrapper from './components/context';
import EndWindow from "./route/end";

function App() {
	return (
		<GameContextWrapper>
			<PageLayout>
				<Router>
					<Routes>
						<Route path="*" element={<StartWindow />} />
						<Route path="/game" element={<GameWindow />} />
						<Route path="/end" element={<EndWindow />} />
					</Routes>
				</Router>
			</PageLayout>
		</GameContextWrapper>
	);
}

export default App;
