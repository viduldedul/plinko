import React, { useEffect, useRef } from 'react';
import { Engine, Render, Runner, World, Bodies, Events } from 'matter-js';
import Slot from './Slot';

const PlinkoBoard = ({ rows, cols, CELL_SIZE, dropSignal }) => {
  const boardRef = useRef(null);
  const engineRef = useRef(null);
  const renderRef = useRef(null);
  const ballsRef = useRef([]);

  const rewardTable = [0.5, 0.75, 1, 1.25, 2, 3, 5, 10, 20, 10, 5, 3, 2, 1.25, 1, 0.75, 0.5]; // prilagodi po želji

  useEffect(() => {
    const width = cols * CELL_SIZE;
    const height = rows * CELL_SIZE + 200;

    const engine = Engine.create();
    engine.gravity.y = 1;
    engineRef.current = engine;

    const render = Render.create({
      element: boardRef.current,
      engine,
      options: {
        width,
        height,
        wireframes: false,
        background: 'transparent',
      },
    });

    Render.run(render);
    render.canvas.style.position = 'absolute';
    render.canvas.style.top = '0';
    render.canvas.style.left = '0';
    render.canvas.style.zIndex = '1';
    renderRef.current = render;

    const runner = Runner.create();
    Runner.run(runner, engine);

    // Dodaj pege
    const pegs = [];
    const pegRadius = 6;

    for (let row = 2; row < rows; row++) {
      const pegCount = row + 1;
      const totalWidth = pegCount * CELL_SIZE;
      const startX = (cols * CELL_SIZE - totalWidth) / 2 + CELL_SIZE / 2;

      for (let j = 0; j < pegCount; j++) {
        const x = startX + j * CELL_SIZE;
        const y = row * CELL_SIZE + 60;

        const peg = Bodies.circle(x, y, pegRadius, {
          isStatic: true,
          restitution: 0.3,
          render: { fillStyle: '#fff' },
        });

        pegs.push(peg);
      }
    }

    const floor = Bodies.rectangle(width / 2, height + 20, width, 40, {
      isStatic: true,
    });

    World.add(engine.world, [...pegs, floor]);

    return () => {
      Render.stop(render);
      World.clear(engine.world);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, [cols, rows, CELL_SIZE]);

  // Spusti žogico
  useEffect(() => {
    if (!engineRef.current) return;

    const width = cols * CELL_SIZE;
    const randomOffset = (Math.random() * 60) - 30;
    const ballX = width / 2 + randomOffset;
    const ball = Bodies.circle(ballX, 20, 10, {
      restitution: 0.2,
      friction: 0.005,
      label: 'ball',
      render: { fillStyle: 'red' },
    });

    ballsRef.current.push(ball);
    World.add(engineRef.current.world, ball);
  }, [dropSignal]);

  // Preveri če je žogica pristala
useEffect(() => {
  if (!engineRef.current) return;

  const yLimit = rows * CELL_SIZE + 60;

  const checkLanding = () => {
    const newBalls = [];

    for (const ball of ballsRef.current) {
      if (ball.position.y >= yLimit && !ball.isStatic) {
        const x = ball.position.x;
        const slotSpacing = CELL_SIZE * 2;
        const totalSlots = rows + 1;
        const startOffset = (cols * CELL_SIZE - (totalSlots - 1) * slotSpacing) / 2;

        let slotIndex = Math.round((x - startOffset) / slotSpacing);
        slotIndex = Math.max(0, Math.min(totalSlots - 1, slotIndex));
        const reward = rewardTable[slotIndex] || 0;

        console.log(`Žogica je padla v slot ${slotIndex} → nagrada x${reward}`);

        ball.isStatic = true;
        World.remove(engineRef.current.world, ball);
      } else {
        newBalls.push(ball); // keep tracking this ball
      }
    }

    ballsRef.current = newBalls;
  };

  Events.on(engineRef.current, 'afterUpdate', checkLanding);
  return () => Events.off(engineRef.current, 'afterUpdate', checkLanding);
}, [dropSignal, rows, cols, CELL_SIZE]);


  // Overlay pegi
  const renderPegOverlay = () => {
    const pegs = [];

    for (let row = 0; row < rows; row++) {
      const pegCount = row + 1;
      const totalWidth = pegCount * CELL_SIZE;
      const startX = (cols * CELL_SIZE - totalWidth) / 2 + CELL_SIZE / 2;

      for (let j = 2; j < pegCount; j++) {
        const x = startX + j * CELL_SIZE;
        const y = row * CELL_SIZE + 60;

        pegs.push(
          <div
            key={`peg-${row}-${j}`}
            className="peg"
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: 'white',
              transform: 'translate(-50%, -50%)',
              zIndex: 2,
            }}
          />
        );
      }
    }

    return pegs;
  };

  const renderSlots = () => {
    const slotCount = rows - 1;
    const slotSpacing = CELL_SIZE * 2 - 40;
    const totalWidth = (slotCount - 1) * slotSpacing;
    const startOffset = (cols * CELL_SIZE - totalWidth) / 2;

    return [...Array(slotCount)].map((_, i) => {
      const x = startOffset + i * slotSpacing-20;
      return (
        <div
          key={i}
          className="slot"
          style={{
            position: 'absolute',
            left: `${x}px`,
            bottom: '5px',
            zIndex: 2,
          }}
        >
          <Slot index={i} />
        </div>
      );
    });
  };

  return (
    <div
      ref={boardRef}
      className="plinko-container"
      style={{
        position: 'relative',
        width: `${cols * CELL_SIZE}px`,
        height: `${rows * CELL_SIZE + 80}px`,
        margin: '0 auto',
        backgroundColor: '#222233',
        overflow: 'hidden',
      }}
    >
      {renderPegOverlay()}
      <div
        className="slots"

      >
        {renderSlots()}
      </div>
    </div>
  );
};

export default PlinkoBoard;
