import React, { Component } from 'react'
import { Router, Route, browserHistory, Link, IndexRoute  } from 'react-router'
import StartPage from './StartPage'
import ListPage from './ListPage'

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/'>
          <IndexRoute component={StartPage}/>
          <Route path='/list' component={ListPage}/>
          <Route path='/repoDetails/:id' component={ListPage}/>
          <Route path="*" component={NoMatch}/>
        </Route>
      </Router>
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
