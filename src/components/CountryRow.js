import React from 'react';

export default function CountryRow(properties) {
  return (
    <>
      <td>
        { properties.country }
      </td>
      <td>
        { properties.number }
      </td>
      {/* <td>
        { properties.deaths }
      </td>
      <td>
        { properties.recover }
      </td> */}
    </>
  );
}
