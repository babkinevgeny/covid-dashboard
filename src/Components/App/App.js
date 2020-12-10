import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import './App.scss';
import Cases from '../Cases/Cases';

function App() {
  return (
    <Container maxWidth="lg" className="App">
      <Paper>
        <Typography variant="h4" component="h1" gutterBottom>
          Here will be our awesome COVID-19 dashboard!
        </Typography>
      </Paper>
      <Cases />
    </Container>
  );
}

export default App;
