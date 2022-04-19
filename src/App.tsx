import React from 'react';
import './App.scss';
import StartWindow from './route/start';
import GameWindow from './route/game';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import PageLayout from './components/PageLayout/PageLayout';
import { GameContextWrapper } from './components/context';
import EndWindow from './route/end';

function App() {
	return (
		<PageLayout>
			<Router>
				<GameContextWrapper>
					<Routes>
						<Route path="/" element={<StartWindow />} />
						<Route path="/game" element={<GameWindow />} />
						<Route path="/end" element={<EndWindow />} />
						<Route path="*" element={<Navigate to={'/'} />} />
					</Routes>
				</GameContextWrapper>
			</Router>
		</PageLayout>
	);
}

export default App;
