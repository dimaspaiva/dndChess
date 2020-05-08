import React, { useState, useEffect } from 'react';

import peao from './peao.png';

export default function Piece({ line, column, drag }) {
  const [piece, setPiece] = useState({ name: '', img: '' });

  useEffect(() => {
    if (line === 1 || line === 6) {
      setPiece({
        name: `peão${line}${column}`,
        path: 'public/img/peao.png',
      });
    }
  }, []);

  return (
    <div draggable={true} onDragStart={() => drag()} id={`${line}${column}`}>
      <img id={`piece${line}${column}`} alt="peão" src={peao} />
    </div>
  );
}
// /home/dimas/training/dnd/public/img
// /home/dimas/training/dnd/../../..

/**
 *    Obs
 *  After creation data dont update
 */
