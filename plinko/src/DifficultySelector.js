import React from 'react';
import './DifficultySelector.css';

const DifficultySelector = ({ selected, onSelect }) => {
  const difficulties = [
    { key: 'easy', src: '/easy.png', alt: 'Easy' },
    { key: 'medium', src: '/medium.png', alt: 'Medium' },
    { key: 'hard', src: '/hard.png', alt: 'Hard' },
  ];

  return (
    <div className="difficulty-selector">
      {difficulties.map((diff) => (
        <button
          key={diff.key}
          className={`difficulty-button ${selected === diff.key ? 'selected' : ''}`}
          onClick={() => onSelect(diff.key)}
          aria-label={diff.alt}
        >
          <img src={diff.src} alt={diff.alt} />
        </button>
      ))}
    </div>
  );
};

export default DifficultySelector;
