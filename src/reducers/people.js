import population from '../lib/population';
import * as actions from '../lib/actions';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case actions.FILTER_PEOPLE_START:
      return {
        ...state,
        term: action.term,
        loading: true,
        filtered: false,
        error: false
      };
    case actions.FILTER_PEOPLE_DONE:
      return {
        ...state,
        allPeople: action.results,
        loading: false,
        filtered: true,
        error: false
      };
    case actions.FILTER_PEOPLE_ERROR:
      return {
        ...state,
        loading: false,
        filtered: false,
        error: action.error
      };
    case actions.CLEAR_FILTER:
    default:
      return {
        ...state,
        term: '',
        allPeople: population,
        loading: false,
        filtered: false,
        error: false
      };
  }
}
