import React from 'react';
import PropTypes from 'prop-types';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';

const CovidMap = (props) => {
  const { countries } = props;
  const markers = countries.map(({ latlng, Country }) => {
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
      >
        <Popup>
          {Country}
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
};

export default CovidMap;
