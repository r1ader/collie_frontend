import React, { Component } from 'react'
import { connect } from 'dva'
import { PageHeader, Button, message, Input, Icon, Tag, Select } from 'antd'
import styles from './index.css'

class Index extends Component {
  constructor (props) {
    super(props)
    this.dispatch = this.props.dispatch
    this.state = {}
  }

  handleScroll = (e) => {

  }

  componentWillMount () {
    window.addEventListener('scroll', this.handleScroll)
  }

  render () {
    return (
      <div className={styles.mainCoter}>
        <div className={styles.mainShower}>
          ASDF
        </div>
        <div className={styles.mainShower}>
          BJFH
        </div>
        <div className={styles.mainShower}>
          lkik
        </div>
      </div>
    )
  }
}

export default connect(state => state)(Index)
