import React from 'react';
import { Autocomplete } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const InputCountry = ({
  countriesList,
  onCurrentCountryHandler,
  showKeyboard,
  hideKeyboard,
  setCasesTableInputValue,
  inputValue,
}) => (
  <Autocomplete
    id="combo-box-demo"
    options={countriesList}
    autoComplete
    getOptionLabel={(option) => option}
    // eslint-disable-next-line react/jsx-props-no-spreading
    renderInput={(params) => <TextField {...params} label="Country" variant="outlined" />}
    onChange={(_event, value) => {
      onCurrentCountryHandler(value);
    }}
    inputValue={inputValue}
    onOpen={showKeyboard}
    onBlur={hideKeyboard}
    onInputChange={(_event, value, reason) => {
      setCasesTableInputValue(value);

      if (reason === 'clear') {
        showKeyboard();
      }
    }}
    className="select"
    blurOnSelect
  />
);

InputCountry.propTypes = {
  countriesList: PropTypes.arrayOf(PropTypes.string).isRequired,
  onCurrentCountryHandler: PropTypes.func.isRequired,
  showKeyboard: PropTypes.func.isRequired,
  hideKeyboard: PropTypes.func.isRequired,
  setCasesTableInputValue: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
};

export default InputCountry;