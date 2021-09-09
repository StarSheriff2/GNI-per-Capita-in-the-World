// API Query Keywords
// import incomeLevel from "../../filters/incomeLevel";
import regions from '../../filters/regions';

// Actions
const FETCH_STARTED = 'gni-per-capita-in-the-world/details/FETCH_STARTED';
const FETCH_SUCCEDED = 'gni-per-capita-in-the-world/details/FETCH_SUCCEDED';
const FETCH_FAILED = 'gni-per-capita-in-the-world/details/DETAILS_FAILED';

// API
const baseURL = 'https://api.worldbank.org/v2/country/';

// Initial State

const initialState = {
  status: 'idle',
  entities: {},
};

// Action Creators
export const getDetailsStarted = () => ({
  type: FETCH_STARTED,
});

export const getDetailsSuccess = (payload) => ({
  type: FETCH_SUCCEDED,
  payload,
});

export const getDetailsFailed = (payload) => ({
  type: FETCH_FAILED,
  payload,
});

export const fetchDetails = (groupId) => async (dispatch) => {
  dispatch(getDetailsStarted());
  const groupCountriesId = regions[groupId];
  await new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    const response = await fetch(`${baseURL + groupCountriesId}/indicator/NY.GNP.PCAP.CD?per_page=100&format=json&mrnev=1`, {
      mode: 'cors',
    });
    const details = await response.json();
    const newGroup = {
      groupName: groupId,
      groupCountries: details[1],
    };
    dispatch(getDetailsSuccess(newGroup));
  } catch (err) {
    dispatch(getDetailsFailed(err.toString()));
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
