import React from 'react';
import { IconButton, TextField } from '@material-ui/core';
import ExposureNeg1Icon from '@material-ui/icons/ExposureNeg1';
import ExposurePlus1Icon from '@material-ui/icons/ExposurePlus1';
import PropTypes from 'prop-types';

function IntegerFieldWithIncAndDec(props) {
  const {
    handleDecrementButtonClick,
    inputValue,
    handleIncrementButtonClick,
    fieldLabel,
  } = props;

  return (
    <div>
      <IconButton
        aria-label="decrement"
        onClick={handleDecrementButtonClick}
      >
        <ExposureNeg1Icon />
      </IconButton>
      <TextField
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
}

IntegerFieldWithIncAndDec.propTypes = {
  handleDecrementButtonClick: PropTypes.func.isRequired,
  inputValue: PropTypes.number.isRequired,
  handleIncrementButtonClick: PropTypes.func.isRequired,
  fieldLabel: PropTypes.string.isRequired,
};

export default IntegerFieldWithIncAndDec;
