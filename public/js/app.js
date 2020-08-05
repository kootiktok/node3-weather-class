console.log('js client running');

const elements = {
  searchForm: document.querySelector('.search-form'),
  searchButton: document.querySelector('.search-btn'),
  searchInput: document.querySelector('.search-input'),
  locationText: document.getElementById('message-1'),
  weatherText: document.getElementById('message-2'),
};

if (elements.searchForm) {
  elements.searchForm.addEventListener('submit', (event) => {
    event.preventDefault();

    elements.locationText.textContent = '';
    elements.weatherText.textContent = '';

    const searchValue = elements.searchInput.value;

    fetch(`/weather?search=${searchValue}`).then((response) => {
      response.json().then((data) => {
        if (data.error) {
          elements.locationText.textContent = `${data.error}`;
          elements.weatherText.textContent = `${data.error}`;
        } else {
          elements.locationText.textContent = `${data.location}`;
          elements.weatherText.textContent = `It is ${data.weather.description}. Current temperature is ${data.weather.temperature} celcius and it feels like ${data.weather.feelsLike} celcius.`;
        }
      });
    });
  });
}
