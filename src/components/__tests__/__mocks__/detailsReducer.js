const FETCH_STARTED = 'gni-per-capita-in-the-world/src/components/__tests__/__mocks__/FETCH_STARTED';
const FETCH_SUCCEDED = 'gni-per-capita-in-the-world/src/components/__tests__/__mocks__/FETCH_SUCCEDED';
const FETCH_FAILED = 'gni-per-capita-in-the-world/src/components/__tests__/__mocks__/DETAILS_FAILED';

const initialState = {
  status: 'idle',
  entities: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STARTED:
      return {
        ...state,
        status: 'starting',
      };
    case FETCH_SUCCEDED: {
      const { groupName, groupCountries } = action.payload;
      const newGroup = {};
      newGroup[groupName] = groupCountries.map((country) => (
        {
          name: country.country.value,
          indicator: country.value,
          date: country.date,
        }
      ));
      return {
        ...state,
        entities: {
          ...state.entities,
          ...newGroup,
        },
        status: 'idle',
      };
    }
    case FETCH_FAILED:
      return {
        ...state,
        status: 'failed',
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
