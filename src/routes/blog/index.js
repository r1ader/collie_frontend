import React, { Component } from 'react'
import { connect } from 'dva'
import { PageHeader, Button, message } from 'antd'
import styles from './index.css'

var marked = require('marked')
import MonacoEditor from 'react-monaco-editor'

class Index extends Component {
  constructor (props) {
    super(props)
    this.dispatch = this.props.dispatch
    this.state = {
      content: '',
      markedcontent: ''
    }
  }

  componentDidMount () {
    this.setState({
      content: '# hello 发布\n' +
        '\n' +
        '你说汉城\n' +
        '\n' +
        '\n' +
        '`好`\n' +
        '\n' +
        '<strong style="color: red">不行</strong>\n' +
        '\n' +
        '```\n' +
        'var a = 12\n' +
        '```'
    })

    setTimeout(() => {

      console.log(this.props)
    }, 0)
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

  render () {
    return (
      <div style={{}}>
        <PageHeader
          title={'创建'}
          extra={[
            <Button key={'save'} onClick={() => {
              const articleId = this.props.match.params.article_id
              this.dispatch({
                type: 'func/runFunc',
                payload: {
                  data: {
                    id: parseInt(articleId),
                    content: this.state.content
                  },
                  id: 'update_article'
                },
                callback: (result => {
                  message.success('保存成功')
                })
              })
            }}>保存</Button>
          ]}
        />
        <div className={styles.bodyCoter} style={{
          display: 'flex',
          flexDirection: 'row',
          height: 'calc(100vh - 100px)'
        }}>
          <div style={{ flex: 1 }}>
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
          </div>
          <div style={{ flex: 1 }}>
            <div dangerouslySetInnerHTML={{ __html: this.markdownLoader(this.state.content) }}/>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => state)(Index)
