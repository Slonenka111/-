import React, { useContext } from "react";
import "./style.scss";
import fiftyIcon from "../../assets/icon/fifty-icon.svg";
import phoneIcon from "../../assets/icon/phone-icon.svg";
import viewersIcon from "../../assets/icon/viewers-icon.svg";
import { GameContext, HintsType } from "../../store/game-context";

interface IHintProps {
	handleClick: (name: HintsType) => void;
}

const Hints: React.FC<IHintProps> = (props) => {

	const {availableHints} = useContext(GameContext)

	const { handleClick } = props;

	return (
		<div className="hints">
			<button
				className="hints__item hints--call"
				style={{ background: `center / cover no-repeat url(${fiftyIcon})` }}
				onClick={() => handleClick(HintsType.fiftyAvailable)}
				disabled={availableHints.fiftyAvailable}
			/>
			<button
				className="hints__item hints--call"
				style={{ background: ` center / contain no-repeat url(${phoneIcon})` }}
				onClick={() => handleClick(HintsType.callAvailable)}
				disabled={availableHints.callAvailable}
			/>
			<button
				className="hints__item hints--call"
				style={{ background: `center / contain no-repeat url(${viewersIcon})` }}
				onClick={() => handleClick(HintsType.viewersAvailable)}
				disabled={availableHints.viewersAvailable}
			/>
		</div>
	);
};

export {
	Hints
};
