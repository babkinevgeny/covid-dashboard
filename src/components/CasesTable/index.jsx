import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Table,
  TableHead,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Grid,
  Container,
} from '@material-ui/core';
import SelectIndicator from './SelectIndicator';
import InputCountry from './InputCountry';
import { sortArray, getFlagUrl } from '../../helpers';

const getPreparedRows = (rows, currentCountry, currentIndicator) => {
  let preparedRows = [...rows];

  if (currentCountry) {
    preparedRows = rows.filter((row) => row.Country === currentCountry);
  }

  preparedRows = sortArray(preparedRows, currentIndicator);

  return preparedRows;
};

const CasesTable = ({
  currentCountry,
  onCurrentCountryHandler,
  currentIndicator,
  onCurrentIndicatorHandler,
  showKeyboard,
  hideKeyboard,
  setCasesTableInputValue,
  inputValue,
  rows,
}) => {
  const preparedRows = getPreparedRows(rows, currentCountry, currentIndicator);
  const countriesList = preparedRows.map((obj) => obj.Country);
  return (
    <Container className="select-indicator">
      <Box component="section">
        <Grid container spacing={0}>
          <Grid item sm={6}>

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
          <Grid item sm={6}>

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
              {preparedRows.map((row) => (
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
      </Box>
    </Container>
  );
};

CasesTable.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentCountry: PropTypes.string,
  onCurrentCountryHandler: PropTypes.func.isRequired,
  currentIndicator: PropTypes.string.isRequired,
  onCurrentIndicatorHandler: PropTypes.func.isRequired,
  showKeyboard: PropTypes.func.isRequired,
  hideKeyboard: PropTypes.func.isRequired,
  setCasesTableInputValue: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
};

CasesTable.defaultProps = {
  currentCountry: '',
};

export default CasesTable;
