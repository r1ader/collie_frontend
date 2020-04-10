import {
  ajaxGetIssueList,
  ajaxUpdateIssueList,
} from '../../services/common'

export default {
  namespace: 'issue',

  state: {
    issueList: [],
    issueListIndex: 1,
    issueListTotal: 0
  },

  subscriptions: {},

  effects: {
    * actionGetIssueList ({ payload, callback }, { call, put }) {
      payload = payload || {}
      let request = ajaxGetIssueList.getInstance().execute({ data: payload })
      let response = yield call(request)
      for (let index in response.data.result) {
        let issue = response.data.result[index]
        let articleContentDemand = issue.articleContentDemand
        if ( typeof articleContentDemand === 'undefined' ) {
          issue["articleContentDemand1"] = ['']
        } else if ( typeof articleContentDemand === 'string' ) {
          issue["articleContentDemand1"] = [articleContentDemand]
        } else {
          for (let i in articleContentDemand) {
            const demand = articleContentDemand[i]
            i = parseInt(i) + 1
            issue["articleContentDemand"+i] = demand
          }
        }
      }
      console.log('issueList', response.data.result)
      yield put({
        type: 'updateManyState',
        payload: {
          issueList: response.data.result,
          issueListIndex: response.data.pageIndex,
          issueListTotal: response.data.total,
        }
      })
      if (callback) {
        callback()
      }
    },
    * actionUpdateIssueList ({ payload, callback }, { call, put }) {
      let request = ajaxUpdateIssueList.getInstance().execute({ data: payload })
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
