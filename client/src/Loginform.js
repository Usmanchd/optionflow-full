import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import {
  FacebookLoginButton,
  GoogleLoginButton
} from 'react-social-login-buttons';
import logo from './assests/logo.png';
import './loginform.css';
import { login } from './actions/Auth';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';

function Loginform({ isAuthenticated, login, subscription, errors }) {
  const [loading, setloading] = useState(false);
  console.log(loading);
  const [state, setstate] = useState({
    email: '',
    password: ''
  });

  const { email, password } = state;

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await login({ email, password });
      setloading(false);
    } catch (error) {}
  };

  if (isAuthenticated && subscription) {
    return <Redirect to="/home" />;
  } else if (isAuthenticated && !subscription) {
    return <Redirect to="/prices" />;
  }

  const handleChange = event => {
    const { name, value } = event.target;
    setstate({ ...state, [name]: value });
  };

  const Showbtnload = () => {
    if (loading) {
      return (
        <span className="btn-login p-1 text-center">
          <Loader
            type="ThreeDots"
            color="#272494"
            height={30}
            width={40}
            timeout={13000}
          />
        </span>
      );
    } else {
      return (
        <Button
          className="btn-login p-1 text-center"
          type="submit"
          style={{
            width: '100%',
            backgroundColor: '#120f5d',
            fontWeight: 'bold'
          }}
          onClick={e => {
            setloading(true);
            handleSubmit(e);
          }}
        >
          Login
        </Button>
      );
    }
  };

  return (
    <div className="supermain">
      <div className="main">
        <div className="main-signup">
          <div className="sidebar-signup">
            <h3 style={{ fontSize: '23px', fontWeight: 'bold' }}>
              Welcome to Trade
            </h3>
            <span>
              <p>Login to see our Trade</p>
              <p>Platform in Action</p>
            </span>
            <h5 style={{ fontSize: '13px', fontWeight: 'normal' }}>
              <b>Forgot Password?</b>
            </h5>
          </div>
          <Form
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              flexDirection: 'column'
            }}
          >
            <img src={logo} alt="logo" style={{ color: 'blue' }} />

            <span>
              <FormGroup>
                <Input
                  className="mb-1"
                  type="email"
                  name="email"
                  value={state.email}
                  onChange={handleChange}
                  placeholder="Enter Your Email"
                  required
                />

                <Input
                  type="password"
                  name="password"
                  value={state.password}
                  onChange={handleChange}
                  placeholder="Enter Your Password"
                  required
                />
              </FormGroup>
              <Showbtnload />
              {errors &&
                errors.map(e => (
                  <ul>
                    <li style={{ color: 'black' }}>{e.msg}</li>
                  </ul>
                ))}
              <div className="text-center pt-3">
                Or continue with your social account
              </div>
            </span>
            <span>
              <FacebookLoginButton
                className="google-button text-center"
                // onClick={signInWithFacebook}
              />

              <GoogleLoginButton
                className="google-button"
                // onClick={signInWithGoogle}
              />
            </span>
          </Form>
        </div>
      </div>
      <footer style={{ color: 'white' }} className="login-footer">
        CopyRight © 2019 Trade and affiliates. All rights reserved.{' '}
      </footer>
    </div>
  );
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.auth.errors,
  subscription: state.auth.user.subscription
});
export default connect(mapStateToProps, { login })(Loginform);
