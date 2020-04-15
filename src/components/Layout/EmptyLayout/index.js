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

  handelRoll = () => {
    const tagHight = document.documentElement.clientHeight - 50
    const scrollTarget = tagHight
    console.log(window, tagHight)
    const pr = () => {
      const scrollNow = window.scrollY
      let length = (scrollTarget - scrollNow)
      if (Math.abs(length) > 5) {
        length /= 10
      } else if (length === 0) {
        return
      }
      window.scrollTo(0, scrollNow + length)
    }
    const timer = setInterval(pr, 16)
    setTimeout(() => {
      clearInterval(timer)
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
          {/*<div onClick={this.handelRoll} style={{ padding: 10 }}>asdf</div>*/}
        </div>
        <Content style={{ marginTop: 50, backgroundColor: 'white' }}>
          {this.props.children}
        </Content>
      </Layout>
    )
  }
}

export default withRouter(connect(state => state)(MyLayout))
