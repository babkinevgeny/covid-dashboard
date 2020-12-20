import React, { useMemo } from 'react';
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
  mapAccessObj,
  getMapURL,
  checkCountry,
  getRightCoordinates,
} from '../../helpers';

const CovidMap = ({
  countries,
  currentIndicator,
}) => {
  const eventHandlers = useMemo(
    () => ({
      mouseover(event) {
        event.target.openPopup();
      },
      mouseout(event) {
        event.target.closePopup();
      },
    }),
    [],
  );

  const markerBackgroundColor = getIndicatorColorByKey(currentIndicator);

  const valuesOfIndicator = getAllValuesOfIndicator(countries, currentIndicator);
  const maxValue = getMaxValue(valuesOfIndicator);

  const markers = countries.map((infoObj) => {
    const { latlng, Country } = infoObj;

    const indicatorNumber = infoObj[currentIndicator];
    const indicatorTitle = getIndicatorTitleByKey(currentIndicator);
    let parsedLatlng = [0, 0];

    if (latlng) {
      parsedLatlng = [...latlng];
    }

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
        fillOpacity={0.4}
        color="transparent"
      >
        <Popup>
          <h4 className="map-popup-title">{Country}</h4>
          <span className="map-popup-indicator-name">{`${indicatorTitle}: `}</span>
          <span>{indicatorNumber}</span>
        </Popup>
      </CircleMarker>
    );
  });

  return (
    <MapContainer center={[31.505, -0.09]} zoom={2} scrollWheelZoom={false}>
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
};

export default CovidMap;
