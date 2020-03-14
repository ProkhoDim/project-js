import apiService from './apiService';
import refs from './refs';
import searchListTemplate from '../templates/cardsList.hbs';
import { insertItems, clear, hideItem, sowHiddenItem } from './markup';
import libraryPage from '../templates/library_page.hbs';

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

refs.homeRef.addEventListener('click', e => {
  e.preventDefault();
  randerByQuery(apiService.searchText);
  sowHiddenItem(refs.searchForm);
  sowHiddenItem(refs.pagination);
});

refs.libraryRef.addEventListener('click', e => {
  e.preventDefault();

  hideItem(refs.searchForm);
  hideItem(refs.pagination);
  refs.mainContent.innerHTML =
    libraryPage() +
    searchListTemplate(apiService.getWatchedMovie('watchedIds'));
  addLibraryListener();
});

refs.main.addEventListener('click', e => {
  e.preventDefault();
  refs.searchInput.value = '';
  apiService.searchText = '';
  randerByQuery('');
  sowHiddenItem(refs.searchForm);
  sowHiddenItem(refs.pagination);
});

(function(query) {
  apiService.getSearchedMovie(query).then(data => {
    clear(refs.mainContent);
    refs.paginationValue.innerHTML = apiService.page;
    insertItems(data, searchListTemplate);
  });
})();

function addLibraryListener() {
  refs.watched = document.querySelector('.button_watched');
  refs.watchLater = document.querySelector('.button_later');

  refs.watched.addEventListener('click', e => {
    e.preventDefault();
    refs.watchLater.classList.remove('button--is_active');
    e.target.classList.add('button--is_active');
    refs.mainContent.childNodes[1].outerHTML = searchListTemplate(
      apiService.getWatchedMovie('watchedIds'),
    );
  });

  refs.watchLater.addEventListener('click', e => {
    e.preventDefault();
    refs.watched.classList.remove('button--is_active');
    e.target.classList.add('button--is_active');
    refs.mainContent.childNodes[1].outerHTML = searchListTemplate(
      apiService.getWatchedMovie('watchLaterIds'),
    );
  });
}
