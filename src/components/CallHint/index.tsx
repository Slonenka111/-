import React, { useContext, useEffect, useState } from 'react';
import { GameContext } from '../../store/game-context';
import { getRandomPhrases } from './phrases';
import './style.scss';

const CallHint: React.FC = () => {
	const [answer, setAnswer] = useState('');
	const { callHint } = useContext(GameContext);

	useEffect(() => {
		setAnswer(getRandomPhrases(callHint));
	}, [answer]);

	return <div className="call-hint">{answer}</div>;
};

export { CallHint };
