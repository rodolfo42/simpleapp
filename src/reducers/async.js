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

export default function reducer(state = [], action) {
  const { seqId } = action;

  if (seqId) {
    let newState = [];
    if (isStart(action)) {
      newState = [seqId];
    } else if (isDone(action) || isError(action)) {
      newState = _.reject(state, id => id === seqId);
    }

    return newState;
  }

  return state;
}
