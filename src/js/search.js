import apiService from './apiService';
import refs from './refs';
import searchListTemplate from '../templates/cardsList.hbs';
import { insertItems, clear, hideItem, sowHiddenItem } from './markup';

refs.searchInput.addEventListener('keypress', event => {
  apiService.searchText = refs.searchInput.value;

  if (event.keyCode === 13) {
    event.preventDefault();
    apiService.resetPage();
    sowHiddenItem(refs.pagination);
    randerByQuery(apiService.searchText);
  }
});

refs.paginationBtnNext.addEventListener('click', () => {
  apiService.updatePage();
  randerByQuery(apiService.searchText);
});

refs.paginationBtnPrev.addEventListener('click', () => {
  if (apiService.page === 1) return;
  apiService.downgradePage();
  randerByQuery(apiService.searchText);
});

function randerByQuery(query) {
  apiService.getSearchedMovie(query).then(data => {
    clear(refs.mainContent);
    refs.paginationValue.innerHTML = apiService.page;
    insertItems(data, searchListTemplate);
  });
}
