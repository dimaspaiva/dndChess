import React, { useState } from 'react';
import './styles.css';
import Piece from '../Piece';

export default function Table() {
  const startPiece = {
    id: 0,
    x: 0,
    y: 0,
    hasMoved: false,
    type: '',
    setPosition: '',
  };

  const [piece, setPiece] = useState(startPiece);

  const allowDrop = () => {
    const e = window.event;

    const hasChild = e.target.childNodes.length > 0;
    const isSpot = e.target.id.substring(0, 4) === 'spot';

    if (hasChild || !isSpot) {
      return;
    }

    e.preventDefault();
  };

  const drag = ({ x = 0, y = 0, setPosition, hasMoved }) => {
    const e = window.event;

    if (!piece.id || x !== piece.x || y !== piece.y) {
      console.log(hasMoved);
      setPiece({ id: e.path[1].id, x, y, setPosition, hasMoved });
      e.fathers = e.dataTransfer.setData('text', e.target.id);
    }
  };

  const drop = async () => {
    const e = window.event;
    e.preventDefault();

    const canMove =
      `spot${piece.x + 1}${piece.y}` === e.target.id ||
      (!piece.hasMoved && `spot${piece.x + 2}${piece.y}` === e.target.id);

    const isSame = piece.id === e.path[0].id;

    const distanceX = Number(e.path[0].id.substring(4, 5));

    if (canMove && !isSame) {
      const data = await e.dataTransfer.getData('text');
      piece.setPosition({
        ...piece,
        x: piece.x + Math.abs(distanceX - piece.x),
        hasMoved: true,
      });
      e.target.appendChild(document.getElementById(data));
    }

    setPiece(startPiece);
  };

  const createTable = () => {
    const lines = [];

    for (let l = 0; l < 8; l++) {
      lines.push(
        <div key={`line${l}`} className="line">
          {createSpots(l)}
        </div>
      );
    }
    return lines;
  };

  const createSpots = (line) => {
    const spots = [];

    for (let c = 0; c < 8; c++) {
      spots.push(
        <div
          id={`spot${line}${c}`}
          key={`spot${line}${c}`}
          className={`spot ${(line + c) % 2 === 0 ? 'black' : 'white'}`}
          onDrop={() => drop()}
          onDragOver={() => allowDrop(line, c)}
        >
          {line <= 1 ? (
            <Piece type="white" line={line} column={c} drag={drag} />
          ) : (
            ''
          )}
        </div>
      );
    }

    return spots;
  };

  return (
    <section className="container">
      <div className="table">{createTable()}</div>
      <p
        id="draggable1"
        draggable={true}
        onDragStart={() => drag()}
        className="item"
      >
        Drag.me
      </p>
    </section>
  );
}
