import React, { useState } from 'react';
import './prices.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { handleToken } from './actions/Auth';
import { Link } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import Loader from 'react-loader-spinner';

const Prices = ({ isAuthenticated, subscription, handleToken }) => {
  const [loading, setloading] = useState(false);

  if (isAuthenticated && subscription) {
    return <Redirect to="/home" />;
  } else if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  const handletoken = async token => {
    setloading(true);
    handleToken(token);
  };

  if (loading) {
    return (
      <span
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <Loader
          type="Bars"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={13000}
        />
      </span>
    );
  } else {
    return (
      <div id="planspricing">
        <div className="plan-box non-p">
          <div
            className="plan-header"
            style={{ borderTop: '1px solid #7c4cff' }}
          >
            <h4>Monthly Plan</h4>
            <span className="deco-div"></span>
            <h5>1 Month for $60</h5>

            <StripeCheckout
              name="Company name"
              // description={plan.stripe.description}
              amount={6000}
              token={token => handletoken(token)}
              stripeKey={'pk_test_T2fIPuPYaaGrVEv9gzRxq69Z00JMf5PYYY'}
            >
              {/* {this.cardContent(plan)} */}
            </StripeCheckout>
          </div>
          <div className="plan-body">
            <ul>
              <li>Realtime Option Order Flow</li>
              <li>Equity Block &amp; Dark Pool Order Data</li>
              <li>
                Alpha Ai Signals.
                <span
                  style={{
                    color: '#815FFF',
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}
                >
                  NEW
                </span>
              </li>
              <li>
                Dark Pool Insights
                <span
                  style={{
                    color: '#815FFF',
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}
                >
                  NEW
                </span>
              </li>
              <li>On-Demand Historical Data.</li>
              <li>FlowAlgo Levels (Institutional Zones)</li>
              <li>FlowAlgo Snapshot / Day Recaps</li>
              <li>Voice Alerts</li>
              <li>Unusual Option Flow Smart Highlighting</li>
              <li>Flow Smart Filtering</li>
              <li>Trader Chatroom</li>
              <li>Top Open Interest Changes</li>
            </ul>
          </div>
          <div className="plan-footer">
            <Link
              to="/https://app.flowalgo.com/users/signup/trialrun14"
              className="btn btn-primary"
            >
              Get Started Here
            </Link>
          </div>
        </div>
      </div>
    );
  }
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  subscription: state.auth.user.subscription
});

export default connect(mapStateToProps, { handleToken })(Prices);
