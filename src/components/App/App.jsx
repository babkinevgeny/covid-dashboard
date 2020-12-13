import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import Cases from '../Cases/Cases';
import TablesPager from '../TablesPager';
import { Countries } from '../../data/CountriesStub.json';
import '../../css/App.scss';

function App() {
  const tableData = Countries;
  const dataFields = ['TotalConfirmed', 'TotalDeaths', 'TotalRecovered'];
  return (
    <Container maxWidth="lg" className="App">
      <Paper>
        <Typography variant="h4" component="h1" gutterBottom>
          Here will be our awesome COVID-19 dashboard!
        </Typography>
      </Paper>
      <Cases />
      <TablesPager tablesData={tableData} data={dataFields} />
    </Container>
  );
}

export default App;
