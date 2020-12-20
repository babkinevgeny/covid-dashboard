import moment from 'moment';

export const sortArray = (rows, field, acs = false) => {
  const sortedData = [...rows].sort((r1, r2) => (r1[field] - r2[field]) * (acs ? 1 : -1));
  return sortedData;
};

export const pagerConstants = {
  arrowBackId: 'back',
  arrowForwardId: 'forward',
};

export const globalChartDataKey = 'world';

export const populationBase = 100000;

export const apiConstants = {
  dataFields: ['Confirmed', 'Deaths', 'Recovered'],
};

export const keyConstants = {
  perPopulationKey: 'perPopulation',
  dataGroupKey: 'dataGroup',
};

export const dataPostfixMap = {
  total: '',
  perPopulation: `Per${populationBase}Population`,
};

export const dataPrefixMap = {
  totalCases: 'Total',
  newCases: 'New',
};

export const dataProcessor = {
  globalPopulation: 0,

  addPerPopulationData(data, population) {
    const perPopulationData = apiConstants.dataFields.reduce((acc, field) => {
      Object.values(dataPrefixMap).forEach((prefix) => {
        const dataField = data[`${prefix}${field}`];
        const dataPerPopulation = (dataField / population) * populationBase;
        const dataPerPopulationRounded = Math.round(dataPerPopulation * 1000) / 1000;
        const fieldName = `${prefix}${field}${dataPostfixMap.perPopulation}`;
        acc[fieldName] = dataPerPopulationRounded;
      });
      return acc;
    }, {});
    return {
      ...data,
      ...perPopulationData,
      population,
      latlng,
    };
  },

  getPerPopulationDataRounded(dataField, population, field, prefix) {
    const dataPerPopulation = (dataField / population) * populationBase;
    const dataPerPopulationRounded = Math.round(dataPerPopulation * 1000) / 1000;
    const dataPerPopFieldName = `${prefix}${field}${dataPostfixMap.perPopulation}`;
    return { dataPerPopFieldName, dataPerPopulationRounded };
  },

  addChartPerPopulationCountryData(chartData, population) {
    const withPopulationData = chartData.map((dataRow, index, allData) => {
      const additionalData = apiConstants.dataFields.reduce((acc, field) => {
        const dataField = dataRow[field];
        const totalFieldName = `${dataPrefixMap.totalCases}${field}${dataPostfixMap.total}`;
        acc[totalFieldName] = dataField;

        const {
          dataPerPopFieldName: totalPerPopFieldName,
          dataPerPopulationRounded: totalPerPopulationRounded,
        } = this.getPerPopulationDataRounded(dataField,
          population, field, dataPrefixMap.totalCases);
        acc[totalPerPopFieldName] = totalPerPopulationRounded;

        const prevDateDataField = index > 0 ? allData[index - 1][field] : 0;
        const diff = dataField - prevDateDataField;
        const newFieldName = `${dataPrefixMap.newCases}${field}`;
        acc[newFieldName] = diff;

        const {
          dataPerPopFieldName: newFieldPerPopName,
          dataPerPopulationRounded: newDataPerPopulationRounded,
        } = this.getPerPopulationDataRounded(diff, population, field, dataPrefixMap.newCases);
        acc[newFieldPerPopName] = newDataPerPopulationRounded;
        return acc;
      }, {});
      return { ...dataRow, ...additionalData };
    });
    return withPopulationData;
  },

  postProcessData(covidPerCountryData, countriesData, globalObj) {
    const mappedData = covidPerCountryData.map((data) => {
      const countryData = countriesData.find((country) => country.name === data.Country);
      if (countryData) {
        const { population, latlng } = countryData;
        this.globalPopulation += population;
        return this.addPerPopulationData(data, population, latlng);
      }
      return data;
    });
    const global = this.addPerPopulationData(globalObj, this.globalPopulation);
    return { Countries: mappedData, Global: global };
  },

  postProcessChartCountriesData(chartByCountriesCovidData, covidPerCountryData) {
    if (covidPerCountryData) {
      const { population } = covidPerCountryData;
      return this.addChartPerPopulationCountryData(chartByCountriesCovidData, population);
    }
    return chartByCountriesCovidData.map((globalData) => this.addPerPopulationData(globalData,
      this.globalPopulation));
  },
};

const colors = {
  red: '#c23616',
  yellow: '#e1b12c',
  purple: '#8c7ae6',
  lightBlue: '#0097e6',
  darkGray: '#2f3640',
  darkBlue: '#192a56',
  lightGray: '#718093',
  blue: '#487eb0',
  green: '#44bd32',
  lightGreen: '#4cd137',
  darkAquagreen: '#16a085',
  aquagreen: '#1abc9c',
};

export const indicators = [
  {
    title: 'Total Cases',
    key: 'TotalConfirmed',
    color: colors.red,
  },
  {
    title: 'Total Cases Per 100.000 Population',
    key: 'TotalConfirmedPer100000Population',
    color: colors.yellow,
  },
  {
    title: 'New Cases',
    key: 'NewConfirmed',
    color: colors.purple,
  },
  {
    title: 'New Cases Per 100.000 Population',
    key: 'NewConfirmedPer100000Population',
    color: colors.lightBlue,
  },
  {
    title: 'Total Deaths',
    key: 'TotalDeaths',
    color: colors.darkGray,
  },
  {
    title: 'Total Deaths Per 100.000 Population',
    key: 'TotalDeathsPer100000Population',
    color: colors.darkBlue,
  },
  {
    title: 'New Deaths',
    key: 'NewDeaths',
    color: colors.lightGray,
  },
  {
    title: 'New Deaths Per 100.000 Population',
    key: 'NewDeathsPer100000Population',
    color: colors.blue,
  },
  {
    title: 'Total Recovered',
    key: 'TotalRecovered',
    color: colors.green,
  },
  {
    title: 'Total Recovered Per 100.000 Population',
    key: 'TotalRecoveredPer100000Population',
    color: colors.lightGreen,
  },
  {
    title: 'New Recovered',
    key: 'NewRecovered',
    color: colors.darkAquagreen,
  },
  {
    title: 'New Recovered Per 100.000 Population',
    key: 'NewRecoveredPer100000Population',
    color: colors.aquagreen,
  },
];

export const getIndicatorObj = (indicator) => Indicators.find((ind) => ind.key === indicator) || {};

export const getFlagUrl = (countryCode) => `https://www.countryflags.io/${countryCode.toUpperCase()}/flat/64.png`;

export const keyboardScheme = [
  '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
  'q w e r t y u i o p [ ] \\',
  'a s d f g h j k l ; \'',
  'z x c v b n m , . /',
  '{space}',
];

export const getIndicatorObjByKey = (key) => indicators.find((obj) => obj.key === key);

export const getIndicatorTitleByKey = (key) => {
  const indicatorObj = getIndicatorObjByKey(key);
  return indicatorObj?.title;
};

export const getIndicatorColorByKey = (key) => {
  const indicatorObj = getIndicatorObjByKey(key);
  return indicatorObj?.color;
};

export const getPreparedRows = (rows, currentCountry, currentIndicator) => {
  let preparedRows = [...rows];

  if (currentCountry) {
    preparedRows = rows.filter((row) => row.Country === currentCountry);
  }

  if (preparedRows.length > 1) {
    preparedRows = sortArray(preparedRows, currentIndicator);
  }

  return preparedRows;
};

export const getRandomIntInclusive = (min, max) => {
  const minRounded = Math.ceil(min);
  const maxRounded = Math.floor(max);
  return Math.floor(Math.random() * (maxRounded - minRounded + 1)) + minRounded;
};

export const getAllValuesOfIndicator = (data, indicator) => {
  if (!data.length) {
    return [0, 2];
  }
  const values = data.reduce((uniqueAcc, row) => {
    const value = row[indicator];

    if (!value) {
      return uniqueAcc;
    }

    const hasThisValue = uniqueAcc.includes(value);
    return hasThisValue ? uniqueAcc : [...uniqueAcc, value];
  }, []);
  return values;
};

export const getMaxValue = (values) => Math.max(...values);

export const getMarkerRadiusByIndicator = (max, value) => {
  const maxRadius = 20;
  const minRadius = 3;
  const diffRadius = maxRadius - minRadius;
  const checkedValue = value || 0;
  const radius = (diffRadius * checkedValue) / max;
  return radius < minRadius ? minRadius : radius;
};

export const getMapURL = ({
  baseUrl,
  nickname,
  styleId,
  token,
}) => `${baseUrl}/styles/v1/${nickname}/${styleId}/tiles/256/{z}/{x}/{y}@2x?access_token=${token}`;

const listOfWrongCountries = [
  {
    country: 'United Kingdom',
    rightLatlng: [51.509865, -0.118092],
  },
  {
    country: 'Venezuela (Bolivarian Republic)',
    rightLatlng: [10.5, -66.916664],
  },
  {
    country: 'Taiwan, Republic of China',
    rightLatlng: [25.105497, 121.597366],
  },
  {
    country: 'Syrian Arab Republic (Syria)',
    rightLatlng: [33.510414, 36.278336],
  },
  {
    country: 'Saint Vincent and Grenadines',
    rightLatlng: [13.1587, -61.2248],
  },
  {
    country: 'Palestinian Territory',
    rightLatlng: [31.898043, 35.204269],
  },
  {
    country: 'Moldova',
    rightLatlng: [47.003670, 28.907089],
  },
  {
    country: 'Macedonia, Republic of',
    rightLatlng: [41.99646, 21.43141],
  },
  {
    country: 'Macao, SAR China',
    rightLatlng: [22.210928, 113.552971],
  },
  {
    country: 'Lao PDR',
    rightLatlng: [17.974855, 102.630867],
  },
  {
    country: 'Korea (South)',
    rightLatlng: [37.532600, 127.024612],
  },
  {
    country: 'Iran, Islamic Republic of',
    rightLatlng: [35.715298, 51.404343],
  },
  {
    country: 'Holy See (Vatican City State)',
    rightLatlng: [41.904755, 12.454628],
  },
  {
    country: 'Congo (Kinshasa)',
    rightLatlng: [-4.322447, 15.307045],
  },
  {
    country: 'Congo (Brazzaville)',
    rightLatlng: [-4.2661, 15.2832],
  },
  {
    country: 'Cape Verde',
    rightLatlng: [14.93152, -23.51254],
  },
  {
    country: 'Bolivia',
    rightLatlng: [-16.489689, -68.119293],
  },
  {
    country: 'Russian Federation',
    rightLatlng: [55.751244, 37.618423],
  },
];

export const checkCountry = (name) => listOfWrongCountries.some(({ country }) => country === name);

export const getRightCoordinates = (name) => {
  const country = listOfWrongCountries.find((countryObj) => countryObj.country === name);
  return country.rightLatlng;
};

export const alphaChanel20PercentInHex = '33';

export const alphaChanel40PercentInHex = '66';

export const alphaChanel100PercentInHex = 'FF';

export const opacity = 0.4;

export const mapCenterCoorinates = [31.505, -0.09];

export const mapZoom = 2;

export const getStartOfYear = (currentDate) => {
  const startDate = (moment.isMoment(currentDate)
    ? currentDate
    : moment(currentDate)).clone().utc();
  startDate.startOf('year');
  return startDate;
};

export const covidBaseURL = 'https://api.covid19api.com/';
