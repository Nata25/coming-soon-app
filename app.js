const express = require('express');
const hbs = require('hbs');
const moment = require('moment');

const app = express();

const port = process.env.PORT || 9000;

// helper functions for results page
const calcColor = () => {
  return Math.floor(Math.random() * 250);
}
const generateRGB = () => `rgb(${calcColor()}, ${calcColor()}, ${calcColor()})`;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('shorten', str => str.slice(3));

hbs.registerHelper('setEnding', days => {
  if (days === 1) return `${days} day`;
  else return `${days} days`;
});

// Routes
app.get('/', (req, res) => {
  res.render('home.hbs', {
    title: 'Don\'t wait too long!',
    color: generateRGB()
  });
});
app.get('/calculate', (req, res) => {
  res.render('calculate.hbs', {
    title: 'A date you can\'t wait for is ...',
  });
});
app.get('/result', (req, res) => {
  const now = moment(new Date()); 
  const end = moment(req.query.to); 
  const duration = moment.duration(end.diff(now));
  const days = Math.floor(duration.asDays());
  const hours = moment().endOf('day').fromNow();
  
  if (days >= 0) {
    res.render('results.hbs', {
      title: 'Here we go!',
      days,
      hours,
      color: generateRGB()
    });
  } else {
    res.render('error.hbs', {
      title: 'Error occured!'
    });
  }
});

app.listen(port, () => {
  console.log(`App launched on port ${port}...`);
});