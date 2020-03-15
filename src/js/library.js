import refs from './refs';
import searchListTemplate from '../templates/cardsList.hbs';
import libPageTemplate from '../templates/library_page.hbs';
import { insertItems, clear, hideItem } from './markup';

refs.libraryRef.addEventListener('click', e => {
  e.preventDefault();
  clear(refs.mainContent);
  hideItem(refs.searchForm);
  hideItem(refs.pagination);

  insertItems('', libPageTemplate);
  parseFromLocalStor('watchedIds');
  addLibraryListener();
});

function addLibraryListener() {
  refs.watched = document.querySelector('.button_watched');
  refs.watchLater = document.querySelector('.button_later');

  refs.watched.addEventListener('click', e => {
    e.preventDefault();
    parseList('watchedIds');
  });

  refs.watchLater.addEventListener('click', e => {
    e.preventDefault();
    parseList('watchLaterIds');
  });
}

function parseList(query) {
  if (query === 'watchedIds') {
    refs.watchLater.classList.remove('button--is_active');
    refs.watched.classList.add('button--is_active');
  } else {
    refs.watched.classList.remove('button--is_active');
    refs.watchLater.classList.add('button--is_active');
  }

  const cardList = document.querySelector('.cards');
  if (!!cardList) cardList.remove();

  parseFromLocalStor(query);
}

function parseFromLocalStor(query) {
  const parsedIds = JSON.parse(localStorage.getItem(query));
  let insertArr = [];

  for (const movie of parsedIds) {
    insertArr.push(movie.data);
  }

  insertItems(insertArr, searchListTemplate);
}
