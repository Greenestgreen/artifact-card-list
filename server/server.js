const express = require('express') ;
// const http = require('http');
const path = require('path');
var mustacheExpress = require('mustache-express');
var request = require('request');
var {updateAllDecks} = require('./utils/deck-request');
var cache = require('memory-cache');

const port = process.env.PORT || 3000;
var app = express();
// var server = http.createServer(app);

// Register '.html' extension with The Mustache Express
// app.engine('html', mustacheExpress());
// app.set('view engine','mustache');
//
// app.set('views', __dirname + '/views');

//const publicPath = path.join(__dirname, '/public');
//app.use('/', express.static(publicPath));

app.use(function (req, res, next) {
  updateAllDecks(next);
});

app.get('/', (req, res) => {
  res.send('hola');
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
