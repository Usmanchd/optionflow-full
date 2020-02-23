import React from 'react';
import Table from './Table';
import Sidebar from './Sidebar';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from './actions/Auth';

function Home({ isAuthenticated, subscription, logout }) {
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }
  if (!subscription) {
    return <Redirect to="/prices" />;
  }
  return (
    <Switch>
      <div className="main-homepage">
        <div className="homepage-sidebar">
          <Sidebar />
        </div>
        <div className="homepage-main">
          <div className="homepage-header">
            <span>Realtime Dashboard</span>
            <span onClick={logout}>LogOut</span>
          </div>
          <div className="homepage-table">
            <Route exact path="/home">
              <Table />
            </Route>
            <Route path="/home/profile">
              <p>hello</p>
            </Route>
          </div>
        </div>
      </div>
    </Switch>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  subscription: state.auth.user.subscription
});

export default connect(mapStateToProps, { logout })(Home);
