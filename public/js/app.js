console.log('js client running');

const elements = {
  searchForm: document.querySelector('.search-form'),
  searchButton: document.querySelector('.search-btn'),
  searchInput: document.querySelector('.search-input'),
  locationText: document.getElementById('message-1'),
  weatherText: document.getElementById('message-2'),
  weatherCard: document.querySelector('.weather-card'),
};

if (elements.searchForm) {
  elements.searchForm.addEventListener('submit', (event) => {
    event.preventDefault();

    elements.locationText.textContent = '';
    elements.weatherText.textContent = '';
    const weatherPicElement = document.getElementById('icon-1');
    if (weatherPicElement) {
      weatherPicElement.parentElement.removeChild(weatherPicElement);
    }

    const searchValue = elements.searchInput.value;

    fetch(`/weather?search=${searchValue}`).then((response) => {
      response.json().then((data) => {
        if (data.error) {
          elements.locationText.textContent = `${data.error}`;
          elements.weatherText.textContent = `${data.error}`;
        } else {
          const markup = `<img class= "card-title" src="${data.weather.weatherIcon}" alt="weather icon" id="icon-1">`;
          elements.weatherCard.insertAdjacentHTML('afterbegin', markup);
          elements.locationText.textContent = `${data.location}`;
          elements.weatherText.textContent = `It is ${data.weather.description}. Current temperature is ${data.weather.temperature} celcius and it feels like ${data.weather.feelsLike} celcius.`;
        }
      });
    });
  });
}
