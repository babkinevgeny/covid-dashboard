import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { sortArray } from '../../helpers';

function CountriesTable({ data, field }) {
  const sortedData = sortArray(data, field);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {sortedData.map((row) => (
            <TableRow key={row.Country}>
              <TableCell>{row.Country}</TableCell>
              <TableCell align="right">{row[field]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

CountriesTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  field: PropTypes.string.isRequired,
};

export default CountriesTable;
