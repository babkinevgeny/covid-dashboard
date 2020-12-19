export const sortArray = (rows, field, acs = false) => {
  const sortedData = [...rows].sort((r1, r2) => (r1[field] - r2[field]) * (acs ? 1 : -1));
  return sortedData;
};

export const pagerConstants = {
  arrowBackId: 'back',
  arrowForwardId: 'forward',
};

const populationBase = 100000;

export const apiConstants = {
  dataFields: ['Confirmed', 'Deaths', 'Recovered'],
};

export const keyConstants = {
  perPopulationKey: 'perPopulation',
  dataGroupKey: 'dataGroup',
};

export const dataPostfixMap = {
  total: '',
  perPopulation: `Per${populationBase.toString()}Population`,
};

export const dataPrefixMap = {
  totalCases: 'Total',
  newCases: 'New',
};

export const dataProcessor = {
  addCountryData(data, population, latlng) {
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

  postProcessData(covidPerCountryData, countriesData) {
    const mappedData = covidPerCountryData.map((data) => {
      const countryData = countriesData.find((country) => country.name === data.Country);
      if (countryData) {
        const { population, latlng } = countryData;
        return this.addCountryData(data, population, latlng);
      }
      return data;
    });
    return mappedData;
  },
};

export const indicators = [
  {
    title: 'Total Cases',
    key: 'TotalConfirmed',
  },
  {
    title: 'Total Cases Per 100.000 Population',
    key: 'TotalConfirmedPer100000Population',
  },
  {
    title: 'New Cases',
    key: 'NewConfirmed',
  },
  {
    title: 'New Cases Per 100.000 Population',
    key: 'NewConfirmedPer100000Population',
  },
  {
    title: 'Total Deaths',
    key: 'TotalDeaths',
  },
  {
    title: 'Total Deaths Per 100.000 Population',
    key: 'TotalDeathsPer100000Population',
  },
  {
    title: 'New Deaths',
    key: 'NewDeaths',
  },
  {
    title: 'New Deaths Per 100.000 Population',
    key: 'NewDeathsPer100000Population',
  },
  {
    title: 'Total Recovered',
    key: 'TotalRecovered',
  },
  {
    title: 'Total Recovered Per 100.000 Population',
    key: 'TotalRecoveredPer100000Population',
  },
  {
    title: 'New Recovered',
    key: 'NewRecovered',
  },
  {
    title: 'New Recovered Per 100.000 Population',
    key: 'NewRecoveredPer100000Population',
  },
];

export const getFlagUrl = (countryCode) => `https://www.countryflags.io/${countryCode.toUpperCase()}/flat/64.png`;

export const keyboardScheme = [
  '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
  'q w e r t y u i o p [ ] \\',
  'a s d f g h j k l ; \'',
  'z x c v b n m , . /',
  '{space}',
];

export const getIndicatorTitleByKey = (key) => {
  const indicatorObj = indicators.find((obj) => obj.key === key);

  return indicatorObj.title;
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
