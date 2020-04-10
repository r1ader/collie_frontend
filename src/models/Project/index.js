import {
  ajaxGetProjectList,
  ajaxUpdateProjectList,
  ajaxGetSocrateCarInfo
} from '../../services/common'

import Clock from '../../utils/countTime'

export default {
  namespace: 'project',

  state: {
    userInfo: {},
    projectList: [],
    projectListTotal: 0,
    projectListIndex: 1,
  },

  subscriptions: {},

  effects: {
    * actionGetProjectList ({ payload, callback }, { call, put }) {
      payload = payload || {}
      let request = ajaxGetProjectList.getInstance().execute({ data: payload })
      let response = yield call(request)
      yield put({
        type: 'updateManyState',
        payload: {
          projectListTotal: response.data.total,
          projectListIndex: response.data.pageIndex,
          projectList: response.data.result,
        }
      })
      if (callback) {
        callback(response.data.result)
      }
    },
    * actionUpdateProjectList ({ payload, callback }, { call, put }) {
      let request = ajaxUpdateProjectList.getInstance().execute({ data: payload })
      yield call(request)
      if (callback) {
        callback()
      }
    },
    * acrionGetSocrateCarInfo ({ payload, callback }, { call, put }) {
      let request = ajaxGetSocrateCarInfo.getInstance().execute({ data: payload })
      let response = yield call(request)
      if (callback) {
        callback(response.data)
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
