import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Grid,
} from '@material-ui/core';

import SelectIndicator from '../SelectIndicator/SelectIndicator';
import InputCountry from '../InputCountry/InputCountry';

function createData(name, calories, fat, carbs, protein) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const CasesTable = (props) => {
  const { tableTitle } = props;
  return (
    <Box component="section">
      <Typography component="h3">{tableTitle}</Typography>
      <Grid container spacing={0}>
        <Grid item xs={2}>
          <InputCountry />
        </Grid>
        <Grid item xs={2}>
          <SelectIndicator />
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table className="cases" size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Country</TableCell>
              <TableCell align="left">Something</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

CasesTable.propTypes = {
  tableTitle: PropTypes.string.isRequired,
};

export default CasesTable;
