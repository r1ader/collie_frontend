import React from 'react'
import { Layout, Menu, Dropdown, Icon, Avatar, Modal, Input } from 'antd'
import { withRouter, Link } from 'dva/router'
import { connect } from 'dva'
import styles from './index.css'
import classNames from 'classnames'
import cookie from 'react-cookies'

import AuthorityView from '../../AuthorityView'

const { Header, Content } = Layout

class MyLayout extends React.Component {
  menu = (
    <Menu>
      <Menu.Item>
        <a onClick={this.userLogout}>注销</a>
      </Menu.Item>
    </Menu>
  )

  constructor (props) {
    super(props)
    this.userLogout = this.userLogout.bind(this)
    this.state = {
      visible: false,
      currentTemplateName: ''
    }
  }

  componentDidMount () {
    console.clear()
  }

  userLogout () {
    window
      .fetch('https://owl.aidigger.com/api/v1/session', {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-store',
        credentials: 'include'
      })
      .then(() => {
        window.location.href = `https://owl.aidigger.com/login?next=${
          window.location.href
          }`
      })
  }

  handleClick (e) {
    if (e.key === 'template') {
      window.localStorage.removeItem('selectedParagraphList')
    }
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  handleOk = () => {
    this.refactorName(this.state.currentTemplateName)
    this.setState({
      visible: false
    })
  }

  userLogout () {
    cookie.remove('session', { path: '/' })
    setTimeout(() => {
      window.location.href = `https://owl.aidigger.com/login?next=https://${window.location.hostname}`
    }, 1000)
  }

  render () {

    return (
      <Layout>
        <div
          className={styles.headerTop}
          style={{ position: 'fixed', zIndex: 1000, width: '100%', top: 0 }}
        >
          <div className={'rowDivStart'}>
            <div className={styles.title}
                 onClick={() => {
                   this.props.history.push('/')
                 }}
            >r1ader
            </div>
          </div>
          {
            this.state.realname &&

            <Dropdown overlay={<Menu>
              <Menu.Item>
                <a onClick={this.userLogout} style={{ width: 150 }}>注销</a>
              </Menu.Item>
            </Menu>}>
              <a style={{ fontSize: 15, color: 'white', paddingRight: 20 }} href='#'>
                {this.state.realname} <Icon type='down'/>
              </a>
            </Dropdown>
          }
        </div>
        <Content style={{ marginTop: 50, backgroundColor: 'white' }}>
          {this.props.children}
        </Content>
      </Layout>
    )
  }
}

export default withRouter(connect(state => state)(MyLayout))
