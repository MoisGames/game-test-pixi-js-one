# GameTestPixiJsOne
Версия Node 18.20.5

Небольшое демо игровое приложение на ванильном JS, демонстрирующее работу с Pixi js.
У нас есть карта на которйо расположены точки, возле надписи `ПЕРВЫЙ КУРС` стоит модель девушки,
при нажатии на нижней части экрана, по кнопке `В УНИВЕР`, происходит переход девушки к следующей точке,
всего программируемых точек 5.

Так же в нижней части первым идет слайдер друзей, который перемещается влево и вправо по массиву при нажатии
по стрелочкам `ВЛЕВО` и `ВПРАВО`, по 1 другу.

Последней оживленной кнопкой в данном приложении является кнопка `РЕЙТИНГ` (в правом нижнем углу). При ее нажатии,
сверху плавно выезжает окно `РЕЙТИНГ ИГРОКОВ`, в котором рендерится список игроков из массива data.js,
если игрок наш друг, цвет его блока `ФИОЛЕТОВЫЙ`, справа вверху есть кнопка `X`, которая закрывает окно рейтинга.


## Development server

Для запуска сервера:

```cmd
npm run dev
```

После запуска сервера откройте браузер и перейдите по адресу `http://localhost:5173/`. Приложение будет автоматически перезагружаться всякий раз, когда вы изменяете любой из исходных файлов.

## Remote / Install
Чтобы создать клон репозитория в командной строке:
```cmd
git clone https://github.com/MoisGames/game-test-pixi-js-one.git
```

Чтобы запустить приложение: В терминале введите `npm run dev` Нажмите Enter
