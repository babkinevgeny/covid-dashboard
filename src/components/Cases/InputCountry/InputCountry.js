import React from 'react';
import { Autocomplete } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';

const countriesMock = [
  {
    Country: 'Guinea-Bissau',
    Slug: 'guinea-bissau',
    ISO2: 'GW',
  },
  {
    Country: 'Haiti',
    Slug: 'haiti',
    ISO2: 'HT',
  },
  {
    Country: 'Slovenia',
    Slug: 'slovenia',
    ISO2: 'SI',
  },
  {
    Country: 'Canada',
    Slug: 'canada',
    ISO2: 'CA',
  },
  {
    Country: 'Comoros',
    Slug: 'comoros',
    ISO2: 'KM',
  },
  {
    Country: 'French Guiana',
    Slug: 'french-guiana',
    ISO2: 'GF',
  },
  {
    Country: 'Germany',
    Slug: 'germany',
    ISO2: 'DE',
  },
  {
    Country: 'Korea (North)',
    Slug: 'korea-north',
    ISO2: 'KP',
  },
  {
    Country: 'Malaysia',
    Slug: 'malaysia',
    ISO2: 'MY',
  },
  {
    Country: 'Peru',
    Slug: 'peru',
    ISO2: 'PE',
  },
  {
    Country: 'Antarctica',
    Slug: 'antarctica',
    ISO2: 'AQ',
  },
  {
    Country: 'United Kingdom',
    Slug: 'united-kingdom',
    ISO2: 'GB',
  },
  {
    Country: 'Netherlands',
    Slug: 'netherlands',
    ISO2: 'NL',
  },
  {
    Country: 'Nicaragua',
    Slug: 'nicaragua',
    ISO2: 'NI',
  },
  {
    Country: 'Norway',
    Slug: 'norway',
    ISO2: 'NO',
  },
  {
    Country: 'Anguilla',
    Slug: 'anguilla',
    ISO2: 'AI',
  },
  {
    Country: 'Cook Islands',
    Slug: 'cook-islands',
    ISO2: 'CK',
  },
  {
    Country: 'Libya',
    Slug: 'libya',
    ISO2: 'LY',
  },
  {
    Country: 'Monaco',
    Slug: 'monaco',
    ISO2: 'MC',
  },
  {
    Country: 'Central African Republic',
    Slug: 'central-african-republic',
    ISO2: 'CF',
  },
  {
    Country: 'American Samoa',
    Slug: 'american-samoa',
    ISO2: 'AS',
  },
  {
    Country: 'Saudi Arabia',
    Slug: 'saudi-arabia',
    ISO2: 'SA',
  },
  {
    Country: 'Israel',
    Slug: 'israel',
    ISO2: 'IL',
  },
  {
    Country: 'Lebanon',
    Slug: 'lebanon',
    ISO2: 'LB',
  },
  {
    Country: 'Norfolk Island',
    Slug: 'norfolk-island',
    ISO2: 'NF',
  },
  {
    Country: 'Sudan',
    Slug: 'sudan',
    ISO2: 'SD',
  },
  {
    Country: 'Chile',
    Slug: 'chile',
    ISO2: 'CL',
  },
  {
    Country: 'Brazil',
    Slug: 'brazil',
    ISO2: 'BR',
  },
  {
    Country: 'Liechtenstein',
    Slug: 'liechtenstein',
    ISO2: 'LI',
  },
  {
    Country: 'Senegal',
    Slug: 'senegal',
    ISO2: 'SN',
  },
  {
    Country: 'Barbados',
    Slug: 'barbados',
    ISO2: 'BB',
  },
  {
    Country: 'French Polynesia',
    Slug: 'french-polynesia',
    ISO2: 'PF',
  },
  {
    Country: 'Greenland',
    Slug: 'greenland',
    ISO2: 'GL',
  },
  {
    Country: 'Sri Lanka',
    Slug: 'sri-lanka',
    ISO2: 'LK',
  },
  {
    Country: 'Swaziland',
    Slug: 'swaziland',
    ISO2: 'SZ',
  },
  {
    Country: 'Austria',
    Slug: 'austria',
    ISO2: 'AT',
  },
  {
    Country: 'Macao, SAR China',
    Slug: 'macao-sar-china',
    ISO2: 'MO',
  },
  {
    Country: 'Saint Lucia',
    Slug: 'saint-lucia',
    ISO2: 'LC',
  },
  {
    Country: 'Ukraine',
    Slug: 'ukraine',
    ISO2: 'UA',
  },
  {
    Country: 'Azerbaijan',
    Slug: 'azerbaijan',
    ISO2: 'AZ',
  },
  {
    Country: 'Belize',
    Slug: 'belize',
    ISO2: 'BZ',
  },
  {
    Country: 'Cameroon',
    Slug: 'cameroon',
    ISO2: 'CM',
  },
  {
    Country: 'Hong Kong, SAR China',
    Slug: 'hong-kong-sar-china',
    ISO2: 'HK',
  },
  {
    Country: 'Iceland',
    Slug: 'iceland',
    ISO2: 'IS',
  },
  {
    Country: 'Madagascar',
    Slug: 'madagascar',
    ISO2: 'MG',
  },
  {
    Country: 'Malawi',
    Slug: 'malawi',
    ISO2: 'MW',
  },
  {
    Country: 'Martinique',
    Slug: 'martinique',
    ISO2: 'MQ',
  },
];

const InputCountry = () => (
  <Autocomplete
    id="combo-box-demo"
    options={countriesMock}
    autoComplete
    getOptionLabel={(option) => option.Country}
    // eslint-disable-next-line react/jsx-props-no-spreading
    renderInput={(params) => <TextField {...params} label="Country" variant="outlined" />}
  />
);

export default InputCountry;
