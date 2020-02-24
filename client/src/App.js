import React, { useEffect, useState } from 'react';
import './App.css';
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
import Loader from 'react-loader-spinner';

if (localStorage.token) {
  setauthtoken(localStorage.getItem('token'));
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  const [loading, setloading] = useState(true);

  setTimeout(() => {
    setloading(false);
  }, 3000);
  if (loading) {
    return (
      <span
        className="btn-login p-1 text-center"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <Loader
          type="TailSpin"
          color="#272494"
          height={100}
          width={100}
          timeout={13000}
        />
      </span>
    );
  } else {
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
}

export default App;
