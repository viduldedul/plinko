import './App.css';
import PlinkoBoard from './PlinkoBoard';
import React, { useState, useEffect } from 'react';
import DifficultySelector from './DifficultySelector';

function App() {
  const [difficulty, setDifficulty] = useState('medium');
  const [bet, setBet] = useState(10);
  const [winnings, setWinnings] = useState(0);

  // Dynamically load PureCSS
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/purecss@2.0.5/build/pure-min.css';
    link.integrity =
      'sha384-LTIDeidl25h2dPxrB2Ekgc9c7sEC3CWGM6HeFmuDNUjX76Ert4Z4IY714dhZHPLd';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  }, []);

  return (
    <div className="App">
      <h1>Plinko</h1>

      <div className="game-container">
        {/* LEFT: CONTROLS */}
        <div className="controls pure-form">
          <div>
            <label style={{ marginBottom: '20px', marginTop: '-120px', display: 'inline-block', fontSize: '20px', fontWeight: 'bold' }}>Difficulty:</label>
            <DifficultySelector selected={difficulty} onSelect={setDifficulty} />
          </div>

          <label style={{ marginBottom: '20px', display: 'inline-block', fontSize: '20px', fontWeight: 'bold' }}>
            Bet Amount:
            <input
              type="number"
              value={bet}
              min={1}
              onChange={(e) => setBet(Number(e.target.value))}
              className="pure-input-rounded"
            />
          </label>

          <button
            onClick={() => alert('Drop ball (not implemented)')}
            className="drop-ball-button"
            style={{ color: 'white' }}
          >
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
