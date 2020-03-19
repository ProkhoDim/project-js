import apiService from './apiService';
import refs from './refs';
import searchListTemplate from '../templates/cardsList.hbs';

function insertItems(items, template) {
  const markup = template(items);
  refs.mainContent.insertAdjacentHTML('beforeend', markup);
}

function getErrorSearch(items, template) {
  const markup = template(items);
  refs.mainContent.insertAdjacentHTML(
    'beforeend',
    `<div class="not-found"><p class="not-found_p">Not result for your query......</p><h3>Most popular</h3></div>${markup}`,
  );
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
    if (!data.length) {
      apiService.getSearchedMovie().then(data => {
        getErrorSearch(
          [data[0], data[1], data[2], data[3]],
          searchListTemplate,
        );
        hideItem(refs.pagination);
      });
      return;
    }
    refs.paginationValue.innerHTML = apiService.page;
    insertItems(data, searchListTemplate);
  });
}

export { insertItems, clear, hideItem, showHiddenItem, randerByQuery };
