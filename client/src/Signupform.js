import React, { useState, useEffect } from 'react';

import { Button, Form, FormGroup, Input } from 'reactstrap';
import logo1 from './assests/logo1.png';
import './loginform.css';
import { Link } from 'react-router-dom';
import { register } from './actions/Auth';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner';

function Signupform({ isAuthenticated, register, errors, subscription }) {
  const [loading, setloading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const { name, email, password } = formData;
  const onChangeHandler = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmitHandler = async e => {
    e.preventDefault();

    try {
      await register({ name, email, password });
      setloading(false);
    } catch (error) {}
  };
  if (isAuthenticated && subscription) {
    return <Redirect to="/home" />;
  } else if (isAuthenticated && !subscription) {
    return <Redirect to="/prices" />;
  }

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
            onSubmitHandler(e);
          }}
        >
          Signup
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
              <p>Signup to see our Trade</p>
              <p>Platform in Action</p>
            </span>
          </div>
          <Form
            onSubmit={e => onSubmitHandler(e)}
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              flexDirection: 'column'
            }}
          >
            <img src={logo1} alt="logo" style={{ color: 'blue' }} />

            <span>
              <FormGroup>
                <Input
                  className="mb-1"
                  type="name"
                  name="name"
                  value={formData.name}
                  onChange={e => onChangeHandler(e)}
                  placeholder="Enter Your Username"
                  required
                />
                <Input
                  className="mb-1"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={e => onChangeHandler(e)}
                  placeholder="Enter Your Email"
                  required
                />

                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={e => onChangeHandler(e)}
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
              {/* </Link> */}
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

export default connect(mapStateToProps, { register })(Signupform);
