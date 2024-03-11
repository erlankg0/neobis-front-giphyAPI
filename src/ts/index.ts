import {search, GiphyData} from "./network";


// Получение ссылок на необходимые элементы DOM
const label = document.querySelector('.header__search-label');
const input = document.getElementById('search') as HTMLInputElement;
const giftsContainer = document.getElementById('gifts') as HTMLElement;

// Функция для обработки поискового запроса
const handleClickSearch = async () => {
    const inputValue = input.value.trim();
    // Проверка, что введенный запрос содержит более одного символа
    if (inputValue.length > 1) {
        // Выполнение поиска по введенному запросу
        const searchData = await search(inputValue);
        return searchData.data.data;
    }
    // В случае, если запрос содержит менее одного символа, выполняется случайный поиск
    const randomData = await search(`Frontend`);
    return randomData.data.data;
};

// Функция для отображения данных в подарках
const renderGifts = (data: GiphyData[]) => {
    input.value = '';

    // Очистка контейнера для подарков перед отображением новых данных
    giftsContainer.innerHTML = '';
    // Перебор полученных данных и создание соответствующих элементов DOM для каждого гифа
    console.log(data);
    data.forEach(gif => {
        console.log(gif.images.original.url);
        const giftElement = document.createElement('div');
        giftElement.classList.add('gift');

        const imageElement = document.createElement('img');
        imageElement.src = gif.images.original.url;
        imageElement.alt = gif.title;

        giftElement.appendChild(imageElement);
        giftsContainer.appendChild(giftElement);
    });
};

// Обработчик клика на кнопке поиска
const handleSearchClick = async () => {
    // Выполнение поискового запроса и отображение результатов
    const searchData = await handleClickSearch();
    renderGifts(searchData);
};

// Добавление слушателя события клика на кнопку поиска
if (label) {
    label.addEventListener('click', handleSearchClick);
}

// Добавление слушателя события нажатия клавиши Enter при фокусе на поле ввода
input.addEventListener('keypress', async event => {
    if (event.key === 'Enter') {
        await handleSearchClick();
    }
});

// Загрузка данных при загрузке страницы
document.addEventListener('DOMContentLoaded', async () => {
    await handleSearchClick();
});
