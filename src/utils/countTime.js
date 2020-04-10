import moment from 'moment'

class Clock {
  constructor () {
    this.lastTime = moment().valueOf()
  }

  dap (message) {
    if (message) {
      console.log(moment().valueOf() - this.lastTime, message)
    } else {
      console.log(moment().valueOf() - this.lastTime)
    }
    this.lastTime = moment().valueOf()
  }
}

export default Clock
