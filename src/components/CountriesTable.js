import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CountryRow from './CountryRow';
import sortArray from '../helpers/helpers';

class CountriesTable extends React.Component {
  constructor(props) {
    super(props);
    ({ data: this.items, field: this.field } = this.props);
  }

  getRowsData() {
    sortArray(this.items, this.field, false);
    return this.items.map((row) => (
      <tr key={row.Country}>
        <CountryRow
          country={row.Country}
          number={row[this.field]}
        />
      </tr>
    ));
  }

  getKeys() {
    return Object.keys(this.items[0]);
  }

  render() {
    sortArray(this.items, this.field, false);
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {this.items.map((row) => (
              <TableRow key={row.Country}>
                <TableCell>{row.Country}</TableCell>
                <TableCell align="right">{row[this.field]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    // <table>
    //   <tbody>
    //     {this.getRowsData()}
    //   </tbody>
    // </table>
    );
  }
}

// CountriesTable.propTypes = {
//   data: PropTypes.arrayOf(PropTypes.object).isRequired,
// };

export default CountriesTable;
