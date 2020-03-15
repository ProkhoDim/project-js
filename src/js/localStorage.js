import * as data from './objToLocalStor';

function addItem(elem, currentKey, checkedKey) {
  elem.addEventListener('click', e => {
    if (e.currentTarget !== e.target) return;
    setLocalStorageIdsOnClick(e, currentKey);

    if (!checkedKey) return;
    rewrightLocalStorage(currentKey, checkedKey);
  });
}

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
