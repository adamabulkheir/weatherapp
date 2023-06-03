const searchInput = document.getElementById('search-input');

searchInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        console.log('enter');

        const cityName = searchInput.value.trim();

        axios
            .get('https://api.openweathermap.org/data/2.5/forecast', {
                params: {
                    q: cityName,
                    appid: '17ac85745bd3acad3a06db3b59ee84a0',
                    units: 'imperial'
                }
            })
            .then(function (response) {
                const forecastData = response.data;

                displayForecast(forecastData);
            })
            .catch(function (error) {
                console.log(error);

            });
    }
});
function displayForecast(apiResponse) {
    const forecastCardsContainer = document.querySelector('.forecast-cards');

    forecastCardsContainer.innerHTML = '';


    const forecastsByDay = {};


    apiResponse.list.forEach(forecast => {

        const date = forecast.dt_txt.split(' ')[0];

        if (!forecastsByDay[date]) {

            forecastsByDay[date] = forecast;
        }
    });
    Object.values(forecastsByDay).forEach(forecast => {
        const card = document.createElement('div');
        card.classList.add('card');

        const cardHeader = document.createElement('div');
        cardHeader.classList.add('card-header');

        const cardTitle = document.createElement('h2');
        cardTitle.classList.add('card-title');

        const date = new Date(forecast.dt_txt);
        cardTitle.textContent = date.toDateString();

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const temperature = document.createElement('p');
        temperature.innerHTML = `Temperature: <span class="temperature">${forecast.main.temp}°C</span>`;

        const wind = document.createElement('p');
        wind.innerHTML = `Wind: <span class="wind">${forecast.wind.speed} km/h</span>`;

        const humidity = document.createElement('p');
        humidity.innerHTML = `Humidity: <span class="humidity">${forecast.main.humidity}%</span>`;

        cardHeader.appendChild(cardTitle);
        cardBody.appendChild(temperature);
        cardBody.appendChild(wind);
        cardBody.appendChild(humidity);

        card.appendChild(cardHeader);
        card.appendChild(cardBody);

        forecastCardsContainer.appendChild(card);
    });
}