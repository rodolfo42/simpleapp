import _ from 'lodash';
import population from '../lib/population';

export default function reducer(state = {}, action) {
  let term = '';
  switch (action.type) {
    case 'FILTER_PEOPLE':
      term = action.term;
      return { ...state, term, loading: true };
    case 'FILTER_PEOPLE_DONE':
      term = action.term;
      if (term) {
        const props = [
          'name.title',
          'name.first',
          'name.last',
          'email'
        ];
        const filteredPeople = population.filter((person) => {
          return props.some(prop => {
            return _.get(person, prop).toLowerCase()
              .includes(term.toLowerCase());
          });
        });
        return { ...state, term, allPeople: filteredPeople, loading: false, filtered: true };
      }
      break;
    default:
      return { ...state, term, allPeople: population, loading: false, filtered: false };
  }
}
