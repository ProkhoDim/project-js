import apiService from './apiService';
import refs from './refs';
import searchListTemplate from '../templates/cardsList.hbs';
import { insertItems, clear, randerByQuery, showHiddenItem } from './markup';
import { showDetails } from './details';

(function(query) {
  apiService
    .getSearchedMovie(query)
    .then(data => {
      clear(refs.mainContent);
      refs.paginationValue.innerHTML = apiService.page;
      insertItems(data, searchListTemplate);
    })
    .finally(showDetails());
})();

refs.main.addEventListener('click', e => {
  e.preventDefault();
  refs.searchInput.value = '';
  apiService.searchText = '';
  randerByQuery('');
  showHiddenItem(refs.searchForm);
  showHiddenItem(refs.pagination);
});
