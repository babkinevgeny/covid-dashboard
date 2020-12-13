export const sortArray = (rows, field, acs = false) => {
  const sortedData = [...rows].sort((r1, r2) => (r1[field] - r2[field]) * (acs ? 1 : -1));
  return sortedData;
};

export const pagerConstants = {
  arrowBackId: 'back',
  arrowForwardId: 'forward',
};

export const apiConstants = {
  dataFields: ['TotalConfirmed', 'TotalDeaths', 'TotalRecovered'],
};

export const DataHelper = {
  fetchRequestData: (url,
    onSuccessHandler,
    needReFetchPredicate,
    preLoadingHandler = () => { },
    onErrorHandler = () => { },
    onParseErrorHandler = () => { }) => {
    preLoadingHandler();
    fetch(url)
      .then((response) => response.json(), onErrorHandler)
      .then((responseJson) => {
        let timerId;
        if (needReFetchPredicate(responseJson)) {
          timerId = setTimeout(() => this.fetchRequestData(
            url,
            onSuccessHandler,
            needReFetchPredicate,
            preLoadingHandler,
            onErrorHandler,
            onParseErrorHandler,
          ), 500);
        } else {
          clearTimeout(timerId);
          onSuccessHandler(responseJson);
        }
      }, onParseErrorHandler);
  },

  postProcessData: (covidPerCountryData, countriesData) => {
    const mappedData = covidPerCountryData.map((data) => {
      const countryData = countriesData.find((country) => country.name === data.Country);
      if (countryData) {
        const { flag, population } = countryData;
        return { ...data, flag, population };
      }
      return data;
    });
    return mappedData;
  },
};

export const INDICATORS = [
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
