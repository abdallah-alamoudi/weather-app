const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../config/.env'),
});
const express = require('express');
const hbs = require('hbs');

const getWeatherData = require('./utils/getWeatherData');
const app = express();
const port = process.env.PORT;

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../template/views'));
hbs.registerPartials(path.join(__dirname, '../template/partials'));

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', async (req, res) => {
  res.render('index');
});
app.get('/weather', async (req, res) => {
  try {
    const address = req.query.address;
    const weatherData = await getWeatherData(address);
    res.send(weatherData);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});
app.get('/about', async (req, res) => {
  res.render('about');
});
app.get('/help', async (req, res) => {
  res.render('help');
});
app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
