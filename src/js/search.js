import apiService from './apiService';
import refs from './refs';
import { showHiddenItem, randerByQuery, insertItems, clear } from './markup';
import searchListTemplate from '../templates/cardsList.hbs';

refs.searchInput.addEventListener('keypress', event => {
  apiService.searchText = refs.searchInput.value;

  if (event.keyCode === 13) {
    event.preventDefault();
    apiService.resetPage();
    showHiddenItem(refs.pagination);
    randerByQuery(apiService.searchText);
    refs.paginationValue.innerHTML = apiService.page;
  }
});

refs.paginationBtnNext.addEventListener('click', () => {
  apiService
    .getSearchedMovie(apiService.searchText)
    .then(data => {
      if (data.length === 20) apiService.updatePage();
    })
    .then(() => apiService.getSearchedMovie(apiService.searchText))
    .then(data => {
      refs.paginationValue.innerHTML = apiService.page;
      clear(refs.mainContent);
      insertItems(data, searchListTemplate);
      window.scrollTo(0, 0);
    });
});

refs.paginationBtnPrev.addEventListener('click', () => {
  apiService
    .getSearchedMovie(apiService.searchText)
    .then(() => {
      if (apiService.page === 1) return;
      apiService.downgradePage();
    })
    .then(() => apiService.getSearchedMovie(apiService.searchText))
    .then(data => {
      refs.paginationValue.innerHTML = apiService.page;
      clear(refs.mainContent);
      insertItems(data, searchListTemplate);
      window.scrollTo(0, 0);
    });
});
