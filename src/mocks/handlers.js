import { rest } from 'msw';

const URL = 'http://api.worldbank.org/v2/country/Z4;Z7;ZJ;ZQ;XU;8S;ZG;XM;XN;XT;XD/indicator/NY.GNP.PCAP.CD';
const mockJsonResponse = [
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

const handlers = [
  rest.get(URL, (req, res, ctx) => res(
    ctx.status(200),
    ctx.json(mockJsonResponse),
  )),
];

export default handlers;
