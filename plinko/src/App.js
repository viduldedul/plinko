import './App.css';
import PlinkoBoard from './PlinkoBoard';
import React, { useState } from 'react';
import DifficultySelector from './DifficultySelector';

function App() {
  const [difficulty, setDifficulty] = useState('medium');
  const [bet, setBet] = useState(10);

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

          <button onClick={() => alert('Drop ball (not implemented)')}>
            Drop Ball
          </button>
        </div>

        <div className="board">
          <PlinkoBoard rows={16} />
        </div>
      </div>
    </div>
  );
}

export default App;
