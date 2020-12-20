import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { sortArray } from '../../helpers';
import FullPageComponentWrapper from '../FullPageComponentWrapper';
import CasesTable from '../CasesTable';
import CasesChart from '../CasesChart';

class CountriesCasesDataWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      daysBackCount: 10,
    };

    this.getPreparedRows = (rows, currentCountry, currentIndicator) => {
      if (currentCountry) {
        return rows.filter((row) => row.Country === currentCountry);
      }
      return sortArray(rows, currentIndicator);
    };
  }

  onDaysCountChangeHandler = (newDaysCount) => {
    this.setState({
      daysBackCount: newDaysCount,
    });
  }

  render() {
    const {
      daysBackCount,
    } = this.state;
    const {
      rows,
      currentCountry,
      currentIndicator,
      onCurrentCountryHandler,
      onCurrentIndicatorHandler,
      showKeyboard,
      hideKeyboard,
      setCasesTableInputValue,
      inputValue,
      lastAPIDate,
      chartByCountriesCovidData,
      chartDataKey,
    } = this.props;

    const preparedRows = this.getPreparedRows(rows, currentCountry, currentIndicator);
    const countriesList = preparedRows.map((obj) => obj.Country);
    return (
      <div className="countries_data_wrapper">
        <FullPageComponentWrapper>
          <CasesTable
            currentCountry={currentCountry}
            currentIndicator={currentIndicator}
            rows={preparedRows}
            onCurrentCountryHandler={onCurrentCountryHandler}
            onCurrentIndicatorHandler={onCurrentIndicatorHandler}
            showKeyboard={showKeyboard}
            hideKeyboard={hideKeyboard}
            setCasesTableInputValue={setCasesTableInputValue}
            inputValue={inputValue}
            countriesList={countriesList}
          />
        </FullPageComponentWrapper>
        <FullPageComponentWrapper>
          <CasesChart
            currentCountry={currentCountry}
            currentIndicator={currentIndicator}
            countryData={chartByCountriesCovidData[chartDataKey]}
            lastAPIDate={lastAPIDate}
            daysBackCount={daysBackCount}
            onDaysCountChangeHandler={this.onDaysCountChangeHandler}
          />
        </FullPageComponentWrapper>
      </div>
    );
  }
}

CountriesCasesDataWrapper.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentCountry: PropTypes.string,
  onCurrentCountryHandler: PropTypes.func.isRequired,
  currentIndicator: PropTypes.string.isRequired,
  onCurrentIndicatorHandler: PropTypes.func.isRequired,
  showKeyboard: PropTypes.func.isRequired,
  hideKeyboard: PropTypes.func.isRequired,
  setCasesTableInputValue: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  lastAPIDate: PropTypes.instanceOf(moment).isRequired,
  chartByCountriesCovidData: PropTypes.objectOf(PropTypes.array).isRequired,
  chartDataKey: PropTypes.string.isRequired,
};

CountriesCasesDataWrapper.defaultProps = {
  currentCountry: '',
};

export default CountriesCasesDataWrapper;
