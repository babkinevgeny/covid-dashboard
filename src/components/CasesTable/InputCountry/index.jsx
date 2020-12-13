import React from 'react';
import { Autocomplete } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const InputCountry = (props) => {
  const { countriesList } = props;
  return (
    <Autocomplete
      id="combo-box-demo"
      options={countriesList}
      autoComplete
      getOptionLabel={(option) => option}
    // eslint-disable-next-line react/jsx-props-no-spreading
      renderInput={(params) => <TextField {...params} label="Country" variant="outlined" />}
      onChange={(event, value) => console.log(value)}
    />
  );
};

InputCountry.propTypes = {
  countriesList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default InputCountry;
