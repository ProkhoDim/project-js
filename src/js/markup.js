import apiService from './apiService';
import refs from './refs';
import searchListTemplate from '../templates/cardsList.hbs';

function insertItems(items, template) {
  const markup = template(items);
  refs.mainContent.insertAdjacentHTML('beforeend', markup);
}

function clear(container) {
  container.innerHTML = '';
}

function hideItem(item) {
  item.classList.add('hidden');
}

function showHiddenItem(item) {
  item.classList.remove('hidden');
}

function randerByQuery(query) {
  apiService.getSearchedMovie(query).then(data => {
    clear(refs.mainContent);
    refs.paginationValue.innerHTML = apiService.page;
    insertItems(data, searchListTemplate);
  });
}

export { insertItems, clear, hideItem, showHiddenItem, randerByQuery };
