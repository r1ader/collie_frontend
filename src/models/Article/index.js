import {
  ajaxGetMarioArticleList
} from '../../services/common'

export default {
  namespace: 'article',

  state: {
    articleList: [],
    articleListTotal: 0,
    articleListIndex: 1
  },

  subscriptions: {},

  effects: {
    * actionGetMarioArticleList ({ payload, callback }, { call, put }) {
      payload = payload || {}
      let request = ajaxGetMarioArticleList.getInstance().execute({ data: payload })
      let response = yield call(request)
      yield put({
        type: 'updateManyState',
        payload: {
          articleList: response.data.result,
          articleListTotal: response.data.total,
          articleListIndex: response.data.pageIndex
        }
      })
      if (callback) {
        callback(response.data.result)
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
