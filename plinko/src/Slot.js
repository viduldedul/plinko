import React from 'react';

const Slot = ({ index }) => {
  // Define the slot image pattern
  const slotPattern = [8, 7, 6, 5, 4, 3, 2, 1, 2, 3, 4, 5, 6, 7, 8, 8, 8, 8, 8];

  const imageNumber = slotPattern[index] ;
  
  const imageName = `slot${imageNumber}.png`;

  return (
    <div className="slot">
      <img
        src={`/${imageName}`}
        alt={`Slot ${imageNumber}`}
        className="slot-image"
      />
    </div>
  );
};

export default Slot;
