import React, { Component } from 'react'
import { Tooltip } from 'antd'

class StringCutter extends Component {
  constructor (props) {
    super(props)
  }

  getByteLen = (val) => {
    let len = 0
    for (let i = 0; i < val.length; i++) {
      let a = val.charAt(i)
      if (a.match(/[^\x00-\xff]/ig) != null) {
        len += 2
      } else {
        len += 1
      }
    }
    return len
  }

  render () {
    const childString = this.props.children
    if (this.getByteLen(childString) > this.props.maxLength) {
      return <Tooltip title={childString}>
        {childString.slice(0, Math.floor(childString.length * (this.props.maxLength / this.getByteLen(childString))))}
        {!this.props.noEllipsis && '...'}
      </Tooltip>
    } else {
      return <span>{childString}</span>
    }
  }
}

export default StringCutter
