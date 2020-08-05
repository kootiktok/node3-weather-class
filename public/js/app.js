console.log('js client running');

const elements = {
  searchForm: document.querySelector('.search-form'),
  searchButton: document.querySelector('.search-btn'),
  searchInput: document.querySelector('.search-input'),
  locationText: document.getElementById('message-1'),
  weatherText: document.getElementById('message-2'),
};

elements.searchForm.addEventListener('submit', (event) => {
  event.preventDefault();

  elements.locationText.textContent = '';
  elements.weatherText.textContent = '';

  const searchValue = elements.searchInput.value;

  fetch(`http://127.0.0.1:3000/weather?search=${searchValue}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          console.log(data.error);
          elements.locationText.textContent = `${data.error}`;
          elements.weatherText.textContent = `${data.error}`;
        } else {
          console.log(data.location);
          console.log(data.weather);
          elements.locationText.textContent = `${data.location}`;
          elements.weatherText.textContent = `It is ${data.weather.description}. Current temperature is ${data.weather.temperature} celcius and it feels like ${data.weather.feelsLike} celcius.`;
        }
      });
    }
  );
});
