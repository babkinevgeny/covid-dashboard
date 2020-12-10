import React from 'react';
import {
  FormControl,
  Select,
  MenuItem,
} from '@material-ui/core';

const INDICATORS = [
  {
    title: 'Total Cases',
    key: 'TotalConfirmed',
  },
  {
    title: 'New Cases',
    key: 'NewConfirmed',
  },
  {
    title: 'Total Deaths',
    key: 'TotalDeaths',
  },
  {
    title: 'New Deaths',
    key: 'NewDeaths',
  },
  {
    title: 'Total Recovered',
    key: 'TotalRecovered',
  },
  {
    title: 'New Recovered',
    key: 'NewRecovered',
  },
];

const SelectIndicator = () => {
  const menuItems = INDICATORS.map((indicator, index) => {
    const { key, title } = indicator;
    return <MenuItem key={key} value={index + 1}>{title}</MenuItem>;
  });

  return (
    <FormControl variant="outlined" style={{ width: 300, textAlign: 'left' }}>
      <Select id="select-indicator" value="1">{menuItems}</Select>
    </FormControl>
  );
};

export default SelectIndicator;
