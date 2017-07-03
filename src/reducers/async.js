import _ from 'lodash';

function isDone(action) {
  return action.type.endsWith('_DONE');
}

function isError(action) {
  return action.type.endsWith('_ERROR');
}

export function isStart(action) {
  return action.type.endsWith('_START');
}

export default function reducer(state = {}, action) {
  const { seqId, stateKey } = action;

  if (seqId && stateKey) {
    let newState = _.get(state, stateKey, []);
    if (isStart(action)) {
      newState = [seqId];
    } else if (isDone(action) || isError(action)) {
      newState = _.reject(newState, id => id === seqId);
    }

    return _.merge({}, state, { [stateKey]: newState });
  }

  return state;
}
