import React from 'react';
import Peg from './Peg';
import Slot from './Slot';

const PlinkoBoard = ({ rows }) => {
  const renderRows = () => {
    const boardRows = [];

    for (let i = 2; i < rows; i++) {
      const pegsInRow = i + 1;
      const rowPegs = [];

      for (let j = 0; j < pegsInRow; j++) {
        rowPegs.push(<Peg key={j} />);
      }

      // Stagger rows by adding margin-left to alternate rows
      boardRows.push(
        <div
          className="row"
          key={i}
        >
          {rowPegs}
        </div>
      );
    }

    return boardRows;
  };

  const renderSlots = () => {
  const slotCount = 15;
  const slots = [];

  for (let i = 0; i < slotCount; i++) {
    slots.push(<Slot key={i} index={i} />);
  }

  return (
    <div className="slots staggered-slots">
      {slots}
    </div>
  );
};


  return (
    <div className="plinko-container">
      <div className="pegs">{renderRows()}</div>
      {renderSlots()}
    </div>
  );
};

export default PlinkoBoard;
