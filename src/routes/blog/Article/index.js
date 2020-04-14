import React, { Component } from 'react'
import { connect } from 'dva'
import { PageHeader, Button, message, Input, Icon, Tag, Select } from 'antd'
import styles from './index.css'
import MonacoEditor from 'react-monaco-editor'

var marked = require('marked')

class Index extends Component {
  constructor (props) {
    super(props)
    this.dispatch = this.props.dispatch
    this.state = {
      mode: 'view',
      content: '',
      markedcontent: ''
    }
  }

  componentDidMount () {
    if (this.props.match.path.indexOf('edit') > -1) {
      this.setState({ mode: 'edit' })
    }
    const articleId = this.props.match.params.article_id
    this.dispatch({
      type: 'func/runFunc',
      payload: {
        data: {
          id: parseInt(articleId)
        },
        id: 'get_article'
      },
      callback: (result => {

        console.log(this.props.match)
        console.log(result)
        this.setState({ ...result['items'][0] })
      })
    })
  }

  markdownLoader = (content) => {
    let markedcontent = marked(content)
    const reg = /\<code\s?(class\=\"lang\-(.+?)\")?\>([\s\S]+?)<\/code\>/
    const codes = []
    while (reg.test(markedcontent)) {
      codes.push(
        {
          language: reg.exec(markedcontent)[2],
          content: reg.exec(markedcontent)[3]
        }
      )
      markedcontent = markedcontent.replace(reg, '$_cO_dE')
    }
    codes.map(code => {
      let content = code.content
      let language = [
        'javascript',
        'html',
        'python',
        'json',
      ].indexOf(code.language) > -1 ? code.language : 'javascript'
      content = content.replace(/&#39;/g, '\'')
      content = content.replace(/&quot;/g, '"')
      content = content.replace(/&lt;/g, '<')
      content = content.replace(/&gt;/g, '>')
      markedcontent = markedcontent.replace('$_cO_dE',
        `<code class="hljs cs">${hljs.highlight(language, content).value}</code>`
      )
    })
    return markedcontent
  }

  get renderTitleEditor () {
    if (!this.state.editTitleing) {
      return <div>
        <span>{this.state.title}</span>
        {
          this.state.mode === 'edit' && <Icon onClick={() => {
            this.setState({ editTitleing: true })
          }} style={{ marginLeft: 5, cursor: 'pointer', color: '#1d7eb8' }} type={'edit'}/>
        }
      </div>
    } else {
      return <Input
        value={this.state.title}
        onPressEnter={() => {
          this.setState({ editTitleing: false })
        }}
        onChange={(text) => {
          this.setState({ title: text.target.value })
        }}/>
    }
  }

  get renderTags () {
    if (this.state.editTagsing) {
      return <Select
        dropdownStyle={{ display: 'none' }}
        value={this.state.tags || []}
        mode={'tags'}
        onChange={(value) => {
          console.log(value)
          this.setState({ tags: value })
        }}
        onBlur={() => {
          this.setState({ editTagsing: false })
        }}
      />
    } else {
      return <div>
        {
          _.isArray(this.state.tags) && this.state.tags.map((tag, index) => {
            return <Tag key={index}>{tag}</Tag>
          })
        }
        {this.state.mode === 'edit' && <Icon onClick={() => {
          this.setState({ editTagsing: true })
        }} style={{ fontSize: 20, marginLeft: 5, cursor: 'pointer', color: '#1d7eb8' }} type={'edit'}/>}
      </div>
    }
  }

  render () {
    return (
      <div className={styles.mainCoter}>
        <PageHeader
          title={this.renderTitleEditor}
          subTitle={this.renderTags}
          extra={this.state.mode === 'edit' ? [
            <a href={`/#/blog/${this.props.match.params.article_id}`}><Button key={'back'}>返回</Button></a>,
            <Button loading={this.state.saving} key={'save'} onClick={() => {
              this.setState({ saving: true })
              const articleId = this.props.match.params.article_id
              this.dispatch({
                type: 'func/runFunc',
                payload: {
                  data: {
                    id: parseInt(articleId),
                    data: {
                      content: this.state.content,
                      title: this.state.title,
                      tags: this.state.tags
                    }
                  },
                  id: 'update_article'
                },
                callback: (result => {
                  this.setState({ saving: false })
                  message.success('保存成功')
                })
              })
            }}>保存</Button>
          ] : []}
        />
        <div className={styles.bodyCoter} style={this.state.mode === 'edit' ? { maxWidth: 2000 } : {}}>
          {this.state.mode === 'edit' && <div style={{ flex: 1 }}>
            <MonacoEditor
              language={'markdown'}
              theme={'vs'}
              options={{ fontSize: 14 }}
              value={this.state.content || ''}
              onChange={(text) => {
                this.setState({
                  content: text,
                  markedcontent: marked(text)
                })
                console.log()
              }}
            />
          </div>}
          <div style={{ maxWidth: 1000, flex: 1 }}>
            <div dangerouslySetInnerHTML={{ __html: this.markdownLoader(this.state.content) }}/>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => state)(Index)
