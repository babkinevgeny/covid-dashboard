import React from 'react';
import { indicators, alphaChanelPercentageInHex } from '../../../helpers';

const Legend = () => {
  const legendItems = indicators.map((indObj) => (
    <div className="legend-item" key={indObj.key}>
      <span className="box" style={{ backgroundColor: `${indObj.color}${alphaChanelPercentageInHex}` }}>
        <span className="text">{indObj.title}</span>
      </span>
    </div>
  ));
  return (
    <section className="legend">
      {legendItems}
    </section>
  );
};

export default Legend;
