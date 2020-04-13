import React from 'react'
import { Layout, Menu, Dropdown, Icon } from 'antd'
import { withRouter, Link } from 'dva/router'
import { connect } from 'dva'
import styles from './index.css'

const { Content } = Layout

class MyLayout extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    console.clear()
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
