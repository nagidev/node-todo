import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import store from './store';

import App from './App';

const apiUrl = 'http://127.0.0.1:3001'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App apiUrl={apiUrl}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);