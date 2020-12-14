import React from 'react';
import { Autocomplete } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const InputCountry = ({
  countriesList,
  onCurrentCountryHandler,
  toggleKeyboard,
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
    onOpen={toggleKeyboard}
    onBlur={toggleKeyboard}
    onInputChange={(_event, value) => setCasesTableInputValue(value)}
    className="select"
  />
);

InputCountry.propTypes = {
  countriesList: PropTypes.arrayOf(PropTypes.string).isRequired,
  onCurrentCountryHandler: PropTypes.func.isRequired,
  toggleKeyboard: PropTypes.func.isRequired,
  setCasesTableInputValue: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
};

export default InputCountry;
