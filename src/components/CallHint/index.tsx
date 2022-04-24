import React, { useContext} from "react";
import { GameContext } from "../../store/game-context";
import { getCallHint } from "../questions";
import "./style.scss";


const CallHint: React.FC = () => {

	const {questionId, fiftyHint} = useContext(GameContext)

	const answer = getCallHint(questionId, fiftyHint)
	let answerString = 'A';

	switch (answer) {
		case 1:
			answerString = 'A'
			break
		case 2:
			answerString = 'B'
			break
		case 3:
			answerString= 'C'
			break
		case 4:
			answerString='D'
	}
	console.log(answer, answerString)

	return (
		<div className="call-hint">
			{`Хмм... Где-то я уже такое слышал. Я точно не уверен, но это ${answerString}`}
		</div>
	);
};

export { CallHint };
