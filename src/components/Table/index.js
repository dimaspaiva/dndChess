import React from 'react';
import './styles.css';

export default function Table() {
  const allowDrop = () => {
    const e = window.event;

    e.preventDefault();
  };

  const drag = () => {
    const e = window.event;

    e.dataTransfer.setData('text', e.target.id);
  };

  const drop = async () => {
    const e = window.event;

    e.preventDefault();
    const data = await e.dataTransfer.getData('text');
    e.target.appendChild(document.getElementById(data));
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

    for (let s = 0; s < 8; s++) {
      spots.push(
        <div
          key={`spot${s}${line}`}
          className={`spot ${(line + s) % 2 === 0 ? 'black' : 'white'}`}
          onDrop={() => drop()}
          onDragOver={() => allowDrop()}
        ></div>
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
