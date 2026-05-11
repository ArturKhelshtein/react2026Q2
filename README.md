# React + TypeScript + Vite

## RS school курс https://rs.school/courses/reactjs

Проект для курса RS School по React. Это React-приложение на TypeScript, собранное с помощью Vite.
В проекте реализован поиск покемонов через PokeAPI, отображение результатов, обработка ошибок и сохранение поискового запроса в `localStorage`.

### О проекте

Приложение позволяет:

- выполнять поиск покемонов по названию;
- отображать список найденных покемонов;
- показывать состояние загрузки;
- обрабатывать ошибки API;
- сохранять последний поисковый запрос в `localStorage`;
- демонстрировать работу `ErrorBoundary`.

### Технологии

- React 19
- TypeScript
- Vite
- Vitest
- React Testing Library
- User Event
- ESLint
- Husky

### Основные возможности

- Компонентная структура на классах
- Поиск покемонов через PokeAPI
- Локальное сохранение поискового запроса
- Обработка ошибок через `ErrorBoundary`
- Unit-тесты для основных компонентов
- Coverage-отчёт по тестам

## Установка

`npm install`

### Доступные скрипты

`npm run dev` Запуск приложения в режиме разработки.
`npm run build` Сборка проекта для production.
`npm run preview` Локальный просмотр production-сборки.
`npm run lint` Проверка кода ESLint.
`npm run test` Запуск unit-тестов в Vitest.
`npm run test:coverage` Запуск тестов с отчётом покрытия.

### Развернуто

https://arturkhelshtein.github.io/react2026Q2/