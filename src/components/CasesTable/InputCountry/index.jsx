/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Autocomplete } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const InputCountry = (props) => {
  const { countriesList, onCurrentCountryHandler } = props;
  return (
    <Autocomplete
      id="combo-box-demo"
      options={countriesList}
      autoComplete
      getOptionLabel={(option) => option}
      renderInput={(params) => <TextField {...params} label="Country" variant="outlined" />}
      onChange={(event, value) => onCurrentCountryHandler(value)}
    />
  );
};

InputCountry.propTypes = {
  countriesList: PropTypes.arrayOf(PropTypes.string).isRequired,
  onCurrentCountryHandler: PropTypes.func.isRequired,
};

export default InputCountry;
