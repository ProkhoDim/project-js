import apiService from './apiService';
import refs from './refs';
import movieDetails from '../templates/single-movie-template.hbs';
import { insertItems, clear, hideItem } from './markup';

refs.mainContent.addEventListener('click', event => {
  event.stopPropagation();
  const movieId = event.target.parentElement.dataset.id;
  if (!movieId) return;

  apiService
    .getMovie(movieId)
    .then(data => {
      clear(refs.mainContent);
      //   hideItem(refs.searchForm);
      hideItem(refs.pagination);
      insertItems(data, movieDetails);
    })
    .then(() => {
      const btnWatchLater = document.querySelector('.button_later');

      btnWatchLater.addEventListener('click', event => {
        const LocalStorIdsdArr = JSON.parse(localStorage.getItem('ids'));
        const movieId = btnWatchLater.parentElement.dataset.id;
        const watchLaterIdsArr = [];

        if (LocalStorIdsdArr === null) {
          watchLaterIdsArr.push(movieId);
          localStorage.setItem('ids', JSON.stringify(watchLaterIdsArr));
        } else if (!LocalStorIdsdArr.includes(movieId)) {
          watchLaterIdsArr.push(...LocalStorIdsdArr);
          watchLaterIdsArr.push(movieId);
          localStorage.setItem('ids', JSON.stringify(watchLaterIdsArr));
        }

        btnWatchLater.removeEventListener;
      });
    });
});
