import React, { useState } from "react";
import "./SumWords.css";
import base_url from "../config";

const SumWords = ({ taskWord, currentWord, setCurrentWord, data, setData, counter, setCounter, isWin }) => {
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
                    taskWord: taskWord,
                    word1: currentWord,
                    word2: newWord,
                    method: isPlus ? "plus" : "minus", // Выбираем метод в зависимости от кнопки
                }),
            });

            if (!response.ok) {
                throw new Error("Ошибка при выполнении запроса");
            }

            const responseData = await response.json();

            if (responseData.result) {
                const resultWord = responseData.result;
                const possibility = responseData.possibility;

                // Проверяем, существует ли уже слово в data
                const existingWordIndex = data.findIndex((item) => item[0] === resultWord);
                const currentWordIndex = data.findIndex((item) => item[0] === currentWord);

                if (existingWordIndex !== -1) {
                    // Если слово уже существует, просто связываем вершины
                    if (currentWordIndex !== -1 && !data[currentWordIndex][1].includes(existingWordIndex)) {
                        data[currentWordIndex][1].push(existingWordIndex);
                    }
                    if (!data[existingWordIndex][1].includes(currentWordIndex)) {
                        data[existingWordIndex][1].push(currentWordIndex);
                    }
                } else {
                    // Если слово не существует, создаем новую вершину
                    const newWordData = [
                        resultWord, // Уникальное слово
                        [], // Список индексов для новых связей
                        possibility, // Используем вероятность из ответа
                    ];

                    if (currentWordIndex !== -1) {
                        data[currentWordIndex][1].push(data.length); // Связываем текущую вершину
                    }

                    newWordData[1].push(currentWordIndex); // Связываем новую вершину с текущей

                    // Обновляем data
                    setData([...data, newWordData]);
                }

                // Обновляем текущее слово
                setCurrentWord(resultWord);
                setNewWord(""); // Очищаем поле ввода
                setCounter(counter + 1); // Увеличиваем счетчик попыток
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
                    disabled={isSubmitting || isWin} // Блокируем во время запроса
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
                disabled={isSubmitting || isWin} // Блокируем во время запроса
            />
            <button
                className="submit-button"
                onClick={handleSubmit}
                disabled={isSubmitting || isWin} // Блокируем во время запроса
            >
                {isSubmitting ? "Submitting..." : "Submit"} {/* Показываем статус */}
            </button>
        </div>
    );
};

export default SumWords;
