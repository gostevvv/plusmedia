import React from 'react';
import { Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import StartPage from './pages/Startup';
import ListPage from './pages/List';
import configureStore from './configureStore';

const history = createBrowserHistory();
const store = configureStore({}, history);

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <div>
          <Route exact path="/" component={StartPage} />
          <Route path={['/list', '/repoDetails/:id']} component={ListPage} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
