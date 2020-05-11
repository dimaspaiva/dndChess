import React, { useEffect, useState } from 'react';

import whitePawn from '../../piecesImgs/peaoBranco.png';
import blackPawn from '../../piecesImgs/peaoPreto.png';

import './styles.css';

export default function Piece({ line, column, drag, type }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setPosition({ x: line, y: column });
  }, [line, column]);

  return (
    <div
      className="piece-container"
      draggable={true}
      onDragStart={() => drag({ ...position, type, setPosition })}
      id={`p-${line}${column}`}
    >
      <img
        className="piece-img"
        draggable={false}
        alt="peão"
        src={type === 'white' ? whitePawn : blackPawn}
      />
    </div>
  );
}
