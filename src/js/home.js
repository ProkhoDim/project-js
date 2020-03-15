import apiService from './apiService';
import refs from './refs';
import { showHiddenItem, randerByQuery } from './markup';

refs.homeRef.addEventListener('click', e => {
  e.preventDefault();
  e.preventDefault();
  randerByQuery(apiService.searchText);
  showHiddenItem(refs.searchForm);
  showHiddenItem(refs.pagination);
});
