import React, { useEffect, useState } from 'react';

import peao from '../../piecesImgs/peao.png';

import './styles.css';

export default function Piece({ line, column, drag, passData }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setPosition({ x: line, y: column });
  }, [line, column]);

  return (
    <div
      className="piece-container"
      draggable={true}
      onDragStart={() => drag()}
      id={`p-${line}${column}`}
    >
      <img className="piece-img" draggable={false} alt="peão" src={peao} />
    </div>
  );
}

/**
 *   Pieces characteristics
 *  moves
 *   - type
 *   - size
 *   - hover
 *
 *  position
 *   - x
 *   - y
 */
