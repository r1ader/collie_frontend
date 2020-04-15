import React, { Component } from 'react'

class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {
      path: []
    }
  }

  componentDidMount () {
    const svgCoter = document.querySelector('#KeyAccessSvg')
    const { left, top } = svgCoter.getClientRects()[0]
    this.setState({
      svgLeft: left,
      svgTop: top,
    })
    svgCoter.addEventListener('touchstart', (e) => {
      const startKey = e.target.key
      this.setState({ path: [startKey] })
    })
    svgCoter.addEventListener('touchend', (e) => {
      const key = this.state.path.map(o => o + 1).join('')
      if (key && _.isFunction(this.props.onAccess)) {
        this.props.onAccess(key)
      }
      this.setState({ path: [] })
    })
    svgCoter.addEventListener('touchmove', (e) => {
      const scX = e.touches[0].clientX
      const scY = e.touches[0].clientY
      this.setState({
        clientX: scX,
        clientY: scY
      })
      const realTarget = document.elementFromPoint(scX, scY)
      if (realTarget.key) {
        if (this.state.path.indexOf(realTarget.key) === -1) {
          this.setState({
            path: this.state.path.concat(realTarget.key)
          })
        }
      }
    })
    Array.from(svgCoter.childNodes).slice(2).map((node, index) => {
      node.key = index
    })
  }

  render () {
    const { path, clientX, clientY, svgLeft, svgTop } = this.state
    let pathD = ''
    path.map((point, index) => {
      if (index === 0) {
        pathD += 'M '
      } else {
        pathD += 'L '
      }
      pathD += (((point) % 3 + 1) * 100 - 50).toString() + ' '
      pathD += (Math.floor((point) / 3) * 100 + 50).toString() + ' '
    })
    let pathWait = ''
    if (path.length > 0) {
      const lastPoint = path[path.length - 1]
      pathWait = 'M '
      pathWait += (((lastPoint) % 3 + 1) * 100 - 50).toString() + ' '
      pathWait += (Math.floor((lastPoint) / 3) * 100 + 50).toString() + ' '
      pathWait += 'L '
      pathWait += Math.floor(clientX - svgLeft).toString() + ' '
      pathWait += Math.floor(clientY - svgTop).toString() + ' '
    }

    return (
      <div>
        <svg height={300} id={'KeyAccessSvg'} xmlns="http://www.w3.org/2000/svg" version="1.1">
          <path d={pathD} strokeLinecap="round" strokeLinejoin="round" stroke="#d1d1d1a1"
                strokeWidth="30" fill="none"/>
          <path style={{ zIndex: -1 }} d={pathWait} strokeLinecap="round" strokeLinejoin="round" stroke="#d1d1d1a1"
                strokeWidth="30" fill="none"/>
          <circle style={{ zIndex: 1 }} cx="50" cy="50" r="20" stroke="#f0f0f0" strokeWidth="10" fill="#fafafa"/>
          <circle style={{ zIndex: 1 }} cx="150" cy="50" r="20" stroke="#f0f0f0" strokeWidth="10" fill="#fafafa"/>
          <circle style={{ zIndex: 1 }} cx="250" cy="50" r="20" stroke="#f0f0f0" strokeWidth="10" fill="#fafafa"/>

          <circle style={{ zIndex: 1 }} cx="50" cy="150" r="20" stroke="#f0f0f0" strokeWidth="10" fill="#fafafa"/>
          <circle style={{ zIndex: 1 }} cx="150" cy="150" r="20" stroke="#f0f0f0" strokeWidth="10" fill="#fafafa"/>
          <circle style={{ zIndex: 1 }} cx="250" cy="150" r="20" stroke="#f0f0f0" strokeWidth="10" fill="#fafafa"/>

          <circle style={{ zIndex: 1 }} cx="50" cy="250" r="20" stroke="#f0f0f0" strokeWidth="10" fill="#fafafa"/>
          <circle style={{ zIndex: 1 }} cx="150" cy="250" r="20" stroke="#f0f0f0" strokeWidth="10" fill="#fafafa"/>
          <circle style={{ zIndex: 1 }} cx="250" cy="250" r="20" stroke="#f0f0f0" strokeWidth="10" fill="#fafafa"/>
        </svg>
      </div>
    )
  }
}

export default Index
