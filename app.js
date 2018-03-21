const express = require('express');

const app = express();

app.use(express.static(__dirname + '/public'));

// Routes
app.get('/', (req, res) => {
  res.send('Hello Express!');
});
app.get('/about', (req, res) => {
  res.send('About page');
});
app.get('/bad', (req, res) => {
  res.send({
    message: 'Page not found'
  });
});

app.listen('9000');