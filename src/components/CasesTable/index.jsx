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
import { sortArray } from '../../helpers/helpers';

const CasesTable = (props) => {
  const { currentCountry, onCurrentCountryHandler } = props;
  let { rows } = props;

  if (currentCountry) {
    rows = rows.filter((row) => row.Country === currentCountry);
  }

  rows = sortArray(rows, 'TotalConfirmed');

  const countriesList = rows.map((obj) => obj.Country);
  return (
    <Container className="select-indicator">
      <Box component="section">
        <Grid container spacing={0}>
          <Grid item sm={6}>

            <InputCountry
              onCurrentCountryHandler={onCurrentCountryHandler}
              countriesList={countriesList}
            />

          </Grid>
          <Grid item sm={6}>

            <SelectIndicator />

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
                  <TableCell component="th" scope="row">
                    {row.Country}
                  </TableCell>
                  <TableCell align="right">{row.TotalConfirmed}</TableCell>
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
};

CasesTable.defaultProps = {
  currentCountry: '',
};

export default CasesTable;
