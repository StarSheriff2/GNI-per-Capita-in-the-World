import reducer, { getDetailsSuccess, getDetailsFailed } from '../../redux/details/details';

describe('detailsReducer', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
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

    expect(reducer(previousState, getDetailsSuccess(newGroup))).toEqual(
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

    expect(reducer(previousState, getDetailsFailed(errorMessage))).toEqual({
      entities: {},
      error: 'error message',
      status: 'failed',
    });
  });
});
