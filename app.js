const express = require('express');
const hbs = require('hbs');

const app = express();

const port = process.env.port || 9000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

// Routes
app.get('/', (req, res) => {
  res.render('home.hbs', {
    title: 'Home page',
    body: 'Welcome to Express site!',
  });
});
app.get('/about', (req, res) => {
  res.render('about.hbs', {
    title: 'About page',
    body: 'This is a body',
  });
});
app.get('/bad', (req, res) => {
  res.send({
    message: 'Page not found'
  });
});

app.listen(port, () => {
  console.log(`App is launched on port ${port}`);
});