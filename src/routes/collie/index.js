import React, { Component } from 'react'
import { connect } from 'dva'
import { Select, Empty, Button, Input, Highlighter, PageHeader, Menu } from 'antd'
import MonacoEditor from 'react-monaco-editor'
import styles from './index.css'
import { getColumnSearchProps, ModelEditor } from '../../components'
import RunModal from './RunModal'

class Index extends Component {
  constructor (props) {
    super(props)
    this.getColumnSearchProps = getColumnSearchProps.bind(this)
    this.dispatch = this.props.dispatch
    this.state = {
      id: 'debug',
      pagination: {},
      tableLoading: false,
      sorter: {},
      filters: {}
    }
  }

  componentDidMount () {
    this.reloadFuncs()
  }

  handleClick = (item) => {
    const { funcs } = this.props.func
    const func = funcs.find(o => o.id === item.key)
    this.setState({
      desc: undefined,
      ...func
    })
  }

  handleSave = (id, data, callback) => {
    this.setState({ saving: true })
    this.dispatch({
      type: 'func/saveFunc',
      payload: {
        id: id,
        ...data
      },
      callback: () => {
        this.setState({ saving: false })
        if (_.isFunction(callback)) {
          callback()
        }
      }
    })
  }

  reloadFuncs = () => {
    this.dispatch({
      type: 'func/getFunc',
      callback: (funcs) => {
        const func = funcs.find(o => o.id === this.state.id)
        this.setState({
          desc: undefined,
          ...func
        })
      }
    })
  }

  onEditor = (data, callback) => {
    delete data._id
    this.handleSave(this.state.id, data, () => {
      this.reloadFuncs()
      if (_.isFunction(callback)) {
        callback()
      }
    })
  }

  get getFuncEditor () {
    const { funcs } = this.props.func
    const func = funcs.find(o => o.id === this.state.id)
    const folders = []
    funcs.map(o => {
      if (o.folder && folders.indexOf(o.folder) === -1) {
        folders.push(o.folder)
      }
    })
    if (this.state.tempFolder) {
      folders.push(this.state.tempFolder)
    }
    const dataStruct = [
      {
        title: '描述',
        index: 'desc'
      },
      {
        title: '文件夹',
        index: 'folder',
        render: (callback, initialData) => {
          return <div>
            <Select
              showSearch
              mode={'search'}
              style={{ width: 300 }}
              value={initialData}
              onSearch={(value) => {
                this.setState({ tempFolderStr: value })
              }}
              onInputKeyDown={(e, a) => {
                if (e.key === 'Enter') {
                  this.setState({ tempFolder: this.state.tempFolderStr })
                }
              }}
              onChange={(value) => {
                callback(value)
                this.setState({
                  tempFolder: undefined,
                  tempFolderStr: undefined
                })
                // this.handleSave(this.state.id, {folder: value}, this.reloadFuncs)
              }}>
              {
                folders.map((o, i) => {
                  return <Select.Option key={i} value={o}>
                    {o}
                  </Select.Option>
                })
              }
            </Select>
          </div>
        }
      }
    ]
    if (!this.state.content) {
      return <div className={styles.editorCoter}><Empty/></div>
    }
    return <div className={styles.editorCoter}>
      <div style={{ maxHeight: 80, flex: 1 }}>
        <PageHeader
          ghost={false}
          title={this.state.id}
          subTitle={func.desc || '...'}
          extra={[
            <ModelEditor
              key={'editor'}
              initialData={func}
              title={'编辑'}
              dataStruct={dataStruct}
              onConfirme={this.onEditor}
            >
              <Button>编辑</Button>
            </ModelEditor>,
            <RunModal
              onClick={(callback) => {
                this.handleSave('debug', { content: this.state.content }, callback)
              }}
              runOnVisible={true}
              key={'RunModaldebug'}
              path={'debug'}
              testInput={this.state.testInput}
              title={'调试'}
              text={'调试'}
            />,
            <Button key={'save'} loading={this.state.saving} key="1"
                    onClick={() => {
                      this.handleSave(this.state.id, { content: this.state.content }, this.reloadFuncs)
                    }}>
              保存
            </Button>,
            <RunModal
              handleSave={this.handleSave}
              reloadFuncs={this.reloadFuncs}
              key={'RunModaltest'}
              path={this.state.id}
              testInput={this.state.testInput}
              title={'测试'}
              text={'测试'}
            />,
            <Button key={'delete'} type={'danger'} onClick={() => {
              this.setState({ id: undefined, content: undefined })
              this.handleSave(this.state.id, { content: null }, this.reloadFuncs)
            }}>删除</Button>,
          ]}
        />
      </div>
      <div style={{ flex: 1, position: 'relative' }} onKeyDown={(e) => {
        if (e.key === 'F5') {
          const dom = document.querySelector('#debugButton')
          dom.click()
          console.log(dom)
        }
      }}>
        <MonacoEditor
          language={'javascript'}
          theme={'vs'}
          options={{ fontSize: 14 }}
          value={this.state.content || ''}
          onChange={(text) => {
            this.setState({ content: text })
          }}
        />
      </div>
    </div>
  }

  get getMenu () {
    const { funcs } = this.props.func
    const folders = []
    funcs.map(o => {
      if (o.folder && folders.indexOf(o.folder) === -1) {
        folders.push(o.folder)
      }
    })
    return <div style={{ minWidth: 256, maxWidth: 256, height: '100%' }}>
      <Menu
        style={{ height: '100%' }}
        onClick={this.handleClick}
        defaultSelectedKeys={[]}
        defaultOpenKeys={[]}
        mode="inline"
      >
        <div style={{ padding: 10 }}>
          <Input onChange={(e) => {
            this.setState({ funcNameWaitAdd: e.target.value })
          }} style={{ width: 150, marginRight: 20 }}/>
          <Button onClick={() => {
            this.handleSave(this.state.funcNameWaitAdd, {
              content: 'function main(){\n' +
                '    return 0\n' +
                '}'
            }, this.reloadFuncs)
          }}>添加</Button>
        </div>
        {
          folders.map((folder) => {
            return <Menu.SubMenu
              key={folder}
              title={folder}
            >
              {
                funcs.filter(o => o.folder === folder).map(func => {
                  return <Menu.Item key={func.id}>{func.id}</Menu.Item>

                })
              }
            </Menu.SubMenu>
          })
        }
        {
          funcs.filter(o => o.folder === undefined).map(func => {
            return <Menu.Item key={func.id}>{func.id}</Menu.Item>

          })
        }
      </Menu>
    </div>
  }

  render () {
    return (
      <div className={styles.mainContainer}>
        {this.getMenu}
        {this.getFuncEditor}
      </div>
    )
  }
}

export default connect(state => state)(Index)
