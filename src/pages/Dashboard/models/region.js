import { queryRegions } from '../../../services/region';

export default {
  namespace: 'region',

  state: {
    list: [],
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryRegions);
      yield put({
        type: 'saveRegions',
        payload: response,
      });
    },
  },

  reducers: {
    saveRegions(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};
