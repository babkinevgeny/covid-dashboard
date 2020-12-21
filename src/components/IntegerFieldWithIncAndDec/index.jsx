import React from 'react';
import { IconButton, TextField } from '@material-ui/core';
import { ExposureNeg1, ExposurePlus1 } from '@material-ui/icons';
import PropTypes from 'prop-types';
import './index.scss';

const IntegerFieldWithIncAndDec = ({
  handleDecrementButtonClick,
  inputValue,
  handleIncrementButtonClick,
  fieldLabel,
}) => (
  <div className="integer_field_with_buttons">
    <IconButton
      disabled={inputValue < 2}
      aria-label="decrement"
      onClick={handleDecrementButtonClick}
    >
      <ExposureNeg1 />
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
      <ExposurePlus1 />
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
