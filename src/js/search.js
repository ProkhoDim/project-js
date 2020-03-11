import apiService from './apiService';
import searchListTemplate from '../templates/cardsList.hbs';
import movieDetails from '../templates/single-movie-template.hbs';

const refs = {
  searchInput: document.querySelector('#search-form_input'),
  mainContent: document.querySelector('.main_content'),
};

refs.searchInput.addEventListener('keypress', event => {
  const inputValue = refs.searchInput.value;

  if (event.keyCode === 13) {
    event.preventDefault();

    apiService.getSearchedMovie(inputValue).then(data => {
      clear(refs.mainContent);
      insertItems(data, searchListTemplate);
    });
  }
});

refs.mainContent.addEventListener('click', event => {
  event.stopPropagation();
  const movieId = event.target.parentElement.dataset.id;
  if (movieId === undefined) return;

  apiService.getMovie(movieId).then(data => {
    clear(refs.mainContent);
    insertItems(data, movieDetails);
  });
});

function insertItems(items, template) {
  const murkup = template(items);
  refs.mainContent.insertAdjacentHTML('beforeend', murkup);
}

function clear(container) {
  container.innerHTML = '';
}
