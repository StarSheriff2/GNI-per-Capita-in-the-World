import detailsReducer, { getDetailsSuccess, getDetailsFailed } from '../../redux/details/details';
import gniWorldReducer, { getGniWorldSuccess, getGniWorldFailed } from '../../redux/gniWorld/gniWorld';

describe('detailsReducer', () => {
  test('should return the initial state', () => {
    expect(detailsReducer(undefined, {})).toEqual(
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

    expect(detailsReducer(previousState, getDetailsSuccess(newGroup))).toEqual(
      {
        entities: {
          EAS: [
            { date: '2018', indicator: 70840, name: 'Luxembourg' },
            { date: '2019', indicator: 17730, name: 'Latvia' },
            { date: '2019', indicator: 75610, name: 'Macao SAR, China' },
          ],
        },
        status: 'idle',
      },
    );
  });

  test('should handle error', () => {
    const previousState = {
      status: 'idle',
      entities: {},
    };

    const errorMessage = 'error message';

    expect(detailsReducer(previousState, getDetailsFailed(errorMessage))).toEqual({
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
        entities: [{
          name: 'High income', indicator: 46036.0466787998, id: 'XD', date: '2020', category: 'income',
        },
        {
          name: 'Low income', indicator: 810.751972755762, id: 'XM', date: '2020', category: 'income',
        },
        {
          name: 'Lower middle income', indicator: 2200.71995911578, id: 'XN', date: '2020', category: 'income',
        },
        {
          name: 'Upper middle income', indicator: 9425.53004618163, id: 'XT', date: '2020', category: 'income',
        }],
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
