import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Paper, CircularProgress } from '@material-ui/core';
import TablesPager from '../TablesPager';
import { apiConstants } from '../../helpers/helpers';
import '../../css/App.scss';

function App() {
  const [loading, setLoading] = useState(true);
  const [countriesData, setCountriesData] = useState([]);
  const [globalData, setGlobalData] = useState([]);
  const [tablePage, setTablePage] = useState(0);

  useEffect(() => {
    const getData = () => {
      console.log('getData');
      setLoading(true);
      fetch('https://api.covid19api.com/summary')
        .then((response) => response.json(),
          (error) => console.log(error))
        .then((responseJson) => {
          let timerId;
          if (responseJson.Message.length > 0) {
            timerId = setTimeout(() => getData(), 500);
          } else {
            clearTimeout(timerId);
            const { Global, Countries } = responseJson;
            setGlobalData({ ...Global });
            setCountriesData([...Countries]);
            setLoading(false);
          }
        },
        (error) => {
          setLoading(true);
          console.log(error);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    getData();
  }, []);

  const onPageChangeHandler = (newPage) => {
    setTablePage(newPage);
  };

  return (
    <Container maxWidth="lg" className="App">
      <Paper>
        <Typography variant="h4" component="h1" gutterBottom>
          Here will be our awesome COVID-19 dashboard!
        </Typography>
      </Paper>
      {loading ? (
        <CircularProgress />
      )
        : (
          <TablesPager
            tablesData={countriesData}
            global={globalData}
            dataFields={apiConstants.dataFields}
            tablePage={tablePage}
            onPageChangeHandler={onPageChangeHandler}
          />
        )}
    </Container>
  );
}

export default App;
