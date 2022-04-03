import React, {useCallback} from "react";
import {useNavigate} from 'react-router-dom';
import logo from '../../assets/logo.png';
import './start.css'

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
    const navigate = useNavigate();
    const handleClick = useCallback(() => navigate('/game'), [navigate]);
    return <button onClick={handleClick} {...props}/>
}

export default StartWindow
