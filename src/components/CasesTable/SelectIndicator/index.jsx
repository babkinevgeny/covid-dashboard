import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  Select,
  MenuItem,
} from '@material-ui/core';
import { INDICATORS } from '../../../helpers/helpers';

const SelectIndicator = (props) => {
  const { onCurrentIndicatorHandler } = props;
  const menuItems = INDICATORS.map((indicator, index) => {
    const { key, title } = indicator;
    return (
      <MenuItem key={key} value={index}>{title}</MenuItem>
    );
  });

  return (
    <FormControl variant="outlined" style={{ width: '100%', textAlign: 'left' }}>
      <Select
        id="select-indicator"
        value="1"
        onChange={(event) => onCurrentIndicatorHandler(INDICATORS[event.target.value].key)}
      >
        {menuItems}
      </Select>
    </FormControl>
  );
};

SelectIndicator.propTypes = {
  onCurrentIndicatorHandler: PropTypes.func.isRequired,
};

export default SelectIndicator;
