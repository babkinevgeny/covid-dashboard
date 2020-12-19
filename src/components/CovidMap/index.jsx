import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';
import { getIndicatorTitleByKey } from '../../helpers';

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

  const markers = countries.map((infoObj) => {
    const { latlng, Country } = infoObj;
    const indicatorNumber = infoObj[currentIndicator];
    const indicatorTitle = getIndicatorTitleByKey(currentIndicator);
    let parsedLatlng = [0, 0];

    if (latlng) {
      parsedLatlng = [...latlng];
    }

    return (
      <Marker
        key={`marker-${Country.toLowerCase()}`}
        position={parsedLatlng}
        className="icon-marker"
        opacity="0.5"
        eventHandlers={eventHandlers}
      >
        <Popup>
          <h4 className="map-popup-title">{Country}</h4>
          <span className="map-popup-indicator-name">{`${indicatorTitle}: `}</span>
          <span>{indicatorNumber}</span>
        </Popup>
      </Marker>
    );
  });

  return (
    <MapContainer center={[31.505, -0.09]} zoom={2} scrollWheelZoom={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers}
    </MapContainer>
  );
};

CovidMap.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentIndicator: PropTypes.string.isRequired,
};

export default CovidMap;
