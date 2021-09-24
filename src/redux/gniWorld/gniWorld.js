// Actions
const FETCH_STARTED = 'gni-per-capita-in-the-world/gniWorld/FETCH_STARTED';
const FETCH_SUCCEDED = 'gni-per-capita-in-the-world/gniWorld/FETCH_SUCCEDED';
const FETCH_FAILED = 'gni-per-capita-in-the-world/gniWorld/GNI_WORLD_FAILED';

// API
const baseURL = 'http://api.worldbank.org/v2/country/all/indicator/NY.GNP.PCAP.CD?format=json&per_page=300&mrnev=1';

// Initial State

const initialState = {
  status: 'idle',
  entities: [],
};

// Action Creators
export const getGniWorldStarted = () => ({
  type: FETCH_STARTED,
});

export const getGniWorldSuccess = (payload) => ({
  type: FETCH_SUCCEDED,
  payload,
});

export const getGniWorldFailed = (payload) => ({
  type: FETCH_FAILED,
  payload,
});

export const fetchGniWorld = () => async (dispatch) => {
  dispatch(getGniWorldStarted());
  try {
    const data = await (await fetch(baseURL, {})).json();
    dispatch(getGniWorldSuccess(data[1]));
  } catch (err) {
    dispatch(getGniWorldFailed(err.toString()));
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
      return {
        entities: action.payload,
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
