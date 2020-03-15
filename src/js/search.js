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
  randerByQuery(apiService.searchText).then(data => {
    refs.paginationValue.innerHTML = apiService.page;
    if (data.length === 20) apiService.updatePage();
  });
});

refs.paginationBtnPrev.addEventListener('click', () => {
  randerByQuery(apiService.searchText).then(() => {
    refs.paginationValue.innerHTML = apiService.page;
    if (apiService.page === 1) return;
    apiService.downgradePage();
  });
});
