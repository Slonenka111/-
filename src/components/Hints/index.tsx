import React, { useContext } from 'react';
import './style.scss';
import fiftyIcon from '../../assets/icon/fifty-icon.svg';
import phoneIcon from '../../assets/icon/phone-icon.svg';
import viewersIcon from '../../assets/icon/viewers-icon.svg';
import { GameContext, HintsType } from '../../store/game-context';
import classNames from 'classnames';

interface IHintProps {
	handleClick: (name: HintsType) => void;
	isDisabled: boolean;
}

const Hints: React.FC<IHintProps> = (props) => {
	const { availableHints } = useContext(GameContext);

	const { handleClick, isDisabled } = props;

	return (
		<div className="hints">
			{Object.entries(availableHints).map(([key, value]) => {
				const icon =
					(key as HintsType) === HintsType.fiftyAvailable
						? fiftyIcon
						: (key as HintsType) === HintsType.callAvailable
						? phoneIcon
						: viewersIcon;
				return (
					<button
						key={key}
						className={classNames('hints__item', 'hints--call hints__item', {
							'hints__item--used': value,
						})}
						style={{ background: `center / contain no-repeat url(${icon})` }}
						onClick={() => handleClick(HintsType[key as HintsType])}
						disabled={isDisabled || value}
					/>
				);
			})}
		</div>
	);
};

export { Hints };
