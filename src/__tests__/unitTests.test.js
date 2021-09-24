import countriesReducer, { getCountriesSuccess, getCountriesFailed } from '../redux/countries/countries';
import gniWorldReducer, { getGniWorldSuccess, getGniWorldFailed } from '../redux/gniWorld/gniWorld';

describe('countriesReducer', () => {
  test('should return the initial state', () => {
    expect(countriesReducer(undefined, {})).toEqual(
      {
        status: 'idle',
        entities: {},
      },
    );
  });

  test('should handle payload from successful API call', () => {
    const previousState = {
      status: 'idle',
      entities: {},
    };

    const newGroup = {
      groupName: 'EAS',
      groupCountries: [
        {
          indicator: {
            id: 'NY.GNP.PCAP.CD',
            value: 'GNI per capita, Atlas method (current US$)',
          },
          country: {
            id: 'LU',
            value: 'Luxembourg',
          },
          countryiso3code: 'LUX',
          date: '2018',
          value: 70840,
          obs_status: '',
          decimal: 0,
        },
        {
          indicator: {
            id: 'NY.GNP.PCAP.CD',
            value: 'GNI per capita, Atlas method (current US$)',
          },
          country: {
            id: 'LV',
            value: 'Latvia',
          },
          countryiso3code: 'LVA',
          date: '2019',
          value: 17730,
          obs_status: '',
          decimal: 0,
        },
        {
          indicator: {
            id: 'NY.GNP.PCAP.CD',
            value: 'GNI per capita, Atlas method (current US$)',
          },
          country: {
            id: 'MO',
            value: 'Macao SAR, China',
          },
          countryiso3code: 'MAC',
          date: '2019',
          value: 75610,
          obs_status: '',
          decimal: 0,
        },
      ],
    };

    expect(countriesReducer(previousState, getCountriesSuccess(newGroup))).toEqual(
      {
        entities: {
          EAS: [
            {
              indicator: {
                id: 'NY.GNP.PCAP.CD',
                value: 'GNI per capita, Atlas method (current US$)',
              },
              country: {
                id: 'LU',
                value: 'Luxembourg',
              },
              countryiso3code: 'LUX',
              date: '2018',
              value: 70840,
              obs_status: '',
              decimal: 0,
            },
            {
              indicator: {
                id: 'NY.GNP.PCAP.CD',
                value: 'GNI per capita, Atlas method (current US$)',
              },
              country: {
                id: 'LV',
                value: 'Latvia',
              },
              countryiso3code: 'LVA',
              date: '2019',
              value: 17730,
              obs_status: '',
              decimal: 0,
            },
            {
              indicator: {
                id: 'NY.GNP.PCAP.CD',
                value: 'GNI per capita, Atlas method (current US$)',
              },
              country: {
                id: 'MO',
                value: 'Macao SAR, China',
              },
              countryiso3code: 'MAC',
              date: '2019',
              value: 75610,
              obs_status: '',
              decimal: 0,
            },
          ],
        },
        status: 'succeded',
      },
    );
  });

  test('should handle error', () => {
    const previousState = {
      status: 'idle',
      entities: {},
    };

    const errorMessage = 'error message';

    expect(countriesReducer(previousState, getCountriesFailed(errorMessage))).toEqual({
      entities: {},
      error: 'error message',
      status: 'failed',
    });
  });
});

describe('gniWorldReducer', () => {
  test('should return the initial state', () => {
    expect(gniWorldReducer(undefined, {})).toEqual(
      {
        status: 'idle',
        entities: [],
      },
    );
  });

  test('should handle payload from successful API call', () => {
    const previousState = {
      status: 'idle',
      entities: [],
    };

    const apiPayload = [
      {
        indicator: {
          id: 'NY.GNP.PCAP.CD',
          value: 'GNI per capita, Atlas method (current US$)',
        },
        country: {
          id: 'XD',
          value: 'High income',
        },
        countryiso3code: '',
        date: '2020',
        value: 46036.0466787998,
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
          id: 'XM',
          value: 'Low income',
        },
        countryiso3code: '',
        date: '2020',
        value: 810.751972755762,
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
          id: 'XN',
          value: 'Lower middle income',
        },
        countryiso3code: '',
        date: '2020',
        value: 2200.71995911578,
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
          id: 'XT',
          value: 'Upper middle income',
        },
        countryiso3code: '',
        date: '2020',
        value: 9425.53004618163,
        unit: '',
        obs_status: '',
        decimal: 0,
      },
    ];

    expect(gniWorldReducer(previousState, getGniWorldSuccess(apiPayload))).toEqual(
      {
        entities: [
          {
            indicator: {
              id: 'NY.GNP.PCAP.CD',
              value: 'GNI per capita, Atlas method (current US$)',
            },
            country: {
              id: 'XD',
              value: 'High income',
            },
            countryiso3code: '',
            date: '2020',
            value: 46036.0466787998,
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
              id: 'XM',
              value: 'Low income',
            },
            countryiso3code: '',
            date: '2020',
            value: 810.751972755762,
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
              id: 'XN',
              value: 'Lower middle income',
            },
            countryiso3code: '',
            date: '2020',
            value: 2200.71995911578,
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
              id: 'XT',
              value: 'Upper middle income',
            },
            countryiso3code: '',
            date: '2020',
            value: 9425.53004618163,
            unit: '',
            obs_status: '',
            decimal: 0,
          },
        ],
        status: 'idle',
      },
    );
  });

  test('should handle error', () => {
    const previousState = {
      status: 'idle',
      entities: [],
    };

    const errorMessage = 'error message';

    expect(gniWorldReducer(previousState, getGniWorldFailed(errorMessage))).toEqual({
      entities: [],
      error: 'error message',
      status: 'failed',
    });
  });
});
