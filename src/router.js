import React from 'react'
import { Router, Route, Switch } from 'dva/router'
import Collie from './routes/collie'
import BlogIndex from './routes/blog'
import BlogArticleList from './routes/blog/ArticleList'
import BlogArticle from './routes/blog/Article'
import { EmptyLayout } from './components/Layout'
import 'antd/dist/antd.css'
import './index.css'

function RouterConfig ({ history }) {
  // console.log('antd', style)
  return <Router history={history}>
    <Switch>
      <EmptyLayout>
        <Route path='/blog' exact component={BlogIndex}/>
        <Route path='/collie' exact component={Collie}/>
        <Route path='/blog_article' exact component={BlogArticleList}/>
        <Route path='/blog/:article_id' exact component={BlogArticle}/>
        <Route path='/blog/:article_id/edit' exact component={BlogArticle}/>
      </EmptyLayout>
    </Switch>
  </Router>
}

export default RouterConfig
