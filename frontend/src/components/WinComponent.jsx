import React from 'react';
import './WinComponent.css';

const WinComponent = ({ isWin, counter, startGame }) => {
    if (!isWin) return null;

    const handleNewGame = () => {
        startGame();
    };

    return (
        <div className="win-overlay">
            <div className="win-container">
                <h1>Congratulations, you won!</h1>
                <p>It took you {counter} tries</p>
                <button className="submit-button" onClick={handleNewGame}>New game</button>
            </div>
        </div>
    );
};

export default WinComponent;