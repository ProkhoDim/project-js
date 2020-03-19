# Project-JS

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Requirements

- node = 10.16.3
- npm = 6.9.0

# В первую очередь!

- Переходим по этой ссылке: https://github.com/ProkhoDim/project-js/invitations
  - Жмём "Accept invitation" - это добавит вас в список людей, которые могут
    пушить на репозиторий. (иначе - дудки)

# Порядок работы с Гит-ветками

- Выкачиваем репозиторий к себе:

```plain
git clone https://github.com/ProkhoDim/project-js.git
```

- переходим в локальный репозиторий:

```plain
cd GoITLanding
```

или

```plain
ПКМ во вкладке Explorer --> Open in Terminal
```

- переходим в ветку dev:

```plain
git checkout dev
```

- пулим все изменения из dev:

```plain
git pull
```

- создаём из ветки 'dev' ветку, в которой будете работать(ветки 'dev' и 'master'
  заблокированы для пушов, поэтому при git push в них просто выдаст error):

```plain
git checkout -b имя_вашей_ветки
```

или

- переходим в рабочую ветку, отличную от dev:

```plain
git checkout имя_рабочей_ветки
```

- Делаем свои дела не портя работу других и не засоряя лишними коммитами гитхаб
- По окончанию работы делаем финальный коммит и пушим его

# Использование Commitizen:

- `git add` и необходимый параметр(имя папки, файла, или точка)
- `npm run commit`
- Выбираем тип изменений и дальше по инструкции

# ВНИМАНИЕ!!

первый пуш "вашей_ветки" обязательно должен быть таким! это свяжет локальную
ветку с удалённой.

```plain
git push -u origin имя_вашей_ветки
```

- заходим на GitHub
- нажимаем кнопку "Compare & pull request"

# !

- в новом окне проверяем, чтобы ПЕРВЫЙ выпадающий список был 'base:dev'.

# !

- пишем комментарии(если нужно), жмём 'Create pull request' и ждём ревью
- после проверки кода пулл-реквест будет залит в 'dev' и ветка будет удалена.
- по всем вопросам пишите в Slack или звоните по номеру: +380982365318

# Webpack starter kit

[Живая страница](https://luxplanjay.github.io/webpack-starter-kit/) после деплоя
через `npm run deploy`.

## Использование

- Скачать репо как архив
- Переименовать папку под свой проект
- В консоли перейти в корень проекта
- Выполнить команду `npm install`
- Ждать пока установятся все зависимости

## Скрипты

- `npm start` - запускает режим разработки с дев-сервером.
- `npm run build` - запускает режим сборки в прод, создастся папка `build`.
- `npm run deploy` - запускает сборку в прод, после чего деплоит проект на
  GitHub Pages в репозиторий из свойства `homepage` в `package.json`.
  Автоматически создает ветку `gh-pages` в репозитории. Значение `homepage`
  необходимо подменить вручную на свой репозиторий.

## Папки и файлы

- `src` - тут лежат исходники.
- `src/index.html` - шаблон под html-файл, можно редактировать. В продакшене
  сюда автоматически добаввятся теги `link` и `script`.
- `src/index.js` - точка входа в приложение, сюда импортируем все остальное.
- `build` - автоматически создастся в продакшене, тут будут готовые файлы.