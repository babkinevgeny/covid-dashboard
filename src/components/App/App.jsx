import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Paper, CircularProgress } from '@material-ui/core';
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
    };
  }

  componentDidMount() {
    const getData = () => {
      DataHelper.fetchRequestData('https://api.covid19api.com/summary', this.onCovidDataSuccess,
        (responseJson) => responseJson.Message.length > 0,
        () => { console.log('getData'); this.setState({ loading: true }); });
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
      () => { });
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

  render() {
    const {
      covidPerCountryData,
      globalData,
      tablePage,
      loading,
    } = this.state;
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
              tablesData={covidPerCountryData}
              global={globalData}
              dataFields={apiConstants.dataFields}
              tablePage={tablePage}
              onPageChangeHandler={this.onPageChangeHandler}
            />
          )}
      </Container>
    );
  }
}

export default App;
