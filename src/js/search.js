import apiService from './apiService';
import refs from './refs';
import { showHiddenItem, randerByQuery } from './markup';

refs.searchInput.addEventListener('keypress', event => {
  apiService.searchText = refs.searchInput.value;

  if (event.keyCode === 13) {
    event.preventDefault();
    apiService.resetPage();
    showHiddenItem(refs.pagination);
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
