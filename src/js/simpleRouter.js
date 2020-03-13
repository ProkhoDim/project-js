import apiService from './apiService';
import cardsList from '../templates/cardsList.hbs';
import pagination from '../templates/search-page-templates/pagination.hbs';
import searchForm from '../templates/search-page-templates/search-form.hbs';
import libraryPage from '../templates/library_page.hbs';

function getURL(index) {
  const currentUrl = new URL(location);
  const array = currentUrl.pathname.slice(1).split('/');
  return array[index];
}

const menu = document.querySelector('#menu');
const jsResult = document.querySelector('.js-result');

function setURL(str) {
  const currentUrl = new URL(location);
  const vaiable = objUrl(currentUrl.pathname);
  console.log(vaiable);
  if (!vaiable.category) currentUrl.pathname += '/' + str;
  console.log(currentUrl.pathname);
  if (vaiable.page) console.log('page', vaiable.page);
  // if (!currentUrl.pathname.includes(str)) currentUrl.pathname += '/' + str;
  return location.assign(currentUrl.pathname);
}

menu.addEventListener('click', e => {
  e.preventDefault();
  if (e.currentTarget === e.target) return;
  setURL(e.target.pathname.split('/').join(''));
});

async function markup() {
  console.log(getURL(0));
  if (!getURL(0) || getURL(0) === 'home') {
    const data = await apiService.getPopularMovies();
    const html = await cardsList(data);
    return jsResult.insertAdjacentHTML(
      'beforeend',
      searchForm() + html + pagination(apiService),
    );
  }

  if (getURL(0) === 'my-library') {
    console.log('library');
    jsResult.insertAdjacentHTML('afterbegin', libraryPage());
    if (getURL(1) === 'watched') {
      const data = apiService.getListOfLibraryMovie('watched');
      jsResult.insertAdjacentHTML('beforeend', cardsList(data));
    }
  }
}

markup();

function objUrl(str) {
  const strAsArr = str.slice(1).split('/');
  const category = strAsArr[0];
  const secondParam = strAsArr[1];
  const thirdParam = strAsArr[2];
  let page, query, id;
  if (category === 'movie') id = secondParam;
  if (category === 'home') page = secondParam;
  if (category === 'search') {
    query = secondParam;
    page = thirdParam;
  }

  console.log(category, page);
  return { category, page, id, query };
}

console.log(objUrl('/movie/13932'));
console.log(objUrl('/search/jack+reacher/3'));
