export function saveFile (url, filename) {
  // let r = new XMLHttpRequest()
  // r.open('GET', url, false)
  // r.overrideMimeType('text/plain; charset=x-user-defined')
  // r.send(null)
  // let data = r.responseText
  // let arr = new Uint8Array(data.length)
  // for (let i = 0, l = data.length; i < l; i++) {
  //   arr[i] = data.charCodeAt(i)
  // }
  // let imgblob = new Blob([arr.buffer])
  // let reader = new FileReader()
  // reader.readAsDataURL(imgblob)
  // reader.onload = function (e) {
  //   let imgBase64 = ('data:image/jpeg;base64,' + this.result.split(',')[1])
  // let fileName = '123.' + imgType

  // let saveLink = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
  // saveLink.href = url
  // // saveLink.target = '_blank'
  // saveLink.download = filename
  // let event = document.createEvent('MouseEvents')
  // event.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, true, false, 0, null)
  // saveLink.dispatchEvent(event)
  // }
  const elt = document.createElement('a')
  elt.setAttribute('href', url)
  elt.setAttribute('target', '_blank')
  elt.setAttribute('download', filename)
  elt.style.display = 'none'
  document.body.appendChild(elt)
  elt.click()
  document.body.removeChild(elt)
}
