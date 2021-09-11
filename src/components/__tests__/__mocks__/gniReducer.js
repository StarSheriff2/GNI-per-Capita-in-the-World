const FETCH_STARTED = 'gni-per-capita-in-the-world/src/components/__tests__/__mocks__/FETCH_STARTED';
const FETCH_SUCCEDED = 'gni-per-capita-in-the-world/src/components/__tests__/__mocks__/FETCH_SUCCEDED';
const FETCH_FAILED = 'gni-per-capita-in-the-world/src/components/__tests__/__mocks__/GNI_WORLD_FAILED';

const gniStartingState = {
  status: 'idle',
  entities: [],
};

const reducer = (state = gniStartingState, action) => {
  switch (action.type) {
    case FETCH_STARTED:
      return {
        ...state,
        status: 'starting',
      };
    case FETCH_SUCCEDED: {
      const newEntities = [];
      action.payload.forEach((obj) => {
        if (obj.country.value.includes('income')) {
          newEntities.push(
            {
              name: obj.country.value,
              indicator: obj.value,
              id: obj.country.id,
              date: obj.date,
              category: 'income',
            },
          );
        } else {
          newEntities.push(
            {
              name: obj.country.value,
              indicator: obj.value,
              id: obj.countryiso3code,
              date: obj.date,
              category: 'region',
            },
          );
        }
      });
      return {
        ...state,
        entities: newEntities,
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
