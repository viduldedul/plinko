import './App.css';
import React, { useState } from 'react';
import DifficultySelector from './DifficultySelector';
import PlinkoBoard from './PlinkoBoard';

function App() {
  const ROWS = 16;
  const COLS = 2 * ROWS + 1;
  const CELL_SIZE = 40;

  const [difficulty, setDifficulty] = useState('medium');
  const [bet, setBet] = useState(10);
  const [dropCount, setDropCount] = useState(0); // signal za spuščanje žogice

  const handleDropBall = () => {
    setDropCount((prev) => prev + 1);
  };

  return (
    <div className="App">
      <h1>Plinko</h1>

      <div className="game-container">
        <div className="controls">
          <div>
            <label>Difficulty:</label>
            <DifficultySelector selected={difficulty} onSelect={setDifficulty} />
          </div>

          <label>
            Bet Amount:
            <input
              type="number"
              value={bet}
              min={1}
              onChange={(e) => setBet(Number(e.target.value))}
            />
          </label>

          <button onClick={handleDropBall}>Drop Ball</button>
        </div>

        <div className="board">
          <PlinkoBoard
            rows={ROWS}
            cols={COLS}
            CELL_SIZE={CELL_SIZE}
            dropSignal={dropCount}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
