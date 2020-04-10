import React, { Component } from 'react'
import { Button, Modal, Input } from 'antd'

class ModelEditor extends Component {
  constructor (props) {
    super(props)
    this.state = {
      createModelVisable: false,
      createModelLoading: false,
      data: {}
    }
  }

  componentDidMount () {
    if (this.props.initialData) {
      this.setState({
        data: this.props.initialData
      })
    }
  }

  render () {
    return (
      <div style={{ display: 'inline-block' }}>
        <div onClick={() => {
          this.setState({
              createModelVisable: true,
              data: this.props.initialData
          })
        }}>
          {this.props.children}
        </div>
        <Modal
          confirmLoading={this.state.createModelLoading}
          destroyOnClose
          title={this.props.title}
          visible={this.state.createModelVisable || this.props.visible}
          onOk={() => {
            this.setState({ createModelLoading: true })
            this.props.onConfirme(this.state.data, () => {
              this.setState({
                createModelLoading: false,
                createModelVisable: false,
              })
              if (this.props.clearAfterOk) {
                this.setState({
                  data: {}
                })
              }
            })
          }}
          onCancel={() => {
            this.setState({ createModelVisable: false })
          }}
        >
          {
            this.props.dataStruct.map(o => {
              return <div key={o.index} className={'rowDivStart'} style={{
                margin: 10,
                alignItems: 'flex-start'
              }}>
                <div style={{
                  width: 100,
                  minWidth: 100,
                  paddingTop: 3,
                  display: 'inline-block'
                }}>
                  {o.title}：
                </div>
                <div style={{ display: 'inline-block' }}>
                  {
                    o.render && o.render((value, record) => {
                      let _data = _.cloneDeep(this.state.data)
                      _data[o.index] = value
                      try {
                        if (record) {
                          Object.keys(record).map(key => {
                            _data[key] = record[key]
                          })
                        }
                      } catch (e) {

                      }
                      this.setState({ data: _data })
                    }, this.state.data[o.index])
                  }
                  {
                    !o.render && <Input
                      value={this.state.data[o.index]}
                      style={{ width: 300 }}
                      onChange={(e) => {
                        let _data = _.cloneDeep(this.state.data)
                        _data[o.index] = e.target.value
                        this.setState({ data: _data })
                      }}
                    />
                  }
                </div>
              </div>
            })
          }
        </Modal>
      </div>
    )
  }
}

export default ModelEditor
