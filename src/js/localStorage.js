import * as data from './objToLocalStor';
import apiService from './apiService';
import refs from './refs';
import searchListTemplate from '../templates/cardsList.hbs';

function addItem(elem, currentKey, checkedKey) {
  elem.addEventListener('click', e => {
    if (e.currentTarget !== e.target) return;
    setLocalStorageIdsOnClick(e, currentKey);

    if (!checkedKey) return;
    rewrightLocalStorage(currentKey, checkedKey);
  });
}

// function addLibraryListener() {
//   refs.watched = document.querySelector('.button_watched');
//   refs.watchLater = document.querySelector('.button_later');

//   refs.watched.addEventListener('click', e => {
//     e.preventDefault();
//     refs.watchLater.classList.remove('button--is_active');
//     e.target.classList.add('button--is_active');
//     refs.mainContent.childNodes[1].outerHTML = searchListTemplate(
//       apiService.getWatchedMovie('watchedIds'),
//     );
//   });

//   refs.watchLater.addEventListener('click', e => {
//     e.preventDefault();
//     refs.watched.classList.remove('button--is_active');
//     e.target.classList.add('button--is_active');
//     refs.mainContent.childNodes[1].outerHTML = searchListTemplate(
//       apiService.getWatchedMovie('watchLaterIds'),
//     );
//   });
// }

function setLocalStorageIdsOnClick(event, key) {
  const LocalStorIdsdArr = JSON.parse(localStorage.getItem(key));
  const movieId = event.target.dataset.id;
  const movieData = {
    id: movieId,
    data: data.obj,
  };
  try {
    if (!LocalStorIdsdArr.some(item => item.id === movieId))
      localStorage.setItem(
        key,
        JSON.stringify(LocalStorIdsdArr.concat(movieData)),
      );
  } catch {
    localStorage.setItem(key, JSON.stringify([movieData]));
  }
}

function rewrightLocalStorage(check, clear) {
  const checkedArray = JSON.parse(localStorage.getItem(check)).map(
    itm => itm.id,
  );
  const clearedArray = JSON.parse(localStorage.getItem(clear));

  if (!clearedArray) return;
  const array = JSON.parse(localStorage.getItem(clear)).filter(
    item => !checkedArray.includes(item.id),
  );
  localStorage.setItem(clear, JSON.stringify(array));
}

export { addItem };
