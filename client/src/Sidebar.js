import React from 'react';
import { Icon } from 'react-icons-kit';
import { dashboard } from 'react-icons-kit/fa/dashboard';
import { ic_dashboard } from 'react-icons-kit/md/ic_dashboard';
import { info } from 'react-icons-kit/metrize/info';

export default function Sidebar() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}
    >
      <div style={{ color: '#969AA3' }} className="icon-sidebar">
        <Icon icon={dashboard} size={20} />
      </div>
      <div style={{ color: '#969AA3' }} className="icon-sidebar">
        <Icon icon={ic_dashboard} size={20} />
      </div>

      <div style={{ color: '#969AA3' }} className="icon-sidebar">
        <Icon icon={info} size={20} />
      </div>
    </div>
  );
}
