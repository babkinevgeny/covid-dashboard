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
  perPopulation: ` Per ${populationBase.toLocaleString()} Population`,
};

export const dataPrefixMap = {
  totalCases: 'Total',
  newCases: 'New',
};

export const DataProcessor = {
  addCountryData(data, population) {
    const perPopulationData = apiConstants.dataFields.reduce((acc, field) => {
      Object.values(dataPrefixMap).forEach((prefix) => {
        const dataField = data[`${prefix}${field}`];
        const dataPerPopulation = (dataField / population) * populationBase;
        const fieldName = `${prefix}${field}${dataPostfixMap.perPopulation}`;
        acc[fieldName] = dataPerPopulation;
      });
      return acc;
    }, {});
    return {
      ...data,
      ...perPopulationData,
      population,
    };
  },

  postProcessData(covidPerCountryData, countriesData) {
    const mappedData = covidPerCountryData.map((data) => {
      const countryData = countriesData.find((country) => country.name === data.Country);
      if (countryData) {
        const { population } = countryData;
        return this.addCountryData(data, population);
      }
      return data;
    });
    return mappedData;
  },
};

export const Indicators = [
  {
    title: 'Total Cases',
    key: 'TotalConfirmed',
  },
  {
    title: 'New Cases',
    key: 'NewConfirmed',
  },
  {
    title: 'Total Deaths',
    key: 'TotalDeaths',
  },
  {
    title: 'New Deaths',
    key: 'NewDeaths',
  },
  {
    title: 'Total Recovered',
    key: 'TotalRecovered',
  },
  {
    title: 'New Recovered',
    key: 'NewRecovered',
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
