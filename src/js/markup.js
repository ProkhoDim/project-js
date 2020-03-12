import refs from './refs';

function insertItems(items, template) {
  const markup = template(items);
  refs.mainContent.insertAdjacentHTML('beforeend', markup);
}

function clear(container) {
  container.innerHTML = '';
}

function hideItem(item) {
  item.classList.add('hidden');
}

function sowHiddenItem(item) {
  item.classList.remove('hidden');
}

export { insertItems, clear, hideItem, sowHiddenItem };
