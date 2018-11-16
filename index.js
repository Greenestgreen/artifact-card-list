const express = require('express') ;
const http = require('http');
const path = require('path');
var mustacheExpress = require('mustache-express');
var request = require('request');
var {getCards} = require('./request/cards');

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
 
// Register '.html' extension with The Mustache Express
app.engine('html', mustacheExpress());
app.set('view engine','mustache');

app.set('views', __dirname + '/views');

const publicPath = path.join(__dirname, '/public');
app.use('/', express.static(publicPath));



app.get('/',(req, res) => {

  getCards().then((completeSet) => {

    res.render('index.html',{
      cards: completeSet
    });
  });
});


server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
