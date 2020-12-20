import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import moment from 'moment';
import DataHelper from '../../helpers/DataHelper';
import { sortArray, apiConstants, dataPostfixMap } from '../../helpers/helpers';

class CasesChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestData: [],
    };
    const { lastAPIDate } = this.props;
    this.startDate = moment.utc(lastAPIDate).clone();
    this.startDate.subtract(15, 'days').startOf('date');
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
    this.setState({
      requestData: sortedData,
    });
  }

  render() {
    const {
      tablePage,
      dataGroup,
      perPopulation,
    } = this.props;
    const currentField = `${dataGroup}${apiConstants.dataFields[tablePage]}${dataPostfixMap[perPopulation]}`;
    const { requestData } = this.state;
    const covidData = requestData.map((row) => row[currentField]);
    const data = {
      labels: this.datesArray,
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
      <Bar
        data={data}
        width={100}
        height={50}
        options={{ responsive: true, legend: { display: false } }}
      />
    );
  }

  // const options = {
  //   responsive: true,
  //   legend: {
  //     display: false,
  //   },
  //   type: 'bar',
  //   scales: {
  //     xAxes: [{
  //       stacked: true,
  //     }],
  //     yAxes: [{
  //       stacked: true,
  //     }],
  //   },
  // };
}

CasesChart.propTypes = {
  lastAPIDate: PropTypes.instanceOf(moment).isRequired,
  tablePage: PropTypes.number.isRequired,
  dataGroup: PropTypes.string.isRequired,
  perPopulation: PropTypes.string.isRequired,
};

export default CasesChart;
