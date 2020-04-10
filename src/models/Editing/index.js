import {
  ajaxGetEditingList,
  ajaxUpdateEditingList,
  ajaxGetSocrateCarInfo
} from '../../services/common'

export default {
  namespace: 'editing',

  state: {
    editingList: [],
    editingListTotal: 0,
    editingListIndex: 1,
    editingListpageSize: 4,
    brandList: [],
    seriesList: [],
    modelList: []
  },

  subscriptions: {},

  effects: {
    * actionGetEditingList ({ payload, callback }, { call, put }) {
      payload = payload || {}
      let request = ajaxGetEditingList.getInstance().execute({ data: payload })
      let response = yield call(request)
      yield put({
        type: 'updateManyState',
        payload: {
          editingListTotal: response.data.total,
          editingListIndex: response.data.pageIndex,
          editingListpageSize: response.data.pageSize,
          editingList: response.data.result
        }
      })
      if (callback) {
        callback(response.data.result)
      }
    },
    * actionUpdateEditingList ({ payload, callback }, { call, put }) {
      let request = ajaxUpdateEditingList.getInstance().execute({ data: payload })
      yield call(request)
      if (callback) {
        callback()
      }
    },
    * acrionGetSocrateCarInfo ({ payload, callback }, { call, put }) {
      let request = ajaxGetSocrateCarInfo.getInstance().execute({ data: payload })
      let response = yield call(request)
      if (response.data.brandList) {
        yield put({
          type: 'updateManyState',
          payload: {
            'brandList': response.data.brandList
          }
        })
      }
      if (response.data.seriesList) {
        yield put({
          type: 'updateManyState',
          payload: {
            'seriesList': response.data.seriesList
          }
        })
      }
      if (response.data.modelList) {
        yield put({
          type: 'updateManyState',
          payload: {
            'modelList': response.data.modelList
          }
        })
      }
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
