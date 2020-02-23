import React, { useEffect } from 'react';
import './App.css';
import Table from './Table';
import Sidebar from './Sidebar';
import Loginform from './Loginform';
import { Switch, Route } from 'react-router-dom';
import Landingpage from './Landingpage';
import store from './store';
import { loadUser } from './actions/Auth';
import setauthtoken from './utilis/setauthtoken';
import { Provider } from 'react-redux';
import Home from './Home';
import Signupform from './Signupform';
import Prices from './Prices';

if (localStorage.token) {
  setauthtoken(localStorage.getItem('token'));
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Switch>
        <div>
          <Route path="/home">
            <Home />
          </Route>
          <Route exact path="/">
            <Landingpage />
          </Route>

          <Route exact path="/prices">
            <Prices />
          </Route>
          <Route path="/login">
            <Loginform />
          </Route>
          <Route path="/register">
            <Signupform />
          </Route>
        </div>
      </Switch>
    </Provider>
  );
}

export default App;
