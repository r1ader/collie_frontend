import React from 'react'

// 解析query
export function analysSearchToObject (search) {
  let obj = {}
  if (search && typeof search === 'string') {
    let queryArr = search.slice(1).split('&')
    queryArr.map(item => {
      let arr = item.split('=')
      obj[arr[0]] = arr[1]
    })
  }
  return obj
}

// 生成uuid
export function getUUID (len, radix) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  var uuid = []
  radix = radix || chars.length

  if (len) {
    // Compact form
    for (let i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
  } else {
    // rfc4122, version 4 form
    var r

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (let i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r] // eslint-disable-line
      }
    }
  }

  return uuid.join('').toLocaleLowerCase()
}

// 解析时间
export function transTime (format, timestamp) {
  let isStamp = /^\d{10}$/.test(timestamp)
  var jsdate = ((isStamp) ? new Date(timestamp * 1000) : new Date((timestamp + '').replace(/-/g, '/')))
  var pad = function (n, c) {
    if ((n = n + '').length < c) {
      return new Array(++c - n.length).join('0') + n
    } else {
      return n
    }
  }
  var txtWeekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  var txtOrdin = { 1: 'st', 2: 'nd', 3: 'rd', 21: 'st', 22: 'nd', 23: 'rd', 31: 'st' }
  var txtMonths = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  var f = {
    // Day
    d: function () {
      return pad(f.j(), 2)
    },
    D: function () {
      return f.l().substr(0, 3)
    },
    j: function () {
      return jsdate.getDate()
    },
    l: function () {
      return txtWeekdays[f.w()]
    },
    N: function () {
      return f.w() + 1
    },
    S: function () {
      return txtOrdin[f.j()] ? txtOrdin[f.j()] : 'th'
    },
    w: function () {
      return jsdate.getDay()
    },
    z: function () {
      return (jsdate - new Date(jsdate.getFullYear() + '/1/1')) / 864e5 >> 0
    },

    // Week
    W: function () {
      var a = f.z()
      var b = 364 + f.L() - a
      var nd2
      var nd = (new Date(jsdate.getFullYear() + '/1/1').getDay() || 7) - 1
      if (b <= 2 && ((jsdate.getDay() || 7) - 1) <= 2 - b) {
        return 1
      } else {
        if (a <= 2 && nd >= 4 && a >= (6 - nd)) {
          nd2 = new Date(jsdate.getFullYear() - 1 + '/12/31')
          return transTime('W', Math.round(nd2.getTime() / 1000))
        } else {
          return (1 + (nd <= 3 ? ((a + nd) / 7) : (a - (7 - nd)) / 7) >> 0)
        }
      }
    },

    // Month
    F: function () {
      return txtMonths[f.n()]
    },
    m: function () {
      return pad(f.n(), 2)
    },
    M: function () {
      return f.F().substr(0, 3)
    },
    n: function () {
      return jsdate.getMonth() + 1
    },
    t: function () {
      var n
      if ((n = jsdate.getMonth() + 1) == 2) { // eslint-disable-line
        return 28 + f.L()
      } else {
        if (n & 1 && n < 8 || !(n & 1) && n > 7) { // eslint-disable-line
          return 31
        } else {
          return 30
        }
      }
    },

    // Year
    L: function () {
      var y = f.Y()
      return (!(y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0
    },
    Y: function () {
      return jsdate.getFullYear()
    },
    y: function () {
      return (jsdate.getFullYear() + '').slice(2)
    },

    // Time
    a: function () {
      return jsdate.getHours() > 11 ? 'pm' : 'am'
    },
    A: function () {
      return f.a().toUpperCase()
    },
    B: function () {
      // peter paul koch:
      var off = (jsdate.getTimezoneOffset() + 60) * 60
      var theSeconds = (jsdate.getHours() * 3600) + (jsdate.getMinutes() * 60) + jsdate.getSeconds() + off
      var beat = Math.floor(theSeconds / 86.4)
      if (beat > 1000) beat -= 1000
      if (beat < 0) beat += 1000
      if ((String(beat)).length == 1) beat = '00' + beat // eslint-disable-line
      if ((String(beat)).length == 2) beat = '0' + beat // eslint-disable-line
      return beat
    },
    g: function () {
      return jsdate.getHours() % 12 || 12
    },
    G: function () {
      return jsdate.getHours()
    },
    h: function () {
      return pad(f.g(), 2)
    },
    H: function () {
      return pad(jsdate.getHours(), 2)
    },
    i: function () {
      return pad(jsdate.getMinutes(), 2)
    },
    s: function () {
      return pad(jsdate.getSeconds(), 2)
    },

    O: function () {
      var t = pad(Math.abs(jsdate.getTimezoneOffset() / 60 * 100), 4)
      if (jsdate.getTimezoneOffset() > 0) {
        t = '-' + t
      } else {
        t = '+' + t
      }
      return t
    },
    P: function () {
      var O = f.O()
      return (O.substr(0, 3) + ':' + O.substr(3, 2))
    },

    c: function () {
      return f.Y() + '-' + f.m() + '-' + f.d() + 'T' + f.h() + ':' + f.i() + ':' + f.s() + f.P()
    },

    U: function () {
      return Math.round(jsdate.getTime() / 1000)
    }
  }

  return format.replace(/[\\]?([a-zA-Z])/g, function (t, s) {
    let ret
    if (t != s) { // eslint-disable-line
      // escaped
      ret = s
    } else if (f[s]) {
      // a date function exists
      ret = f[s]()
    } else {
      // nothing special
      ret = s
    }
    return ret
  })
}

export function isFunction (fn) {
  return Object.prototype.toString.call(fn) === '[object Function]'
}

export function delay (ms) {
  return function () {
    return new Promise(resolve => setTimeout(() => resolve(true), ms))
  }
}

// 根据字符串生成颜色
export function stringToColor (str) {
  var hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 3))
    console.log(hash)
  }
  var color = '#'
  for (let i = 0; i < 3; i++) {
    var value = (hash >> (i * 8))
    console.log(value)
    color += ('FF' + value.toString(16)).substr(-2)
    console.log(color)
  }
  return color
}

// 根据资源状态渲染文本
export const renderPlainText = (text, record) => {
  return record.state === 'active' ? (
    text
  ) : (
    <span className='dropped_row'>{text}</span>
  )
}
