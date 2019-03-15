import { queryTanks } from '../../../services/tank';

export default {
  namespace: 'tank',

  state: {
    list: [],
  },

  effects: {
    *fetch({payload}, { call, put }) {

      const response = yield call(queryTanks, payload.region_id);
      yield put({
        type: 'saveTanks',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },

  reducers: {
    saveTanks(state, action) {

      return {
        ...state,
        list: action.payload,
      };
    },
  },
};
