import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import 'semantic-ui-css/semantic.min.css';

import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import peopleReducer from './reducers/people';

const loggerMiddleware = createLogger();

const app = combineReducers({
  people: peopleReducer
});

const store = createStore(
  app,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();
