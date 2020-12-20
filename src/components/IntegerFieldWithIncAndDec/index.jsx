import React from 'react';
import { IconButton, TextField } from '@material-ui/core';
import ExposureNeg1Icon from '@material-ui/icons/ExposureNeg1';
import ExposurePlus1Icon from '@material-ui/icons/ExposurePlus1';
import PropTypes from 'prop-types';

const IntegerFieldWithIncAndDec = ({
  handleDecrementButtonClick,
  inputValue,
  handleIncrementButtonClick,
  fieldLabel,
}) => (
  <div>
    <IconButton
      disabled={inputValue < 2}
      aria-label="decrement"
      onClick={handleDecrementButtonClick}
    >
      <ExposureNeg1Icon />
    </IconButton>
    <TextField
      disabled
      id="outlined-number"
      label={fieldLabel}
      value={`${inputValue}`}
      InputProps={{
        readOnly: true,
      }}
      InputLabelProps={{
        shrink: true,
      }}
      variant="outlined"
    />
    <IconButton
      aria-label="increment"
      onClick={handleIncrementButtonClick}
    >
      <ExposurePlus1Icon />
    </IconButton>
  </div>
);

IntegerFieldWithIncAndDec.propTypes = {
  handleDecrementButtonClick: PropTypes.func.isRequired,
  inputValue: PropTypes.number.isRequired,
  handleIncrementButtonClick: PropTypes.func.isRequired,
  fieldLabel: PropTypes.string.isRequired,
};

export default IntegerFieldWithIncAndDec;
