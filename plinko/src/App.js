import './App.css';
import PlinkoBoard from './PlinkoBoard';
import React, { useState } from 'react';
import DifficultySelector from './DifficultySelector';

function App() {
  const [difficulty, setDifficulty] = useState('medium');
  const [bet, setBet] = useState(10);
  const [winnings, setWinnings] = useState(0);

  return (
    <div className="App">
      <h1>Plinko</h1>

      <div className="game-container">
        {/* LEFT: CONTROLS */}
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
        
        {/* MIDDLE: GAME BOARD */}
        <div className="board">
          <PlinkoBoard rows={16} />
        </div>

        {/* RIGHT: WINNINGS DISPLAY */}
        <div className="winnings-display">
          <h2>Total Winnings</h2>
          <p>${winnings}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
