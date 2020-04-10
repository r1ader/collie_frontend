export default class healthzChecker {
  constructor (dispatch) {
    this.dispatch = dispatch
  }

  setHealthy (event) {
    try {
      this.dispatch({
        type: 'healthz/actionUpdateHealthz',
        payload: {
          event: event,
          state: 'healthy'
        }
      })
    } catch (e) {
      console.log(e)
    }
  }
}
