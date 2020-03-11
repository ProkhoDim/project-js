import router from './router';

// Спочатку додаємо імена роутів на які можна пройти, далі передаємо колбек функцію, яка визветься при переході на роут
router
  .add('my-library', function() {
    console.log('Library');
  })
  .add('home', function() {
    console.log('home');
  })
  .add(function() {
    console.log('default');
  });

//Викликаємо перевірку адресної строки браузера, чи маємо такий роут, якщо маємо виконуємо колбек, якщо ні виконується колбек без імя роута (Останній)
router.check(location.href);

const logo = document.querySelector('.logo-link');
const menu = document.querySelector('#menu');

// Важливо, тепер евент лістнер викликає тільки перезапис адресної строки, а вже роутер сам колбек, аргументи в колбек передаються через адресну строку
logo.addEventListener('click', event => {
  event.preventDefault();
  location.replace(event.currentTarget.href);
});

menu.addEventListener('click', event => {
  event.preventDefault();
  if (event.currentTarget === event.target) return;
  console.log('clsic');
  location.replace(event.target.href);
});
