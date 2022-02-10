import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';

import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import rootReducer from './Redux/Reducers/index.js'


const store = createStore( rootReducer, composeWithDevTools() )

ReactDOM.render(
  <Provider store={ store }>
    <Router />
  </Provider >,
  document.getElementById( 'root' ) );