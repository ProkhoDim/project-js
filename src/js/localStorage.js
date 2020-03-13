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

export function addItem(elem, localStorageKey, checkingParam) {
  elem.addEventListener('click', e => {
    if (e.currentTarget !== e.target) return;
    const LocalStorIdsdArr = JSON.parse(localStorage.getItem(localStorageKey));
    const movieId = e.target.dataset.id;
    console.log(!!LocalStorIdsdArr);
    if (!LocalStorIdsdArr) {
      localStorage.setItem(localStorageKey, JSON.stringify([movieId]));
    } else if (!LocalStorIdsdArr.includes(movieId)) {
      localStorage.setItem(
        localStorageKey,
        JSON.stringify(LocalStorIdsdArr.concat(movieId)),
      );
    }
    if (checkingParam) checkLocalStorage(localStorageKey, checkingParam);
  });
}

function checkLocalStorage(checkParam, clearParam) {
  const checkingArray = JSON.parse(localStorage.getItem(checkParam));
  const clearingArray = JSON.parse(localStorage.getItem(clearParam));

  if (!clearingArray) return;
  const array = clearingArray.filter(item => !checkingArray.includes(item));
  return localStorage.setItem(clearParam, JSON.stringify(array));
}
