import React, { useState, useEffect } from 'react';
import GraphComponent from './components/GraphComponent';
import SumWords from "./components/SumWords";
import GradientBar from "./components/GradientBar";
import base_url from "./config";

const App = () => {
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
            <GradientBar taskWord={taskWord} />
            <GraphComponent data={data} setCurrentWord={setCurrentWord} />
            <SumWords currentWord={currentWord} setCurrentWord={setCurrentWord} data={data} setData={setData} />
        </div>
    );
};

export default App;
