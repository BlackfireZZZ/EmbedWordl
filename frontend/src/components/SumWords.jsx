import React, { useState } from "react";
import "./SumWords.css";

const SumWords = ({ currentWord }) => {
    const [newWord, setNewWord] = useState("");

    const handleInputChange = (e) => {
        setNewWord(e.target.value);
    };

    return (
        <div className="sum-words"
        >
            <div className="current-word">{currentWord}</div>
            <div className="plus-sign">+</div>
            <input
                type="text"
                className="input-word"
                value={newWord}
                onChange={handleInputChange}
                placeholder="Enter a word"
            />
        </div>
    );
};

export default SumWords;
