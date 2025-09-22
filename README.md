# Работа с Javascript

## Срок сдачи работ

Последний коммит и пул реквест должен быть оформлен до 20.09.2025

## Цель:

Научиться использовать базовые концепции JavaScript для создания интерактивного калькулятора на основе готовой HTML/CSS вёрстки.

## Теория

### -1. Освежите воспоминания

[HTML Academy JS модуль](https://htmlacademy.ru/courses/343/run/1)
[TLDR по JS](https://learnxinyminutes.com/ru/javascript/)

### 0. Подключение Javascript

#### 1. Встроенный скрипт (inline)

Добавьте тег `<script>` прямо в HTML-файл.

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Пример</title>
    </head>
    <body>
        <script>
            alert("Привет, мир!") // Код выполнится сразу после загрузки страницы
        </script>
    </body>
</html>
```

#### 2. Внешний файл (рекомендуется)

Подключите отдельный файл с расширением .js через атрибут src тега `<script>`.

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Пример</title>
    </head>
    <body>
        <!-- Подключение в конце body — чтобы DOM успел загрузиться -->
        <script src="scripts.js"></script>
    </body>
</html>
```

#### 3. Атрибуты async и defer (для оптимизации загрузки)

-   `async`: Скрипт загружается асинхронно и выполняется сразу после загрузки.
-   `defer`: Скрипт загружается асинхронно, но выполняется после полной загрузки DOM.

```html
<script src="scripts.js" defer></script>
<!-- Лучший вариант для большинства случаев -->
<script src="analytics.js" async></script>
<!-- Для скриптов, не зависящих от DOM -->
```

**В случае с этим заданием либо подключайте тег в `head` с использованием `defer`, либо в конце `body` без дополнительных тегов**

#### 4. Обработчики событий в HTML (не рекомендуется, но полезно знать)

Код можно добавить прямо в атрибуты HTML-элементов (например, onclick).

```html
<button onclick="alert('Кнопка нажата!')">Нажми меня</button>
```

### 1. **Доступ к элементам через `querySelector`**

Используйте `document.querySelector()` или `document.querySelectorAll()` для поиска элементов в DOM.  
Примеры:

```javascript
// Получить элемент по классу
const button = document.querySelector(".submit-btn")

// Получить все элементы с тегом input
const inputs = document.querySelectorAll("input")
```

### 2. **Слушатели событий**

Добавляйте реакции на действия пользователя через `addEventListener`.  
Пример: кнопка "Лайк" увеличивает счетчик:

```javascript
const likeButton = document.querySelector(".like-btn")
let likesCount = 0

likeButton.addEventListener("click", () => {
    likesCount++
    document.querySelector(".likes-counter").textContent = likesCount
})
```

**Однако это не лучший подход. Для создание callback'ов (функция обратного вызова) желательно использовать именованые функции, что и использовать в этом задании**

```javascript
const likeButton = document.querySelector(".like-btn")
let likesCount = 0

function handleLike() {
    likesCount++
    document.querySelector(".likes-counter").textContent = likesCount
}

likeButton.addEventListener("click", handleLike)
```

> [!WARNING]
> В данном задании желательно использовать цикл для добавления коллбэков на все кнопки

```javascript
const buttons = document.querySelectorAll('.calc-btn');

let currentExpression = ''; // Текущее выражение

// button в данном случае будет передаваться СОБЫТИЕ НАЖАТИЕ, где можно будет узнать кнопку по которой нажали через target и из которой можно будет доставать её значение
function handleButton(button) {
    const value = button.target.textContent; // Получаем текст кнопки (например, "5", "+")

    // Обработка разных типов кнопок
    if (value === '=') {
      // Вызов функции вычисления
    } else if (value === 'C') {
      // Очистка дисплея
    } else {
      // Добавляем значение к текущему выражению
      // Изменение HTML элемента на экране на текущее значение
    }
  });
}

// Для каждой кнопки добавляем обработчик клика
buttons.forEach(button => {
  button.addEventListener('click', handleButton);
```

### 3. **Работа с содержимым элементов**

Используйте свойства `textContent`, `innerHTML` или `value` (для полей ввода).  
Пример: обновление имени пользователя:

```javascript
const nameInput = document.querySelector("#name-input")
const nameOutput = document.querySelector("#name-output")

nameInput.addEventListener("input", () => {
    nameOutput.textContent = nameInput.value || "Гость"
})
```

### 4. Вычисление результата через eval()

Метод eval() выполняет строку как JavaScript-код

**eval() опасен в реальных проектах (риск XSS-атак)**

```javascript
const result = eval("1 + 1 * 2") // строка превращается в JS код и получаем результат 3
```

### 5. Символы умножения и деления

В связи с тем, что эти символы не являются символами математических операций (именно те, что указаны в верстке), то их необходимо изменить перед вызовом функции, которая будет проводить рассчет (`eval`)

```javascript
const input = "5×5"
const res = eval(input.replaceAll("×", "*"))
```

_`replaceAll` вызывается на строке и позволяет заменить все подстроки, которые указываются первыми на те, которые указаны вторыми_

`replaceAll` возвращает строку, в которой были заменены подстроки, соответственно их можно вызывать последовательно (чейнить)

```javascript
const res = "Hello world".replaceAll("e", "x").replaceAll("o", "x")
```

### 6. Кнопка `+/-`

Перед тем проведением операции замены знака числа необходимо провести рассчет

`1+1` юзер жмет `+/-`, мы высчитываем результат `2` и добавляем знак в начале, то есть `-2`

### 7. Кнопка `%`

Если написано выражение, то необходимо посчитать его и поставить знак процента после результата

`100 + 100` юзер жмет `%` в ответе появляется `200%` дальше юзер пишет допустим `5` и мы считаем `5` процентов от `200`

#### Получение результат

```javascript
const numbers = input.textContent.split("%")
const res = (numbers[0] / 100) * numbers[1]
```

_Мы бьем строку на 2 части (первое и второе число) при помощи `split` (то есть создаем массив `["200", "5"]`, а потом вычисляем значение_

### **Советы по отладке**

-   Используйте `console.log()` для вывода значений переменных.
-   Проверяйте элементы через инструменты разработчика (F12).
-   Тестируйте обработчики событий пошагово.

## Как сдавать

1. Создайте форк репозитория в организации `21ISR` с названием `uidev-lab15-вашафамилия`
2. Используя ветку `wip` сделайте задание
3. Зафиксируйте изменения в вашем репозитории
4. Когда документ будет готов - создайте пул реквест из ветки `wip` (вашей) на ветку `main` (тоже вашу) и укажите меня ([ktkv419](https://github.com/ktkv419)) как reviewer

**Не мержите сами коммит**, это сделаю я после проверки задания
