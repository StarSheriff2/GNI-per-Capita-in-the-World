const FETCH_STARTED = 'gni-per-capita-in-the-world/countries/FETCH_STARTED';
const FETCH_SUCCEDED = 'gni-per-capita-in-the-world/countries/FETCH_SUCCEDED';
const FETCH_FAILED = 'gni-per-capita-in-the-world/countries/COUNTRIES_FAILED';

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
      newGroup[groupName] = groupCountries;
      return {
        entities: {
          ...state.entities,
          ...newGroup,
        },
        status: 'succeded',
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
