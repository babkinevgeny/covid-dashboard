import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableHead,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Grid,
} from '@material-ui/core';
import SelectIndicator from './SelectIndicator';
import InputCountry from './InputCountry';
import { getFlagUrl } from '../../helpers';

const CasesTable = ({
  onCurrentCountryHandler,
  currentIndicator,
  onCurrentIndicatorHandler,
  showKeyboard,
  hideKeyboard,
  setCasesTableInputValue,
  inputValue,
  rows,
  countriesList,
}) => (
  <div className="select-indicator">
    <Grid container spacing={0}>
      <Grid item sm={6} xs={6}>

        <InputCountry
          onCurrentCountryHandler={onCurrentCountryHandler}
          countriesList={countriesList}
          showKeyboard={showKeyboard}
          hideKeyboard={hideKeyboard}
          setCasesTableInputValue={setCasesTableInputValue}
          inputValue={inputValue}
          show
        />

      </Grid>
      <Grid item sm={6} xs={6}>

        <SelectIndicator
          onCurrentIndicatorHandler={onCurrentIndicatorHandler}
          currentIndicator={currentIndicator}
        />

      </Grid>
    </Grid>
    <TableContainer component={Paper}>
      <Table className="cases" size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Country</TableCell>
            <TableCell align="left">Indicator</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.Country}>
              <TableCell className="row" component="th" scope="row">
                <img
                  className="flag"
                  src={getFlagUrl(row.CountryCode)}
                  alt={`Flag of ${row.Country}`}
                />
                <span>{row.Country}</span>
              </TableCell>
              <TableCell align="right">{row[currentIndicator]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
);

CasesTable.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCurrentCountryHandler: PropTypes.func.isRequired,
  currentIndicator: PropTypes.string.isRequired,
  onCurrentIndicatorHandler: PropTypes.func.isRequired,
  showKeyboard: PropTypes.func.isRequired,
  hideKeyboard: PropTypes.func.isRequired,
  setCasesTableInputValue: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  countriesList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CasesTable;
