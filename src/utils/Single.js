const nameSpace = {}

class Single {
  constructor (config, className) {
    this.config = config
    this.className = className
  }

  getInstance () {
    let className = this.className
    let config = this.config
    let name = ''
    if (className.check) {
      if (className.check(config)) {
        name = className.getName(config)
      } else {
        return false
      }
    } else {
      name = className.getName(config)
    }
    if (nameSpace[name]) {
      return nameSpace[name]
    } else {
      return new className(config) // eslint-disable-line
    }
  }
}

export default Single
