import React from 'react';
import { indicators, alphaChanel40PercentInHex } from '../../../helpers';

const Legend = () => {
  const legendItems = indicators.map(({ key, color, title }) => (
    <div className="legend-item" key={key}>
      <span className="box" style={{ backgroundColor: `${color}${alphaChanel40PercentInHex}` }}>
        <span className="text">{title}</span>
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
