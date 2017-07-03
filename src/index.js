import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import 'semantic-ui-css/semantic.min.css';

import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import reducers from './reducers';
import { isStart } from './reducers/async';

const loggerMiddleware = createLogger();
const reducer = combineReducers(reducers);

const store = createStore((state = {}, action) => {
  if (action.seqId &&
      action.stateKey &&
      !isStart(action) &&
      state.async &&
      state.async[action.stateKey] &&
      !state.async[action.stateKey].includes(action.seqId)) {
    return state;
  }
  return reducer(state, action);
},
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
registerServiceWorker();
