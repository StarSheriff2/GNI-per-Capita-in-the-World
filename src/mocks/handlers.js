import { rest } from 'msw';

const gniUrl = 'https://api.worldbank.org/v2/country/Z4;Z7;ZJ;ZQ;XU;8S;ZG;XM;XN;XT;XD/indicator/NY.GNP.PCAP.CD';
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

const detailsUrl = 'https://api.worldbank.org/v2/country/AFG;BGD;BTN;IND;LKA;MDV;NPL;PAK/indicator/NY.GNP.PCAP.CD';
const detailsMockJsonResponse = [
  {
    page: 1,
    pages: 1,
    per_page: 100,
    total: 8,
    sourceid: null,
    sourcename: null,
    lastupdated: '2021-07-30',
  },
  [
    {
      indicator: {
        id: 'NY.GNP.PCAP.CD',
        value: 'GNI per capita, Atlas method (current US$)',
      },
      country: {
        id: 'AF',
        value: 'Afghanistan',
      },
      countryiso3code: 'AFG',
      date: '2020',
      value: 500,
      obs_status: '',
      decimal: 0,
    },
    {
      indicator: {
        id: 'NY.GNP.PCAP.CD',
        value: 'GNI per capita, Atlas method (current US$)',
      },
      country: {
        id: 'BD',
        value: 'Bangladesh',
      },
      countryiso3code: 'BGD',
      date: '2020',
      value: 2010,
      obs_status: '',
      decimal: 0,
    },
    {
      indicator: {
        id: 'NY.GNP.PCAP.CD',
        value: 'GNI per capita, Atlas method (current US$)',
      },
      country: {
        id: 'BT',
        value: 'Bhutan',
      },
      countryiso3code: 'BTN',
      date: '2020',
      value: 2860,
      obs_status: '',
      decimal: 0,
    },
    {
      indicator: {
        id: 'NY.GNP.PCAP.CD',
        value: 'GNI per capita, Atlas method (current US$)',
      },
      country: {
        id: 'IN',
        value: 'India',
      },
      countryiso3code: 'IND',
      date: '2020',
      value: 1900,
      obs_status: '',
      decimal: 0,
    },
    {
      indicator: {
        id: 'NY.GNP.PCAP.CD',
        value: 'GNI per capita, Atlas method (current US$)',
      },
      country: {
        id: 'PK',
        value: 'Pakistan',
      },
      countryiso3code: 'PAK',
      date: '2020',
      value: 1280,
      obs_status: '',
      decimal: 0,
    },
  ],
];

const handlers = [
  rest.get(gniUrl, (req, res, ctx) => res(
    ctx.status(200),
    ctx.json(gniMockJsonResponse),
  )),
  rest.get(detailsUrl, (req, res, ctx) => res(
    ctx.status(200),
    ctx.json(detailsMockJsonResponse),
  )),
];

export default handlers;
