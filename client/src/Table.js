import React, { useEffect, useState } from 'react';
import { Icon } from 'react-icons-kit';
import { volumeUp } from 'react-icons-kit/fa/volumeUp';
import { ic_close } from 'react-icons-kit/md/ic_close';
import axios from 'axios';
import { angleUp } from 'react-icons-kit/fa/angleUp';
import { angleDown } from 'react-icons-kit/fa/angleDown';
import setauthtoken from './utilis/setauthtoken';
import Loader from 'react-loader-spinner';

export default function Table() {
  const [loading, setloading] = useState(false);
  const [optionFlow, setoptionFlow] = useState([]);
  useEffect(() => {
    async function fetch() {
      setloading(true);
      delete axios.defaults.headers.common['x-auth-token'];
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      try {
        const data = await axios.get(
          'https://api.benzinga.com/api/v1/signal/option_activity?token=3085d152a4124662836f7f0d963672ca',
          config
        );
        setoptionFlow(data.data.option_activity);
        setloading(false);
      } catch (error) {
        setloading(false);
      }

      if (localStorage.token) {
        setauthtoken(localStorage.getItem('token'));
      }
    }
    fetch();
  }, []);

  setInterval(() => {
    async function fetch() {
      delete axios.defaults.headers.common['x-auth-token'];
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      try {
        setloading(true);
        const data = await axios.get(
          'https://api.benzinga.com/api/v1/signal/option_activity?token=3085d152a4124662836f7f0d963672ca',
          config
        );
        setoptionFlow([...data.data.option_activity]);
        setloading(false);
      } catch (error) {}

      if (localStorage.token) {
        setauthtoken(localStorage.getItem('token'));
      }
    }
    fetch();
  }, 120000);

  const getdesireddata = string => {
    let b = string.split(': ');
    return b[2].slice(0, 12);
  };

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
      <div>
        <div className="table-header">
          <h4 style={{ padding: '10px', margin: '0px' }}>Option Flow</h4>
          <span className="cross">
            <span
              style={{ color: '#272494', marginRight: '10px' }}
              className="icon-sidebar"
            >
              <Icon icon={volumeUp} size={24} />
            </span>
            <span
              style={{ color: '#969AA3', marginRight: '10px' }}
              className="icon-sidebar"
            >
              <Icon icon={ic_close} size={24} />
            </span>
          </span>
          <table>
            <tr>
              <th>Time</th>
              <th>DIR</th>
              <th>TICKER</th>
              <th>EXPIRY</th>
              <th>STRIKE</th>
              <th>C/P</th>
              <th>SPOT</th>
              <th>DETAILS</th>
              <th>TYPE</th>
              <th>PREM</th>
              <th></th>
            </tr>
            {optionFlow.map(option => (
              <tr className="table-header-list">
                <td>{option.time}</td>
                <td>
                  {option.put_call === 'PUT' ? (
                    <span
                      style={{ width: 24, height: 24 }}
                      className="text-danger"
                    >
                      <Icon icon={angleUp} size={28} />
                    </span>
                  ) : (
                    <span
                      style={{ width: 24, height: 24 }}
                      className="text-success"
                    >
                      <Icon icon={angleDown} size={28} />
                    </span>
                  )}
                </td>
                <td>
                  {option.put_call === 'PUT' ? (
                    <span
                      className="badge badge-danger"
                      style={{
                        maxWidth: '40px',
                        minWidth: '40px',
                        padding: '5px 10px'
                      }}
                    >
                      {option.ticker}
                    </span>
                  ) : (
                    <span
                      className="badge badge-success"
                      style={{
                        maxWidth: '40px',
                        minWidth: '40px',
                        padding: '5px 10px'
                      }}
                    >
                      {option.ticker}
                    </span>
                  )}
                </td>
                <td>{option.date_expiration}</td>
                <td>{option.strike_price}</td>
                <td>{option.put_call}</td>
                <td>SPOT</td>
                <td>{getdesireddata(option.description)}</td>
                <td>{option.option_activity_type}</td>
                <td>{parseFloat(option.cost_basis).toFixed(2)}</td>
                <td>...</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    );
  }
}
