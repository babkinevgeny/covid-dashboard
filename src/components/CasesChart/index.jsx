import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import moment from 'moment';
import IntegerFieldWithIncAndDec from '../IntegerFieldWithIncAndDec';
import DataHelper from '../../helpers/DataHelper';
import { sortArray, apiConstants, dataPostfixMap } from '../../helpers/helpers';

class CasesChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      daysBackCount: 10,
      currentArray: [],
      currentLabels: [],
    };
    const { lastAPIDate } = this.props;
    const { daysBackCount } = this.state;
    this.requestData = [];
    this.startDate = moment.utc(lastAPIDate).clone();
    this.startDate.subtract(daysBackCount, 'days').startOf('year');
    this.datesArray = this.fillDatesArray(this.startDate, lastAPIDate);
  }

  componentDidMount() {
    const { lastAPIDate } = this.props;
    lastAPIDate.startOf('hour');
    DataHelper.fetchRequestData(
      `https://api.covid19api.com/world?from=${this.startDate.format()}&to=${lastAPIDate.format()}`,
      this.onChartDataSuccess,
    );
  }

  fillDatesArray = (fromDate, toDate) => {
    const res = [];
    const currDate = moment(fromDate);
    while (toDate.diff(currDate, 'minutes') > 0) {
      res.push(currDate.format('DD.MMM.YYYY'));
      currDate.add(1, 'days');
    }
    return res;
  }

  onChartDataSuccess = (responseJson) => {
    const sortedData = sortArray(responseJson, 'TotalConfirmed', true);
    this.requestData = sortedData;
    const { daysBackCount } = this.state;
    const { array, labels } = this.reCalculateData(daysBackCount);
    this.setState({
      currentArray: array,
      currentLabels: labels,
    });
  }

  onDecrementButtonClick = () => {
    const { daysBackCount } = this.state;
    const { array, labels } = this.reCalculateData(daysBackCount - 1);
    this.setState({
      daysBackCount: daysBackCount - 1,
      currentArray: array,
      currentLabels: labels,
    });
  }

  onIncrementButtonClick = () => {
    const { daysBackCount } = this.state;
    const { array, labels } = this.reCalculateData(daysBackCount + 1);
    this.setState({
      daysBackCount: daysBackCount + 1,
      currentArray: array,
      currentLabels: labels,
    });
  }

  reCalculateData(daysBackCount) {
    const dataArrayLength = this.requestData.length;
    const labelsArrayLength = this.datesArray.length;
    const array = this.requestData.slice(dataArrayLength - daysBackCount, dataArrayLength);
    const labels = this.datesArray.slice(labelsArrayLength - daysBackCount, labelsArrayLength);
    return { array, labels };
  }

  render() {
    const {
      tablePage,
      dataGroup,
      perPopulation,
    } = this.props;
    const currentField = `${dataGroup}${apiConstants.dataFields[tablePage]}${dataPostfixMap[perPopulation]}`;
    const { daysBackCount, currentArray, currentLabels } = this.state;
    const covidData = currentArray.map((row) => row[currentField]);
    const data = {
      labels: currentLabels,
      datasets: [{
        label: currentField,
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        stack: 1,
        barThickness: 'flex',
        barPercentage: 1,
        categoryPercentage: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: covidData,
      }],
    };
    return (
      <>
        <IntegerFieldWithIncAndDec
          handleDecrementButtonClick={this.onDecrementButtonClick}
          inputValue={daysBackCount}
          handleIncrementButtonClick={this.onIncrementButtonClick}
          fieldLabel="Days back count"
        />
        <Bar
          data={data}
          width={100}
          height={50}
          options={{ responsive: true, legend: { display: false } }}
        />
      </>
    );
  }
}

CasesChart.propTypes = {
  lastAPIDate: PropTypes.instanceOf(moment).isRequired,
  tablePage: PropTypes.number.isRequired,
  dataGroup: PropTypes.string.isRequired,
  perPopulation: PropTypes.string.isRequired,
};

export default CasesChart;
