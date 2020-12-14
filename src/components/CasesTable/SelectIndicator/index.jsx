import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  Select,
  MenuItem,
} from '@material-ui/core';
import { Indicators } from '../../../helpers';

const SelectIndicator = ({ onCurrentIndicatorHandler, currentIndicator }) => {
  const menuItems = Indicators.map(({ key, title }, index) => (
    <MenuItem key={key} value={index}>{title}</MenuItem>
  ));

  const selectValue = Indicators.findIndex((elem) => elem.key === currentIndicator);

  const changeCurrentIndicator = (event) => {
    const { value } = event.target;
    const { key } = Indicators[value];
    onCurrentIndicatorHandler(key);
  };

  return (
    <FormControl variant="outlined" className="select">
      <Select
        id="select-indicator"
        value={selectValue}
        onChange={changeCurrentIndicator}
      >
        {menuItems}
      </Select>
    </FormControl>
  );
};

SelectIndicator.propTypes = {
  onCurrentIndicatorHandler: PropTypes.func.isRequired,
  currentIndicator: PropTypes.string.isRequired,
};

export default SelectIndicator;
