import { rest } from 'msw';

const gniUrl = 'https://api.worldbank.org/v2/country/all/indicator/NY.GNP.PCAP.CD';
const gniMockJsonResponse = [
  {
    page: 1,
    pages: 1,
    per_page: 50,
    total: 3,
    sourceid: '2',
    sourcename: 'World Development Indicators',
    lastupdated: '2021-07-30',
  },
  [
    {
      indicator: {
        id: 'NY.GNP.PCAP.CD',
        value: 'GNI per capita, Atlas method (current US$)',
      },
      country: {
        id: 'XU',
        value: 'North America',
      },
      countryiso3code: 'NAC',
      date: '2020',
      value: 63921.605596663,
      unit: '',
      obs_status: '',
      decimal: 0,
    },
    {
      indicator: {
        id: 'NY.GNP.PCAP.CD',
        value: 'GNI per capita, Atlas method (current US$)',
      },
      country: {
        id: '8S',
        value: 'South Asia',
      },
      countryiso3code: 'SAS',
      date: '2020',
      value: 1820.60030063242,
      unit: '',
      obs_status: '',
      decimal: 0,
    },
    {
      indicator: {
        id: 'NY.GNP.PCAP.CD',
        value: 'GNI per capita, Atlas method (current US$)',
      },
      country: {
        id: 'ZG',
        value: 'Sub-Saharan Africa',
      },
      countryiso3code: 'SSF',
      date: '2020',
      value: 1478.56962278708,
      unit: '',
      obs_status: '',
      decimal: 0,
    },
  ],
];

const countriesUrl = 'https://api.worldbank.org/v2/country/all/';
const countriesMockJsonResponse = [
  {
    page: 1,
    pages: 1,
    per_page: '100',
    total: 8,
  },
  [
    {
      id: 'AFG',
      iso2Code: 'AF',
      name: 'Afghanistan',
      region: {
        id: 'SAS',
        iso2code: '8S',
        value: 'South Asia',
      },
      adminregion: {
        id: 'SAS',
        iso2code: '8S',
        value: 'South Asia',
      },
      incomeLevel: {
        id: 'LIC',
        iso2code: 'XM',
        value: 'Low income',
      },
      lendingType: {
        id: 'IDX',
        iso2code: 'XI',
        value: 'IDA',
      },
      capitalCity: 'Kabul',
      longitude: '69.1761',
      latitude: '34.5228',
    },
    {
      id: 'BGD',
      iso2Code: 'BD',
      name: 'Bangladesh',
      region: {
        id: 'SAS',
        iso2code: '8S',
        value: 'South Asia',
      },
      adminregion: {
        id: 'SAS',
        iso2code: '8S',
        value: 'South Asia',
      },
      incomeLevel: {
        id: 'LMC',
        iso2code: 'XN',
        value: 'Lower middle income',
      },
      lendingType: {
        id: 'IDX',
        iso2code: 'XI',
        value: 'IDA',
      },
      capitalCity: 'Dhaka',
      longitude: '90.4113',
      latitude: '23.7055',
    },
    {
      id: 'BTN',
      iso2Code: 'BT',
      name: 'Bhutan',
      region: {
        id: 'SAS',
        iso2code: '8S',
        value: 'South Asia',
      },
      adminregion: {
        id: 'SAS',
        iso2code: '8S',
        value: 'South Asia',
      },
      incomeLevel: {
        id: 'LMC',
        iso2code: 'XN',
        value: 'Lower middle income',
      },
      lendingType: {
        id: 'IDX',
        iso2code: 'XI',
        value: 'IDA',
      },
      capitalCity: 'Thimphu',
      longitude: '89.6177',
      latitude: '27.5768',
    },
    {
      id: 'IND',
      iso2Code: 'IN',
      name: 'India',
      region: {
        id: 'SAS',
        iso2code: '8S',
        value: 'South Asia',
      },
      adminregion: {
        id: 'SAS',
        iso2code: '8S',
        value: 'South Asia',
      },
      incomeLevel: {
        id: 'LMC',
        iso2code: 'XN',
        value: 'Lower middle income',
      },
      lendingType: {
        id: 'IBD',
        iso2code: 'XF',
        value: 'IBRD',
      },
      capitalCity: 'New Delhi',
      longitude: '77.225',
      latitude: '28.6353',
    },
    {
      id: 'PAK',
      iso2Code: 'PK',
      name: 'Pakistan',
      region: {
        id: 'SAS',
        iso2code: '8S',
        value: 'South Asia',
      },
      adminregion: {
        id: 'SAS',
        iso2code: '8S',
        value: 'South Asia',
      },
      incomeLevel: {
        id: 'LMC',
        iso2code: 'XN',
        value: 'Lower middle income',
      },
      lendingType: {
        id: 'IDB',
        iso2code: 'XH',
        value: 'Blend',
      },
      capitalCity: 'Islamabad',
      longitude: '72.8',
      latitude: '30.5167',
    },
  ],
];

const handlers = [
  rest.get(gniUrl, (req, res, ctx) => res(
    ctx.status(200),
    ctx.json(gniMockJsonResponse),
  )),
  rest.get(countriesUrl, (req, res, ctx) => res(
    ctx.status(200),
    ctx.json(countriesMockJsonResponse),
  )),
];

export default handlers;
