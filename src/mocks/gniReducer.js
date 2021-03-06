const FETCH_STARTED = 'gni-per-capita-in-the-world/gniWorld/FETCH_STARTED';
const FETCH_SUCCEDED = 'gni-per-capita-in-the-world/gniWorld/FETCH_SUCCEDED';
const FETCH_FAILED = 'gni-per-capita-in-the-world/gniWorld/GNI_WORLD_FAILED';

const initialState = {
  status: 'idle',
  entities: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STARTED: {
      return {
        ...state,
        status: 'starting',
      };
    }
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
