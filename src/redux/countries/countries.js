// API Query Keywords
// import incomeLevel from '../../filters/incomeLevel';
// import regions from '../../filters/regions';

// Actions
const FETCH_STARTED = 'gni-per-capita-in-the-world/countries/FETCH_STARTED';
const FETCH_SUCCEDED = 'gni-per-capita-in-the-world/countries/FETCH_SUCCEDED';
const FETCH_FAILED = 'gni-per-capita-in-the-world/countries/COUNTRIES_FAILED';

// API
const baseURL = 'https://api.worldbank.org/v2/country/all/';

// Initial State

const initialState = {
  status: 'idle',
  entities: {},
};

// Action Creators
export const getCountriesStarted = () => ({
  type: FETCH_STARTED,
});

export const getCountriesSuccess = (payload) => ({
  type: FETCH_SUCCEDED,
  payload,
});

export const getCountriesFailed = (payload) => ({
  type: FETCH_FAILED,
  payload,
});

export const fetchCountries = (groupId) => async (dispatch) => {
  dispatch(getCountriesStarted());
  const query = `?format=json&per_page=100&region=${groupId}`;
  // const groupCountriesId = (category === 'region') ? regions[groupId] : incomeLevel[groupId];
  try {
    const data = await (await fetch(baseURL + query, {
      mode: 'cors',
    })).json();
    const newGroup = {
      groupName: groupId,
      groupCountries: data[1],
    };
    dispatch(getCountriesSuccess(newGroup));
  } catch (err) {
    dispatch(getCountriesFailed(err.toString()));
  }
};

// Reducer
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
