import {
  ajaxGetMaterialList,
  ajaxUpdateMaterialList,
} from '../../services/common'

export default {
  namespace: 'material',

  state: {
    materialList: []
  },

  subscriptions: {},

  effects: {
    * actionGetMaterialList ({ payload, callback }, { call, put }) {
      payload = payload || {}
      payload['pageSize'] = 10000
      let request = ajaxGetMaterialList.getInstance().execute({ data: payload })
      let response = yield call(request)
      yield put({
        type: 'updateManyState',
        payload: {
          materialList: response.data.result
        }
      })
      if (callback) {
        callback()
      }
    },
    * actionUpdateMaterialList ({ payload, callback }, { call, put }) {
      let request = ajaxUpdateMaterialList.getInstance().execute({ data: payload })
      yield call(request)
      if (callback) {
        callback()
      }
    }
  },

  reducers: {
    addMaterial (state, { payload }) {
      const { materials } = payload
      let _state = _.cloneDeep(state)
      const existIds = _state.materialList.map(o => o.id)
      _state.materialList = _state.materialList.concat(materials.filter(o => existIds.indexOf(o.id) === -1))
      return _state
    },
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
