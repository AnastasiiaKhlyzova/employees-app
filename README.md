# Приложение для управления данными сотрудников

# Ссылка на задеплоенный проект

https://employees-app-nine.vercel.app/

## Описание

Одностраничное приложение для просмотра и редактирования данных сотрудников компании. Приложение позволяет фильтровать и сортировать список сотрудников, редактировать их данные и добавлять новых сотрудников.

## Функциональность

- Отображение списка сотрудников с именем, должностью и телефоном
- Фильтрация сотрудников по должности и статусу (в архиве/активные)
- Сортировка списка по имени и дате рождения
- Редактирование данных сотрудников
- Добавление новых сотрудников
- Валидация форм
- Адаптивный дизайн

## Технологии

- React 18
- Redux (Redux Toolkit)
- TypeScript
- React Router
- SCSS для стилизации
- Jest и React Testing Library для тестирования
- Vite для сборки проекта

## Установка и запуск

### Предварительные требования

- Node.js (версия 16 или выше)
- npm (версия 8 или выше)

### Установка зависимостей

npm install

### Запуск в режиме разработки

npm run dev

Приложение будет доступно по адресу [http://localhost:5173](http://localhost:5173)

### Сборка для продакшена

npm run build

### Запуск тестов

npm test

## Особенности реализации

- Используется Redux для управления состоянием приложения
- Реализована валидация форм с информативными сообщениями об ошибках
- Адаптивный дизайн для корректного отображения на разных устройствах
- Покрытие кода тестами для обеспечения стабильности работы
- Типизация с использованием TypeScript для предотвращения ошибок во время разработки

## Тестирование

Проект включает модульные тесты для компонентов и логики Redux. Тесты написаны с использованием Jest и React Testing Library.
