import React, { Component } from 'react'
import { connect } from 'dva'
import { PageHeader, Button, message, Input, Icon, Tag, Select, Modal } from 'antd'
import styles from './index.css'
import KeyAccess from './KeyAccess'

class Index extends Component {
  constructor (props) {
    super(props)
    this.dispatch = this.props.dispatch
    this.state = {
    }
  }

  get renderAccess () {
    return <Modal
      footer={null}
      onCancel={() => {
        this.setState({ accessVisible: false })
      }}
      title={'Access'}
      visible={this.state.accessVisible}
    >
      <KeyAccess
        onAccess={(key) => {
          if (key === '963') {
            this.setState({ accessVisible: false })
            this.dispatch({
              type: 'authority/actionUpdateRole',
              payload: {
                role: 'admin'
              }
            })
          } else {
            message.error('密码错误')
          }
        }}
      />
    </Modal>
  }

  render () {
    return (
      <div className={styles.mainCoter}>
        <div className={styles.mainShower}>
          Welcome
        </div>
        <div onClick={() => {
          this.props.history.push('/blog_article')
        }} className={styles.mainShower}>
          BLOG
        </div>
        <div
          onClick={() => {
            this.setState({ accessVisible: true })
          }}
          className={styles.mainShower}>
          {this.props.authority.role || 'ACCESS'}
        </div>
        {this.renderAccess}
      </div>
    )
  }
}

export default connect(state => state)(Index)
