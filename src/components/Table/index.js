import React, { useState } from 'react';
import './styles.css';
import Piece from '../Piece';

export default function Table() {
  const [posBeg, setPosBeg] = useState({});

  const pieceMove = (item) => {
    console.log(item);
    console.log('xD');
  };

  const allowDrop = () => {
    const e = window.event;

    const hasChild = e.target.childNodes.length > 0;
    const isSpot = e.target.id.substring(0, 4) === 'spot';

    if (hasChild || !isSpot) {
      return;
    }

    e.preventDefault();
  };

  const drag = (parsers) => {
    const e = window.event;

    console.log(parsers);

    setPosBeg({ id: e.path[1].id });
    e.fathers = e.dataTransfer.setData('text', e.target.id);
  };

  const drop = async () => {
    const e = window.event;
    e.preventDefault();

    if (posBeg.id !== e.path[1].id) {
      const data = await e.dataTransfer.getData('text');
      e.target.appendChild(document.getElementById(data));
    }
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
          {line <= 1 || line >= 6 ? (
            <Piece
              line={line}
              column={c}
              drag={() => drag()}
              passData={() => pieceMove()}
            />
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
