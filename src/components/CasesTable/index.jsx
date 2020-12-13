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
  let { rows } = props;

  rows = sortArray(rows, 'TotalConfirmed');

  const countriesList = rows.map((obj) => obj.Country);
  return (
    <Container className="select-indicator">
      <Box component="section">
        <Grid container spacing={0}>
          <Grid item>

            <InputCountry countriesList={countriesList} />

          </Grid>
          <Grid item>

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
};

export default CasesTable;
