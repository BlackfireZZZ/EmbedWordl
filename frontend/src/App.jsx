import React, { useState, useEffect } from 'react';
import GraphComponent from './components/GraphComponent';
import SumWords from "./components/SumWords";
import GradientBar from "./components/GradientBar";
import base_url from "./config";
import WinComponent from "./components/WinComponent";

const App = () => {
    const [isWin, setIsWin] = useState(false);
    const [counter, setCounter] = useState(0);
    const [currentWord, setCurrentWord] = useState('');
    const [taskWord, setTaskWord] = useState('');
    const [data, setData] = useState([]);

    const StartGame = async () => {
        try {
            const response = await fetch(`${base_url}/startgame`);
            if (!response.ok) {
                throw new Error('Failed to start the game');
            }
            const { startword, taskword, possibility } = await response.json();

            // Обновляем состояния
            setCurrentWord(startword);
            setTaskWord(taskword);
            setData([[startword, [], possibility]]);
            setIsWin(false);
        } catch (error) {
            console.error('Error in StartGame:', error);
        }
    };

    // Вызываем StartGame при первом запуске
    useEffect(() => {
        StartGame();
    }, []);

    return (
        <div style={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column" }}>
            <WinComponent isWin={isWin} counter={setCounter} startGame={StartGame}/>
            <GradientBar taskWord={taskWord} />
            <GraphComponent data={data} setCurrentWord={setCurrentWord} />
            <SumWords taskWord={taskWord} currentWord={currentWord} setCurrentWord={setCurrentWord} data={data} setData={setData}
                      counter={counter} setCounter={setCounter} isWin={isWin}/>
        </div>
    );
};

export default App;
