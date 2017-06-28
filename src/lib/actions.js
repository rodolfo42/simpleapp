import _ from 'lodash';
import population from './population';

const SEARCH_LATENCY = 500;

export const FILTER_PEOPLE_START = 'FILTER_PEOPLE_START';
export const FILTER_PEOPLE_DONE = 'FILTER_PEOPLE_DONE';
export const FILTER_PEOPLE_ERROR = 'FILTER_PEOPLE_ERROR';
export const CLEAR_FILTER = 'CLEAR_FILTER';

function delay(ms = 1, value = true) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value);
    }, ms);
  });
}

export function filterPeople(term) {
  return dispatch => {
    if (term) {
      const seqId = (Math.random() * new Date().valueOf());
      dispatch({ type: FILTER_PEOPLE_START, term, seqId });
      return delay(SEARCH_LATENCY).then(() => {
        if (term === 'wrong') {
          throw new Error(`error searching for ${term}`);
        }
      }).then(() => {
        const props = [
          'name.title',
          'name.first',
          'name.last',
          'email'
        ];
        const results = population.filter((person) => {
          return props.some(prop => {
            return _.get(person, prop).toLowerCase()
              .includes(term.toLowerCase());
          });
        });
        dispatch({ type: FILTER_PEOPLE_DONE, seqId, results })
        return results;
      }).catch(error => {
        dispatch({ type: FILTER_PEOPLE_ERROR, seqId, error });
      });
    } else {
      dispatch(clearFilter());
      return Promise.resolve();
    }
  };
}

export function clearFilter() {
  return { type: CLEAR_FILTER };
}
