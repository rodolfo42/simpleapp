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
        const filteredPeople = population.filter((person) => {
          const data = `${person.name.title}. ${person.name.first} ${person.name.last} ${person.email}`;
          return data.toLowerCase().includes(term.toLowerCase());
        });
        return { ...state, term, allPeople: filteredPeople, loading: false, filtered: true };
      }
      break;
    default:
      return { ...state, term, allPeople: population, loading: false, filtered: false };
  }
}
