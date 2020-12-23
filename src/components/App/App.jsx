import React from 'react';
import {
  CircularProgress,
  Container,
} from '@material-ui/core';
import moment from 'moment';
import TablesPager from '../TablesPager';
import CovidMap from '../CovidMap';
import KeyboardContainer from '../KeyboardContainer';
import FullPageComponentWrapper from '../FullPageComponentWrapper';
import CountriesCasesDataWrapper from '../CountriesCasesDataWrapper';
import {
  apiConstants,
  DataHelper,
  dataProcessor,
  sortArray,
  globalChartDataKey,
  getStartOfYear,
  covidBaseURL,
} from '../../helpers';
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
      keyboardHidden: true,
      casesTableInputValue: '',
      dataGroup: 'Total',
      perPopulation: 'total',
      lastAPIDate: moment.utc(),
      chartByCountriesCovidData: {},
      chartDataKey: globalChartDataKey,
    };
  }

  componentDidMount() {
    const getData = () => {
      DataHelper.fetchRequestData(
        `${covidBaseURL}summary`,
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
    const { Global, Countries, Date: lastDate } = responseJson;
    this.setState({
      covidPerCountryData: [...Countries],
      globalData: { ...Global },
      loading: false,
      lastAPIDate: moment.utc(lastDate),
    });

    DataHelper.fetchRequestData('https://restcountries.eu/rest/v2/?fields=name;population;latlng',
      (respJson) => this.onCountriesSuccess([...Countries], respJson, { ...Global }),
      () => false,
      () => { },
      (error) => { this.setState({ error: true, errorMessage: error.message }); },
      (error) => { this.setState({ error: true, errorMessage: error.message }); });
  }

  onCountriesSuccess = (covidData, responseJson, globalObj) => {
    const { Countries, Global } = dataProcessor.postProcessData(covidData, responseJson, globalObj);
    this.setState({
      covidPerCountryData: [...Countries],
      globalData: { ...Global },
    });

    this.requestCountryPerPeriodData();
  }

  onPageChangeHandler = (newPage) => {
    this.setState({
      tablePage: newPage,
    });
  }

  onCurrentCountryHandler = (newCountry) => {
    this.requestCountryPerPeriodData(newCountry);
    this.setState({
      currentCountry: newCountry,
    });
  }

  onCurrentIndicatorHandler = (newIndicator) => {
    this.setState({
      currentIndicator: newIndicator,
    });
  }

  onChartDataSuccess = (responseJson, dataKey, newCountry) => {
    const { covidPerCountryData } = this.state;
    const sortedData = (dataKey === globalChartDataKey)
      ? sortArray(responseJson, 'TotalConfirmed', true)
      : responseJson;
    const countryData = covidPerCountryData.find((country) => country.Country === newCountry);
    const postProcessedData = dataProcessor.postProcessChartCountriesData(sortedData, countryData);
    this.setState((state) => ({
      chartByCountriesCovidData: {
        ...state.chartByCountriesCovidData,
        [dataKey]: postProcessedData,
      },
      chartDataKey: dataKey,
    }));
  }

  showKeyboard = () => {
    const isHidden = this.checkKeyboard(true);

    if (isHidden) {
      this.setState({
        keyboardHidden: false,
      });
    }
  }

  hideKeyboard = () => {
    const isShown = this.checkKeyboard(false);

    if (isShown) {
      this.setState({
        keyboardHidden: true,
      });
    }
  }

  checkKeyboard = (value) => {
    const { keyboardHidden } = this.state;
    return keyboardHidden === value;
  }

  setCasesTableInputValue = (value) => {
    this.setState({
      casesTableInputValue: value,
    });
  }

  updateCasesTableInputValue = (value) => {
    const { casesTableInputValue } = this.state;
    const isSignButton = value.substring(0, 1) !== '{';
    let newValue;

    if (!isSignButton) {
      if (value === '{bksp}') {
        newValue = casesTableInputValue.substring(0, casesTableInputValue.length - 1);
      }
      if (value === '{space}') {
        newValue = `${casesTableInputValue} `;
      }
    } else {
      newValue = casesTableInputValue + value;
    }

    this.setState({
      casesTableInputValue: newValue,
    });
  }

  newCountryOnRowClickHandler = (newValue) => {
    this.setCasesTableInputValue(newValue);
    this.onCurrentCountryHandler(newValue);
  }

  onDataGroupChangedHandler = (newGroup) => {
    this.setState({
      dataGroup: newGroup,
    });
  }

  onPerPopulationChangedHandler = (perPopulation) => {
    this.setState({
      perPopulation,
    });
  }

  requestCountryPerPeriodData(newCountry) {
    const { covidPerCountryData, lastAPIDate, chartByCountriesCovidData } = this.state;
    let countryRow = {};
    let currentCountrySlug;
    if (newCountry) {
      countryRow = covidPerCountryData.find((row) => row.Country === newCountry);
      currentCountrySlug = countryRow ? countryRow.Slug : globalChartDataKey;
    } else {
      currentCountrySlug = globalChartDataKey;
    }
    if (chartByCountriesCovidData[currentCountrySlug]) {
      this.setState({
        chartDataKey: currentCountrySlug,
      });
      return;
    }
    const startDate = getStartOfYear(lastAPIDate);
    const countryDomain = currentCountrySlug === globalChartDataKey ? currentCountrySlug : `total/country/${currentCountrySlug}`;
    DataHelper.fetchRequestData(
      `${covidBaseURL}${countryDomain}?from=${startDate.format()}&to=${lastAPIDate.format()}`,
      (responseJson) => this.onChartDataSuccess(responseJson, currentCountrySlug, newCountry),
    );
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
      keyboardHidden,
      casesTableInputValue,
      dataGroup,
      perPopulation,
      lastAPIDate,
      chartByCountriesCovidData,
      chartDataKey,
    } = this.state;
    const resultGot = error ? (
      <div>
        Error happened:
        {errorMessage}
      </div>
    )
      : (
        <FullPageComponentWrapper>
          <TablesPager
            currentCountry={currentCountry}
            tablesData={covidPerCountryData}
            global={globalData}
            dataFields={apiConstants.dataFields}
            tablePage={tablePage}
            onPageChangeHandler={this.onPageChangeHandler}
            onDataGroupChangedHandler={this.onDataGroupChangedHandler}
            onPerPopulationChangedHandler={this.onPerPopulationChangedHandler}
            dataGroup={dataGroup}
            perPopulation={perPopulation}
            newCountryOnRowClickHandler={this.newCountryOnRowClickHandler}
          />
        </FullPageComponentWrapper>
      );
    return (
      <Container maxWidth="lg" className="App">
        <CountriesCasesDataWrapper
          currentCountry={currentCountry}
          currentIndicator={currentIndicator}
          rows={covidPerCountryData}
          onCurrentCountryHandler={this.onCurrentCountryHandler}
          onCurrentIndicatorHandler={this.onCurrentIndicatorHandler}
          showKeyboard={this.showKeyboard}
          hideKeyboard={this.hideKeyboard}
          setCasesTableInputValue={this.setCasesTableInputValue}
          inputValue={casesTableInputValue}
          lastAPIDate={lastAPIDate}
          chartByCountriesCovidData={chartByCountriesCovidData}
          chartDataKey={chartDataKey}
        />
        <FullPageComponentWrapper>
          <CovidMap
            countries={covidPerCountryData}
            currentIndicator={currentIndicator}
          />
        </FullPageComponentWrapper>
        {
          loading ? (
            <CircularProgress />
          )
            : resultGot
        }
        <KeyboardContainer
          isHidden={keyboardHidden}
          updateCasesTableInputValue={this.updateCasesTableInputValue}
        />
      </Container>
    );
  }
}

export default App;
