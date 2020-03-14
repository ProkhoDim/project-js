// export function addWatchLaterItem(e) {
//   if (e.currentTarget !== e.target) return;
//   const LocalStorIdsdArr = JSON.parse(localStorage.getItem('watchLaterIds'));
//   const movieId = this.dataset.id;
//   console.dir(this);

//   if (!LocalStorIdsdArr) {
//     localStorage.setItem('watchLaterIds', JSON.stringify([movieId]));
//   } else if (!LocalStorIdsdArr.includes(movieId)) {
//     localStorage.setItem(
//       'watchLaterIds',
//       JSON.stringify(LocalStorIdsdArr.concat(movieId)),
//     );
//   }
// }

// export function addWatchedItem(e) {
//   if (e.currentTarget !== e.target) return;
//   const LocalStorIdsdArr = JSON.parse(localStorage.getItem('watchedIds'));
//   const movieId = this.dataset.id;

//   if (!LocalStorIdsdArr) {
//     localStorage.setItem('watchedIds', JSON.stringify([movieId]));
//   } else if (!LocalStorIdsdArr.includes(movieId)) {
//     localStorage.setItem(
//       'watchedIds',
//       JSON.stringify(LocalStorIdsdArr.concat(movieId)),
//     );
//   }
// }

export function addItem(elem, currentKey, checkedKey) {
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
  console.log(!!LocalStorIdsdArr);

  if (!LocalStorIdsdArr) {
    localStorage.setItem(key, JSON.stringify([movieId]));
  } else if (!LocalStorIdsdArr.includes(movieId)) {
    localStorage.setItem(key, JSON.stringify(LocalStorIdsdArr.concat(movieId)));
  }
}

function rewrightLocalStorage(check, clear) {
  const checkedArray = JSON.parse(localStorage.getItem(check));
  const clearedArray = JSON.parse(localStorage.getItem(clear));

  if (!clearedArray) return;
  const array = clearedArray.filter(item => !checkedArray.includes(item));
  return localStorage.setItem(clear, JSON.stringify(array));
}
