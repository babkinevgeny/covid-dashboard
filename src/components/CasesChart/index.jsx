import React from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  getIndicatorTitleByKey,
  getIndicatorColorByKey,
  alphaChanel20PercentInHex,
  alphaChanel40PercentInHex,
  alphaChanel100PercentInHex,
  getStartOfYear,
} from '../../helpers';
import IntegerFieldWithIncAndDec from '../IntegerFieldWithIncAndDec';
import './index.scss';

const CasesChart = ({
  lastAPIDate,
  countryData,
  currentCountry,
  currentIndicator,
  daysBackCount,
  onDaysCountChangeHandler,
}) => {
  function fillDatesArray(fromDate, toDate) {
    const res = [];
    const currDate = moment(fromDate);
    while (toDate.diff(currDate, 'minutes') > 0) {
      res.push(currDate.format('DD.MMM.YYYY'));
      currDate.add(1, 'days');
    }
    return res;
  }

  const startDate = getStartOfYear(lastAPIDate);
  const datesArray = fillDatesArray(startDate, lastAPIDate);

  function getCovidData(row, indicator) {
    return row[indicator];
  }

  function reCalculateData() {
    const dataArrayLength = (countryData || []).length;
    const labelsArrayLength = datesArray.length;
    const array = (countryData || []).slice(dataArrayLength - daysBackCount, dataArrayLength);
    const labels = datesArray.slice(labelsArrayLength - daysBackCount, labelsArrayLength);
    return { currentArray: array || [], currentLabels: labels || [] };
  }

  const { currentArray, currentLabels } = reCalculateData(daysBackCount);
  const covidData = currentArray.map((row) => getCovidData(row, currentIndicator));
  const currentIndicatorTitle = getIndicatorTitleByKey(currentIndicator);
  const chartLabel = currentCountry ? `${currentIndicatorTitle} in ${currentCountry}` : `${currentIndicatorTitle}`;
  const color = getIndicatorColorByKey(currentIndicator);
  const data = {
    labels: currentLabels,
    datasets: [{
      label: chartLabel,
      backgroundColor: `${color}${alphaChanel20PercentInHex}`,
      borderColor: `${color}${alphaChanel100PercentInHex}`,
      borderWidth: 1,
      stack: 1,
      barThickness: 'flex',
      barPercentage: 1,
      categoryPercentage: 1,
      hoverBackgroundColor: `${color}${alphaChanel40PercentInHex}`,
      hoverBorderColor: `${color}${alphaChanel100PercentInHex}`,
      data: covidData,
    }],
  };
  const options = {
    responsive: true,
    legend: {
      display: false,
    },
    type: 'bar',
    scales: {
      xAxes: [{
        stacked: true,
        scaleLabel: {
          display: false,
        },
      }],
      yAxes: [{
        stacked: true,
      }],
    },
  };

  function onDecrementButtonClick() {
    onDaysCountChangeHandler(daysBackCount - 1);
  }

  function onIncrementButtonClick() {
    onDaysCountChangeHandler(daysBackCount + 1);
  }

  return (
    <div className="chart_container">
      <IntegerFieldWithIncAndDec
        handleDecrementButtonClick={onDecrementButtonClick}
        inputValue={daysBackCount}
        handleIncrementButtonClick={onIncrementButtonClick}
        fieldLabel="Days back count"
      />
      <Bar
        data={data}
        width={100}
        height={50}
        legend={{ display: false }}
        options={options}
      />
    </div>
  );
};

CasesChart.propTypes = {
  lastAPIDate: PropTypes.instanceOf(moment).isRequired,
  currentCountry: PropTypes.string,
  currentIndicator: PropTypes.string.isRequired,
  countryData: PropTypes.arrayOf(PropTypes.object),
  daysBackCount: PropTypes.number.isRequired,
  onDaysCountChangeHandler: PropTypes.func.isRequired,
};

CasesChart.defaultProps = {
  currentCountry: '',
  countryData: [],
};

export default CasesChart;
