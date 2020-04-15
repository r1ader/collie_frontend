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
    this.dispatch({
      type: 'func/runFunc',
      payload: {
        data: {},
        id: 'get_article'
      },
      callback: (result => {
        this.setState({ articles: result['items'] })
      })
    })
  }

  render () {
    const articles = this.state.articles || []
    return (
      <div className={styles.mainCoter}>
        <div>
          <PageHeader
            title={'文章列表'}
          />
        </div>
        <div style={{ padding: 20 }}>
          {articles.map((article, index) => {
            return <div onClick={() => {
              this.props.history.push(`#/blog/${article.id}`)
            }} className={styles.overview} key={index}>
              <a href={`/#/blog/${article.id}`} className={styles.title}>{article.title}</a>
              <div className={styles.content}>{article.content.slice(1, 200)}...</div>
            </div>
          })}
        </div>
      </div>
    )
  }
}

export default connect(state => state)(Index)
