import React, { useState } from 'react';

import peao from './peao.png';

import './styles.css';

export default function Piece({ line, column, drag }) {
  const [piece, setPiece] = useState({ name: '', img: '' });

  return (
    <div
      className="piece-container"
      draggable={true}
      onDragStart={() => drag()}
      id={`p-${line}${column}`}
    >
      <img
        className="piece-img"
        draggable={false}
        id={`p-img-${line}${column}`}
        alt="peão"
        src={peao}
      />
    </div>
  );
}

/**
 *    Obs
 *  After creation data dont update
 */
