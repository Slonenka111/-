import React, {useCallback, useContext} from "react";
import {useNavigate} from 'react-router-dom';
import logo from '../../assets/logo.png';
import './start.css'
import {GameContext} from "../../store/game-context";

const StartWindow: React.FC = () => {
    return (
        <div>
            <h1>Кто хочет стать миллионером?</h1>
            <div className="rowContainer">
                <img alt="game logo" width={251} src={logo}/>
            </div>
            <div className="rowContainer">
                <StartGameButton>Начать игру</StartGameButton>
            </div>
        </div>
    )
}

const StartGameButton: React.FC = props => {
	const { toggleGameState } = useContext(GameContext)
	const navigate = useNavigate();
    const handleClick = useCallback(() => {
		navigate('/game')
		toggleGameState()
	}, [navigate]);
    return <button onClick={handleClick} {...props}/>
}

export default StartWindow
