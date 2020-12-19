import React from 'react';
import { indicators } from '../../../helpers';

const Legend = () => {
  const legendItems = indicators.map((indObj) => (
    <div className="legend-item" key={indObj.key}>
      <span className="box" style={{ backgroundColor: indObj.color }} />
      <span className="text">{indObj.title}</span>
    </div>
  ));
  return (
    <section className="legend">
      {legendItems}
    </section>
  );
};

export default Legend;
