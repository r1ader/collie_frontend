import {
  ajaxGetTimoConfig,
  ajaxUpdateTimoConfig,
  ajaxGetUserInfo,
  ajaxGetAllMember
} from '../../services/common'

export default {
  namespace: 'common',

  state: {
    userInfo: {},
    issueDisplayConfig: [],
    authorityList: [],
    roleList: [],
    memberList: []
  },

  subscriptions: {},

  effects: {
    * actionGetConfig ({ payload }, { call, put }) {
      let request = ajaxGetTimoConfig.getInstance().execute({ data: {} })
      let response = yield call(request)
      try {
        if (response.data.result) {
          for (let config of response.data.result) {
            if (config['concept'] === 'issue') {
              let displayConfig = config['displayConfig']
              let contentDemand = []
              for (let index in displayConfig) {
                if (displayConfig[index].title === '文章内容要求') {
                  for (let i=1; i<=4; i++) {
                    let newElem = _.cloneDeep(displayConfig[index])
                    for (let k in newElem) {
                      if (typeof newElem[k] === 'string' ) {
                        newElem[k] += i
                      }
                    }
                    contentDemand.push(newElem)
                  }
                  displayConfig.splice(index, 1)
                  for (let i in contentDemand) {
                    const addIndex = parseInt(index) + parseInt(i)
                    displayConfig.splice(addIndex, 0, contentDemand[i])
                  }
                }
              }
              
              console.log('displayConfig', displayConfig)
              yield put({
                type: 'updateManyState',
                payload: {
                  issueDisplayConfig: displayConfig,
                  templateFile: config['templateFile']
                }
              })
            } else if (config['concept'] === 'authorityList') {
              yield put({
                type: 'updateManyState',
                payload: {
                  authorityList: config['data']
                }
              })
            } else if (config['concept'] === 'role') {
              yield put({
                type: 'updateManyState',
                payload: {
                  roleList: config['data']
                }
              })
            } else {
              yield put({
                type: 'updateState',
                payload: {
                  key: config['concept'],
                  val: config['data']
                }
              })
            }
          }
        }
      } catch (e) {
        console.log(e)
      }
    },
    * actionUpdateConfig ({ payload, callback }, { call, put }) {
      let request = ajaxUpdateTimoConfig.getInstance().execute({ data: payload })
      yield call(request)
      if (callback) {
        callback()
      }
    },
    * actionGetUserInfo ({ payload, callback }, { call, put }) {
      payload = payload || {}
      let request = ajaxGetUserInfo.getInstance().execute({ data: payload })
      const response = yield call(request)
      try {
        yield put({
          type: 'updateManyState',
          payload: {
            userInfo: response.data.result
          }
        })
        const realname = response.data.result.realname
        if (callback) {
          callback(realname)
        }
      } catch (e) {
        if (callback) {
          callback(undefined)
        }
      }
    },
    * actionUpdateDisplayConfig ({ payload, callback }, { call, put, select }) {
      const issueDisplayConfig = yield select((state) => state.common.issueDisplayConfig)
      let request = ajaxUpdateTimoConfig.getInstance().execute({
        data: {
          action: 'update',
          data: {
            id: 1,
            displayConfig: issueDisplayConfig
          }
        }
      })
      yield call(request)
      if (callback) {
        callback()
      }
    },
    * actionGetAllMember ({ payload, callback }, { call, put, select }) {
      let request = ajaxGetAllMember.getInstance().execute({
        data: {}
      })
      const response = yield call(request)
      yield put({
        type: 'updateManyState',
        payload: {
          memberList: response.data.result
        }
      })
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
