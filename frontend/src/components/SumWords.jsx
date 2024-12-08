import React, { useState } from "react";
import "./SumWords.css";
import base_url from "../config";

const SumWords = ({ currentWord, setCurrentWord }) => {
    const [newWord, setNewWord] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false); // Для блокировки ввода и кнопки
    const [isPlus, setIsPlus] = useState(true); // Переключатель между "+" и "-"

    const handleInputChange = (e) => {
        setNewWord(e.target.value);
    };

    const toggleOperation = () => {
        setIsPlus(!isPlus); // Переключаем состояние
    };

    const handleSubmit = async () => {
        if (!newWord.trim()) return; // Если поле пустое, не отправляем запрос
        setIsSubmitting(true); // Блокируем кнопку и поле ввода

        try {
            const response = await fetch(`${base_url}/apply`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    word1: currentWord,
                    word2: newWord,
                    method: isPlus ? "plus" : "minus", // Выбираем метод в зависимости от кнопки
                }),
            });

            if (!response.ok) {
                throw new Error("Ошибка при выполнении запроса");
            }

            const data = await response.json();

            if (data.result) {
                setCurrentWord(data.result); // Обновляем текущее слово
                setNewWord(""); // Очищаем поле ввода
            } else {
                alert("Не удалось получить результат");
            }
        } catch (error) {
            alert(`Произошла ошибка: ${error.message}`);
        } finally {
            setIsSubmitting(false); // Разблокируем кнопку и поле ввода
        }
    };

    return (
        <div className="sum-words">
            <div className="current-word">{currentWord}</div>
            <div className="plus-sign">
                <button
                    className="toggle-button"
                    onClick={toggleOperation}
                    disabled={isSubmitting} // Блокируем во время запроса
                >
                    {isPlus ? "+" : "-"} {/* Отображаем текущую операцию */}
                </button>
            </div>
            <input
                type="text"
                className="input-word"
                value={newWord}
                onChange={handleInputChange}
                placeholder="Enter a word"
                disabled={isSubmitting} // Блокируем во время запроса
            />
            <button
                className="submit-button"
                onClick={handleSubmit}
                disabled={isSubmitting} // Блокируем во время запроса
            >
                {isSubmitting ? "Submitting..." : "Submit"} {/* Показываем статус */}
            </button>
        </div>
    );
};

export default SumWords;
