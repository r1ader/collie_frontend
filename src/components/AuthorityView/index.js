import React, { Component } from 'react'
import { connect } from 'dva'

class AuthorityView extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    try {
      const authorityList = this.props.common.userInfo.authority_list
      const viewName = this.props.viewName
      if (authorityList.indexOf(viewName) > -1) {
        return this.props.children
      } else {
        return ''
      }
    } catch (e) {
      return ''
    }
  }
}

export default connect(state => state)(AuthorityView)
