import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import StartPage from './pages/Startup'
import ListPage from './pages/List'
import configureStore from './configureStore'
import createBrowserHistory from 'history/createBrowserHistory';
import {Provider} from 'react-redux'

const history = createBrowserHistory()
const store = configureStore({}, history)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter history={history}>
          <div>
            <Route exact path='/' component={StartPage}/>
            <Route path='/list' component={ListPage}/>
            <Route path='/repoDetails/:id' component={ListPage}/>
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
