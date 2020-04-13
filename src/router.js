import React from 'react'
import { Router, Route, Switch } from 'dva/router'
import ProjectList from './routes/collie'
import { EmptyLayout } from './components/Layout'
import 'antd/dist/antd.css'
import './index.css'

function RouterConfig ({ history }) {
  // console.log('antd', style)
  return <Router history={history}>
    <Switch>
      <EmptyLayout>
        <Route path='/' exact component={ProjectList}/>
      </EmptyLayout>
    </Switch>
  </Router>
}

export default RouterConfig
