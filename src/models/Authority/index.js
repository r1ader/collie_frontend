import {
  ajaxGetTimoAuthority,
  ajaxUpdateTimoAuthority
} from '../../services/common'

export default {
  namespace: 'authority',

  state: {
    authorityList: [],
    authorityListTotal: 0,
    authorityListIndex: 1
  },

  subscriptions: {},

  effects: {
    * actionGetAuthorityList ({ payload, callback }, { call, put }) {
      payload = payload || {}
      let request = ajaxGetTimoAuthority.getInstance().execute({ data: payload })
      let response = yield call(request)
      yield put({
        type: 'updateManyState',
        payload: {
          authorityList: response.data.result,
          authorityListTotal: response.data.total,
          authorityListIndex: response.data.pageIndex
        }
      })
      if (callback) {
        callback()
      }
    },
    * actionUpdateAuthorityList ({ payload, callback }, { call, put }) {
      let request = ajaxUpdateTimoAuthority.getInstance().execute({ data: payload })
      yield call(request)
      if (callback) {
        callback()
      }
    },
  },

  reducers: {
    updateState (state, { payload }) {
      const { key, val } = payload
      let _state = _.cloneDeep(state)
      _state[key] = val
      return _state
    },
    updateManyState (state, { payload }) {
      let _state = _.cloneDeep(state)
      Object.keys(payload).map(key => {
        _state[key] = payload[key]
      })
      return _state
    }
  }
}
