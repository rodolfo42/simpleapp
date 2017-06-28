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
import reducers from './reducers';
import { isStart } from './reducers/async';

const loggerMiddleware = createLogger();
const reducer = combineReducers(reducers);

const store = createStore((state = {}, action) => {
  if (action.seqId &&
      !isStart(action) &&
      state.async &&
      !state.async.includes(action.seqId)) {
    return state;
  }
  return reducer(state, action);
},
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
