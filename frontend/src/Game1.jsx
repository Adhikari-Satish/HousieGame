import React, { useState } from "react";
import "./Game1.css";

function Game1() {
  const [numbers, setNumbers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentNumber, setCurrentNumber] = useState("-");
  const [started, setStarted] = useState(false);

  const shuffleNumbers = () => {
    const arr = Array.from({ length: 90 }, (_, i) => i + 1);

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    setNumbers(arr);
    setCurrentIndex(-1);
    setCurrentNumber("-");
    setStarted(true);
  };

  const nextNumber = () => {
    if (!started) return;

    if (currentIndex + 1 < numbers.length) {
      const index = currentIndex + 1;
      setCurrentIndex(index);
      setCurrentNumber(numbers[index]);
    } else {
      alert("All 90 numbers have been generated.");
    }
  };

  return (
    <div className="game-container">
      <h1>Number Generator(1 - 90)</h1>
      <div className="number-box">
        {currentNumber}
      </div>
      <div className="buttons">
        <button onClick={shuffleNumbers}>
          {started ? "Restart" : "Start"}
        </button>

        <button
          onClick={nextNumber}
          disabled={!started}
        >
          Next
        </button>

      </div>

      <div className="history">

        <h2>Generated Numbers</h2>
        <div className="history-scroll">
        <div className="history-grid">

          {numbers.slice(0, currentIndex + 1).map((num) => (
            <div key={num} className="history-item">
              {num}
            </div>
          ))}

        </div>
        </div>

      </div>

    </div>
  );
}

export default Game1;