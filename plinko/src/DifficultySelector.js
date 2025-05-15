import React from 'react';
import './DifficultySelector.css';

const DifficultySelector = ({ selected, onSelect }) => {
  const difficulties = [
    { key: 'easy', alt: 'Easy' },
    { key: 'medium', alt: 'Medium' },
    { key: 'hard', alt: 'Hard' },
  ];

  return (
    <div className="difficulty-selector">
      {difficulties.map((diff) => (
        <button
          key={diff.key}
          className={`difficulty-button ${diff.key} ${selected === diff.key ? 'selected' : ''}`}
          onClick={() => onSelect(diff.key)}
          aria-label={diff.alt}
        >
          <span>{diff.alt}</span>
        </button>
      ))}
    </div>
  );
};

export default DifficultySelector;
