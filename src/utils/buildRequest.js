import fetch from 'dva/fetch'
import { notification, message } from 'antd'
import { isFunction } from './minx'
import cookies from 'react-cookies'

function isJSON (jsonString) {
  try {
    /* eslint no-constant-condition: 0 */
    if (typeof (JSON.parse(jsonString) === 'object')) {
      return true
    }
  } catch (e) {

  }
  return false
}

function checkStatus (response) {
  // if (window.location.hostname.indexOf('localhost') > -1 || window.location.hostname.indexOf('127.0.0.1') > -1) {
  //   // window.location.replace("http://" + window.location.host + data.url.replace(/(api\/v1)\/(.*)$/, "proxy/$2"));
  //   const COOKIE = '_ga=GA1.2.2092037943.1562140647; UM_distinctid=16bc233837072b-07f16c7cc3ddee-37677e02-13c680-16bc2338371c15; code=600099; session_id=skey/600099; skey=9t6LX5O0Oy7c2O-VruOX4uHpBQWSYtWU; username=aGV5aWZhbg==; realname=5L2V5LiA5Yeh; thumb=/api/v1/avatar/default; hd=/api/v1/avatar/default; avatar=/api/v1/avatar/default; avatar_hd=/api/v1/avatar/default; SERVERID=77d50f83294194ee2a79502cdd44e390|1577185185|1577185182'
  //   cookies.remove('session')
  //   cookies.remove('SERVERID')
  //   COOKIE.split('; ').map(pair => {
  //     const key = pair.split('=')[0]
  //     const value = pair.slice(key.length + 1)
  //     console.log('setCookie', key, value)
  //     cookies.save(key, decodeURIComponent(value), {
  //       maxAge: 1000000,
  //       path: '/'
  //     })
  //   })
  // }
  if (response.status >= 200 && response.status < 300) {
    return parseJSON(response, true)
  } else if (response.status === 401) {
    parseJSON(response, true).then(data => {
      if (process.env.NODE_ENV === 'development') {
        // window.location.replace("http://" + window.location.host + data.url.replace(/(api\/v1)\/(.*)$/, "proxy/$2"));
        cookies.remove('session')
        cookies.remove('SERVERID')
        console.log('setCookie')
        cookies.save('session', '.eJw9zUtOxDAQhOG79DoLv9p25yoIRZV2G0YgMnLMAo3m7gxIsKx_Ud-NXi7zHft24HO-bvN4sw9abwRVO8-_TcxInIv60lLq1bBriJ59DeYDWxZuQTKn5tiFKCk2iMDBtdq5odBCOgzT2oZJq-fkUmTOvNCwPuz8p6mGDjGBpm6m4qJy2IN49JL7Q8sVEBdYs-9aOSaU6FoEoljohR_UqcfVaH0iXC_0vNDv9Ta_fiLthmGD7vdvsVNL-A.D-orvA.NF0W2-rOLbei5IgsyIrSO-dGFDI;', {
          maxAge: 1000000,
          path: '/'
        })
        cookies.save('code', '600099', {
          maxAge: 1000000,
          path: '/'
        })
        cookies.save('session_id', 'skey/600099', {
          maxAge: 1000000,
          path: '/'
        })
        cookies.save('skey', '9t6LX5O0Oy7c2O-VruOX4uHpBQWSYtWU', {
          maxAge: 1000000,
          path: '/'
        })
        cookies.save('username', 'aGV5aWZhbg==', {
          maxAge: 1000000,
          path: '/'
        })
        cookies.save('realname', '5L2V5LiA5Yeh', {
          maxAge: 1000000,
          path: '/'
        })
        cookies.save('SERVERID', '00d7a6086bca9f9b9948b02c67ae5f35|1561469728|1561469724', {
          maxAge: 1000000,
          path: '/'
        })
      } else {
        window.location.replace(`https://owl.aidigger.com/login?next=https://${window.location.hostname}/collie/manage/project`)
      }
    })
  } else {
    return parseJSON(response, false)
  }
}

function parseJSON (response, success) {
  return response.text().then(function (text) {
    if (isJSON(text)) {
      text = JSON.parse(text)
    }
    if (!success) {
      return Promise.reject(text)
    } else {
      return Promise.resolve(text)
    }
  })
}

class BuildRequest {
  constructor (config) {
    this.config = config
  }

  static check (config) {
    if (!(config.url || config.method)) {
      console.error('need url and method')
      return false
    } else {
      return true
    }
  }

  static getName (config) {
    return config.url + config.method
  }

  execute (params) {
    let obj = {}
    for (let key in params) {
      obj[key] = params[key]
    }
    let param = obj || {}
    let { url, method } = this.config
    let options = {}
    if (method && typeof method === 'string') {
      options.method = method.toUpperCase()
    }
    let URL = url.replace(/(.*?)(\{.*?\})(.*?)/g, function (match, $1, $2, $3) {
      let value = ''
      let property = $2.slice(1, $2.length - 1)
      if (param.hasOwnProperty(property)) {
        value = param[property]
        delete param[property]
        return $1 + value + $3
      } else {
        return $1 + $2 + $3
      }
    })
    if (URL.indexOf('{') !== -1) {
      let needValue = URL.slice(URL.indexOf('{') + 1, URL.indexOf('}'))
      return console.error('need params value: ' + needValue)
    }
    for (let keys in param) {
      if (keys === 'callback' && isFunction(param[keys])) {
        this.callback = param[keys]
      } else if (keys === 'finally' && isFunction(param[keys])) {
        this.finally = param[keys]
      } else if (keys !== 'data') {
        // let value = encodeURIComponent(JSON.stringify(param[keys]));
        if (URL.indexOf('?') === -1) {
          URL = URL + '?' + keys + '=' + param[keys]
        } else {
          URL = URL + '&' + keys + '=' + param[keys]
        }
      } else {
        if (params[keys].contentType === 'formdata') {
          delete params[keys].contentType
          let formData = new FormData()
          for (let key in params[keys]) {
            formData.append(key, params[keys][key])
          }
          options = {
            ...options,
            ...{
              body: formData
            }
          }
        } else {
          options = {
            ...options,
            ...{
              credentials: 'include',
              body: JSON.stringify(param[keys]),
              headers: {
                'Content-Type': 'application/json',
                'Cookie': decodeURIComponent(document.cookie)
              },
            }
          }
        }
      }
    }

    if (process.env.NODE_ENV === 'development') {
      // 兼容调caster的接口
      if (URL.indexOf('path') === -1 && URL.indexOf('interface') === -1 && URL.indexOf('caster') === -1 && URL.indexOf('kge') === -1 && URL.indexOf('mock') === -1) {
        URL = '/proxy' + URL
      }
    } else {
        URL = 'http://120.26.42.184/api/v1' + URL
    }

    let _this = this
    return function () {
      return fetch(URL, options).then(checkStatus)
        .then(data => {
          if (_this.callback && isFunction(_this.callback)) {
            _this.callback(data)
          }
          return data
        }).catch(err => {
          if (err.message) {
            message.error(err.message)
          } else if (err.error) {
            message.error(err.error)
          } else {
            message.error('未知错误')
          }
          // notification['error']({
          //   message: `${err.message ? err.message : '未知错误'}`
          // })
          return false
        }).finally((data) => {
          if (_this.finally && isFunction(_this.finally)) {
            _this.finally(data)
          }
        })
    }
  }
}

export default BuildRequest
