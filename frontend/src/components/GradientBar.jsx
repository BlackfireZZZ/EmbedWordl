import React from "react";
import "./GradientBar.css"; // Подключаем стили

const GradientBar = ({ taskWord }) => {
    return (
        <div className="gradient-bar">
            <div className="gradient-bar-text">TaskWord is <b>{taskWord}</b></div>
            <div className="gradient-bar-gradient" />
            <div className="gradient-bar-hint">Check, how close your word to TaskWord</div>
        </div>
    );
};

export default GradientBar;
