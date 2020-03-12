import apiService from './apiService';
import cardsList from '../templates/cardsList.hbs';
import pagination from '../templates/search-page-templates/pagination.hbs';
import searchForm from '../templates/search-page-templates/search-form.hbs';

function getURL() {
  const currentUrl = new URL(location);
  return currentUrl.pathname.split('/').join('');
}

const menu = document.querySelector('#menu');
const jsResult = document.querySelector('.js-result');

function setURL(str) {
  const currentUrl = new URL(location);
  currentUrl.pathname = '/' + str;
  return location.assign(currentUrl.pathname);
}

menu.addEventListener('click', e => {
  e.preventDefault();
  if (e.currentTarget === e.target) return;
  setURL(e.target.pathname.split('/').join(''));
});

async function markup() {
  if (!getURL() || getURL() === 'home') {
    const data = await apiService.getPopularMovies();
    const html = await cardsList(data);
    return jsResult.insertAdjacentHTML(
      'beforeend',
      searchForm() + html + pagination(apiService),
    );
  }
}

markup();
