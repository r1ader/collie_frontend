import React, { Component } from 'react'
import { connect } from 'dva'
import { Button, Modal } from 'antd'
import MonacoEditor from 'react-monaco-editor'

class Index extends Component {
  constructor (props) {
    super(props)
    this.dispatch = this.props.dispatch
    this.reloadFuncs = this.props.reloadFuncs
    this.handleSave = this.props.handleSave
    this.state = {
      pagination: {},
      tableLoading: false,
      sorter: {},
      filters: {}
    }
  }

  handelOk = () => {
    this.setState({ waiting: true })
    this.dispatch({
      type: 'func/runFunc',
      payload: {
        data: this.state.testInput,
        id: this.props.path
      },
      callback: (result => {
        this.setState({ testResult: result, waiting: false })
      })
    })
  }

  handleClick = () => {
    this.setState({
      visible: true,
      testInput: this.props.testInput
    }, () => {
      if (this.props.runOnVisible) {
        this.handelOk()
      }
    })
  }

  render () {
    return [
      <Button id={this.props.text === '测试' ? 'testButton' : 'debugButton'} key={'button'} onClick={() => {
        if (this.props.onClick && _.isFunction(this.props.onClick)) {
          this.props.onClick(this.handleClick)
        } else {
          this.handleClick()
        }
      }}>{this.props.text}</Button>,
      <Modal
        width={'90vw'}
        key={'modal'}
        style={{ height: 500 }}
        visible={this.state.visible}
        title={this.props.title}
        confirmLoading={this.state.waiting}
        onCancel={() => {
          this.setState({ visible: false, testResult: undefined })
        }}
        onOk={this.handelOk}
        okText={this.props.text}
      >
        <div
          className={'rowDivBetween'}
          style={{ padding: 5 }}
        >
                <span style={{
                  fontSize: '16px',
                  fontWeight: 'bolder'
                }}>输入：</span>
          {
            this.props.path !== 'debug' && <Button onClick={() => {
              this.handleSave(this.props.path, { testInput: this.state.testInput }, this.reloadFuncs)
            }}>保存测试用例</Button>
          }
        </div>
        <div style={{ height: '200px' }}>
          <MonacoEditor
            language={'json'}
            theme={'vs'}
            options={{ fontSize: 14 }}
            value={JSON.stringify(this.state.testInput, null, 2) || ''}
            onChange={(text) => {
              try {
                const data = JSON.parse(text)
                this.setState({ testInput: data })
              } catch (e) {

              }
            }}
          />
        </div>
        <h3>输出：</h3>
        <div style={{ height: '200px' }}>
          <MonacoEditor
            language={'json'}
            theme={'vs'}
            options={{ fontSize: 14 }}
            value={JSON.stringify(this.state.testResult, null, 2) || ''}
          />
        </div>
      </Modal>
    ]
  }
}

export default connect(state => state)(Index)
