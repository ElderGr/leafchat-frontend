import React from 'react';
import ReactDOM from 'react-dom';

import Routes from "./routes";

import './global.css';
import 'react-notifications-component/dist/theme.css'
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);
