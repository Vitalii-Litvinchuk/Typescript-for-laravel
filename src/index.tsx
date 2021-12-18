import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "bootstrap/dist/js/bootstrap.bundle.js";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store';
import { Provider } from 'react-redux';
import { authUser } from './components/auth/Login/actions';

const token = localStorage.token;
if (token) {
  authUser(token, store.dispatch);
}


ReactDOM.render(
  <Provider store={store}>
    < BrowserRouter >
      <App />
    </ BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
