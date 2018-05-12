import React, { Component } from 'react'
import { Router, Route, browserHistory, Link, IndexRoute } from 'react-router'
import StartPage from './pages/Startup'
import ListPage from './pages/List'
import configureStore from './configureStore'
import { syncHistoryWithStore } from 'react-router-redux';
import {Provider} from 'react-redux'

const historyType = browserHistory
const store = configureStore({}, historyType)
const history = syncHistoryWithStore(historyType, store)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path='/'>
            <IndexRoute component={StartPage}/>
            <Route path='/list' component={ListPage}/>
            <Route path='/repoDetails/:id' component={ListPage}/>
            <Route path="*" component={NoMatch}/>
          </Route>
        </Router>
      </Provider>
    )
  }
}

function NoMatch() {
  return (
    <div>
      Страницы по заданному адресу не существует.
      <Link to={StartPage}>
        Перейти на стартовую страницу...
      </Link>
    </div>
  )
}

export default App
