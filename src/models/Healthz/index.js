import {
  ajaxGetTimoHealthz,
  ajaxUpdateTimoHealthz
} from '../../services/common'

export default {
  namespace: 'healthz',

  state: {
    healthzList: []
  },

  subscriptions: {},

  effects: {
    * actionGetTimoHealthz ({ payload, callback }, { call, put }) {
      payload = payload || {}
      let request = ajaxGetTimoHealthz.getInstance().execute({ data: payload })
      let response = yield call(request)
      yield put({
        type: 'updateManyState',
        payload: {
          healthzList: response.data.result
        }
      })
      if (callback) {
        callback()
      }
    },
    * actionUpdateHealthz ({ payload, callback }, { call, put, select }) {
      const { event, type } = payload
      const healthzList = yield select((state) => state.healthz.healthzList)
      try {
        if (type !== 'force' && healthzList.find(o => o.event === event)['state'] !== 'waiting') {
          return
        }
      } catch (e) {
      }
      let request = ajaxUpdateTimoHealthz.getInstance().execute({ data: payload })
      yield call(request)
      if (callback) {
        callback()
      }
    }
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
