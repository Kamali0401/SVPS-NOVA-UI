import React from 'react';
// import ReactDOM from 'react-dom';
// import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';

import './index.css';

// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './app/styles/responsive.css';
import './app/styles/componentStyles.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();





