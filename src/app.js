const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const getWeather = require('./utils/weather.js');

const app = express();

const publicDirectory = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectory));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Homepagess',
    name: 'Tanat Tanalai',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'about pagess',
    name: 'Tanat Tanalai',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help pagess',
    name: 'Tanat Tanalai',
  });
});

app.get('/weather', (req, res) => {
  const search = req.query.search;
  if (!req.query.search) {
    return res.send({ error: 'Please provide search result' });
  }

  geocode(search, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    getWeather(latitude, longitude, (error, weather) => {
      if (error) {
        res.send({ error });
      }
      res.send({ location, weather });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('error', {
    errorMessage: 'Help article not found',
  });
});
app.get('*', (req, res) => {
  res.render('error', {
    errorMessage: 'Page not found',
  });
});

app.listen(3000, () => {
  console.log('app start');
});
