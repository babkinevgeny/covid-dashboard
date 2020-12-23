import React from 'react';
import PropTypes from 'prop-types';
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
} from 'react-leaflet';
import Legend from './Legend';
import {
  getIndicatorTitleByKey,
  getIndicatorColorByKey,
  getAllValuesOfIndicator,
  getMaxValue,
  getMarkerRadiusByIndicator,
  getMapURL,
  checkCountry,
  getRightCoordinates,
  opacity,
  mapCenterCoorinates,
  mapZoom,
} from '../../helpers';
import mapAccessObj from './access';

const CovidMap = ({
  countries,
  currentIndicator,
  markerClickHandler,
}) => {
  const eventHandlers = {
    mouseover(event) {
      event.target.openPopup();
    },
    mouseout(event) {
      event.target.closePopup();
    },
    click(event) {
      const { country } = event.target.options;
      markerClickHandler(country);
    },
  };

  const markerBackgroundColor = getIndicatorColorByKey(currentIndicator);

  const valuesOfIndicator = getAllValuesOfIndicator(countries, currentIndicator);
  const maxValue = getMaxValue(valuesOfIndicator);

  const markers = countries.map((infoObj) => {
    const { latlng, Country } = infoObj;

    const indicatorNumber = infoObj[currentIndicator];
    const indicatorTitle = getIndicatorTitleByKey(currentIndicator);
    let parsedLatlng = latlng ? [...latlng] : [0, 0];

    const isWrongCountry = checkCountry(Country);

    if (isWrongCountry) {
      parsedLatlng = getRightCoordinates(Country);
    }

    const markerRadius = getMarkerRadiusByIndicator(maxValue, indicatorNumber);

    return (
      <CircleMarker
        key={`marker-${Country.toLowerCase()}-${markerBackgroundColor}`}
        center={parsedLatlng}
        radius={markerRadius}
        className="icon-marker"
        eventHandlers={eventHandlers}
        fillColor={markerBackgroundColor}
        fillOpacity={opacity}
        color="transparent"
        country={Country}
      >
        <Popup className="marker-popup">
          <h4 className="map-popup-title">{Country}</h4>
          <span className="map-popup-indicator-name">{`${indicatorTitle}: `}</span>
          <span>{indicatorNumber}</span>
        </Popup>
      </CircleMarker>
    );
  });

  return (
    <MapContainer center={mapCenterCoorinates} zoom={mapZoom} scrollWheelZoom={false}>
      <TileLayer
        url={getMapURL(mapAccessObj)}
      />
      {markers}
      <Legend />
    </MapContainer>
  );
};

CovidMap.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentIndicator: PropTypes.string.isRequired,
  markerClickHandler: PropTypes.func.isRequired,
};

export default CovidMap;
