import {
    ajaxPostFunc,
    ajaxGetFunc,
    ajaxRunFunc
} from '../../services/common'

import Clock from '../../utils/countTime'

export default {
    namespace: 'func',

    state: {
        funcs: []
    },

    subscriptions: {},

    effects: {
        * getFunc({payload, callback}, {call, put}) {
            payload = payload || {}
            let request = ajaxGetFunc.getInstance().execute({})
            let response = yield call(request)
            console.log('response', response)
            yield put({
                type: 'updateState',
                payload: {
                    key: 'funcs',
                    val: response['items']
                }
            })
            if (_.isFunction(callback)) {
                callback(response['items'])
            }
        },
        * saveFunc({payload, callback}, {call, put}) {
            payload = payload || {}
            let request = ajaxPostFunc.getInstance().execute({data: payload})
            let response = yield call(request)
            if (_.isFunction(callback)) {
                callback()
            }
        },
        * runFunc({payload, callback}, {call, put}) {
            const {data, id} = payload
            let request = ajaxRunFunc.getInstance().execute({data: data, id: id})
            let response = yield call(request)
            if (_.isFunction(callback)) {
                callback(response)
            }
        },
    },

    reducers: {
        updateState(state, {payload}) {
            const {key, val} = payload
            let _state = _.cloneDeep(state)
            _state[key] = val
            return _state
        },
        updateManyState(state, {payload}) {
            let _state = _.cloneDeep(state)
            Object.keys(payload).map(key => {
                _state[key] = payload[key]
            })
            return _state
        }
    }
}
