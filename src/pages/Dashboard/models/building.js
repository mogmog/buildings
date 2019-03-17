import { queryBuildings } from '../../../services/building';

export default {
  namespace: 'building',

  state: {
    list: [],
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryBuildings);
      yield put({
        type: 'saveBuildings',
        payload: response,
      });
    },
  },

  reducers: {
    saveBuildings(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};
