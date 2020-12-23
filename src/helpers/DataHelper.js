const requestTimeOut = 3000;

const DataHelper = {
  fetchRequestData: function fetchData(url,
    onSuccessHandler,
    needReFetchPredicate = () => false,
    preLoadingHandler = () => { },
    onErrorHandler = () => { },
    onParseErrorHandler = () => { }) {
    preLoadingHandler();
    fetch(url)
      .catch(onErrorHandler)
      .then((response) => response.json(), onErrorHandler)
      .then((responseJson) => {
        let timerId;
        if (needReFetchPredicate(responseJson)) {
          timerId = setTimeout(() => fetchData(
            url,
            onSuccessHandler,
            needReFetchPredicate,
            preLoadingHandler,
            onErrorHandler,
            onParseErrorHandler,
          ), requestTimeOut);
        } else {
          clearTimeout(timerId);
          onSuccessHandler(responseJson);
        }
      }, onParseErrorHandler);
  },
};

export default DataHelper;
