import apiService from './apiService';
import refs from './refs';
import movieDetails from '../templates/single-movie-template.hbs';
import { insertItems, clear, hideItem } from './markup';
import * as localStor from './localStorage';

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
      const btnWatched = document.querySelector('.button_watched');
      localStor.addItem(btnWatched, 'watchedIds', 'watchLaterIds');
      localStor.addItem(btnWatchLater, 'watchLaterIds', 'watchedIds');
      // btnWatched.addEventListener(
      //   'click',
      //   localStor.addItem.call(Event, 'watchedIds'),
      // );
      // btnWatchLater.addEventListener('click', localStor.addWatchLaterItem);
      // btnWatched.addEventListener('click', localStor.addWatchedItem);
    });
});
