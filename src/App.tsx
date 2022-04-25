import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { GameContextWrapper } from './components/context';
import PageLayout from './components/PageLayout/PageLayout';
import StartWindow from './route/start';
import { GameWindow } from './route/game';
import EndWindow from './route/end';
import './components/button/style.scss';

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
