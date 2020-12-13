import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Paper, CircularProgress } from '@material-ui/core';
import CasesTable from '../CasesTable';
import TablesPager from '../TablesPager';
import { apiConstants, DataHelper } from '../../helpers/helpers';
import '../../css/App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      covidPerCountryData: [],
      globalData: {},
      tablePage: 0,
      error: false,
      errorMessage: '',
      currentCountry: '',
      currentIndicator: 'TotalConfirmed',
    };
  }

  componentDidMount() {
    const getData = () => {
      DataHelper.fetchRequestData(
        'https://api.covid19api.com/summary',
        this.onCovidDataSuccess,
        (responseJson) => responseJson.Message.length > 0,
        () => { this.setState({ loading: true }); },
        (error) => { this.setState({ error: true, errorMessage: error.message }); },
        (error) => { this.setState({ error: true, errorMessage: error.message }); },
      );
    };

    getData();
  }

  onCovidDataSuccess = (responseJson) => {
    const { Global, Countries } = responseJson;
    this.setState({
      covidPerCountryData: [...Countries],
      globalData: { ...Global },
      loading: false,
    });

    DataHelper.fetchRequestData('https://restcountries.eu/rest/v2/?fields=name;population;flag',
      (respJson) => this.onCountriesSuccess([...Countries], respJson),
      () => false,
      () => { },
      (error) => { this.setState({ error: true, errorMessage: error.message }); },
      (error) => { this.setState({ error: true, errorMessage: error.message }); });
  }

  onCountriesSuccess = (covidData, responseJson) => {
    const processedData = DataHelper.postProcessData(covidData, responseJson);
    this.setState({
      covidPerCountryData: processedData,
    });
  }

  onPageChangeHandler = (newPage) => {
    this.setState({
      tablePage: newPage,
    });
  }

  onCurrentCountryHandler = (newCountry) => {
    this.setState({
      currentCountry: newCountry,
    });
  }

  onCurrentIndicatorHandler = (newIndicator) => {
    this.setState({
      currentIndicator: newIndicator,
    });
  }

  render() {
    const {
      covidPerCountryData,
      globalData,
      tablePage,
      loading,
      error,
      errorMessage,
      currentCountry,
      currentIndicator,
    } = this.state;
    const resultGot = error ? (
      <div>
        Error happened:
        {errorMessage}
      </div>
    )
      : (
        <TablesPager
          tablesData={covidPerCountryData}
          global={globalData}
          dataFields={apiConstants.dataFields}
          tablePage={tablePage}
          onPageChangeHandler={this.onPageChangeHandler}
        />
      );
    return (
      <Container maxWidth="lg" className="App">
        <Paper>
          <Typography variant="h4" component="h1" gutterBottom>
            Here will be our awesome COVID-19 dashboard!
          </Typography>
        </Paper>
        <CasesTable
          currentCountry={currentCountry}
          currentIndicator={currentIndicator}
          rows={covidPerCountryData}
          onCurrentCountryHandler={this.onCurrentCountryHandler}
          onCurrentIndicatorHandler={this.onCurrentIndicatorHandler}
        />
        {loading ? (
          <CircularProgress />
        )
          : resultGot}
      </Container>
    );
  }
}

export default App;
