// lib/main.js

import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {
  Route,
  HashRouter,
  Redirect,
  Switch,
} from 'react-router-dom'

import {Application} from './application'
import {updatePage, } from './actions/page-actions'

import {
  DEFAULT_PAGE_STATE,
  pageStateReducer,
} from './reducers/page-reducer'

import {IndexPage} from './pages/index/index-page'


const reducers = combineReducers({
  page: pageStateReducer,
})


const applicationState = {
  page: DEFAULT_PAGE_STATE,
}


const store = createStore(
  reducers,
  applicationState,
  applyMiddleware(thunkMiddleware, createLogger())
)


const app = props => {
  return <Application {...props}/>
}


const renderIndex = props => (
  <Application {...props}>
    <IndexPage/>
  </Application>
)


const updatePageWrapper = (renderFunction) => {
  return (props) => {
    store.dispatch(updatePage(props))
    return renderFunction(props)
  }
}


const runApplication = (page, kwargs) => {
  // do any databootstrapping here
  // const userMeta = document.getElementsByName('json-current_user')[0]
  // const currentUser = JSON.parse(userMeta.content)
  // store.dispatch(receiveUser({data: currentUser, isCurrent: true, }))

  // do liveness
  // new WebSocket().on('message', (payload) {
  //   store.dispatch(receiveSomething(payload.something))
  // })

  // TODO: make HashRouter an option to use another router by default
  const renderable = (
    <Provider store={store}>
        <HashRouter baseName='/index.html'>
            <Switch>
              <Route exact path='/{{projectSlug}}' render={updatePageWrapper(renderIndex)}/>
              <Redirect exact from='/' to='/{{projectSlug}}'/>
            </Switch>
        </HashRouter>
    </Provider>
  )
  const elem = document.getElementById('{{projectSlug}}')
  ReactDOM.render(renderable, elem)
}


runApplication()
