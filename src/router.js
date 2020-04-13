import React from 'react'
import { Router, Route, Switch } from 'dva/router'
import ProjectList from './routes/collie'
import Blog from './routes/blog'
import { EmptyLayout } from './components/Layout'
import 'antd/dist/antd.css'
import './index.css'

function RouterConfig ({ history }) {
  // console.log('antd', style)
  return <Router history={history}>
    <Switch>
      <EmptyLayout>
        <Route path='/collie' exact component={ProjectList}/>
        <Route path='/blog/:article_id/edit' exact component={Blog}/>
      </EmptyLayout>
    </Switch>
  </Router>
}

export default RouterConfig
