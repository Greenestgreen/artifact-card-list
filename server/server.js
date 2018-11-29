const express = require('express');
const path = require('path');
var mustacheExpress = require('mustache-express');
var request = require('request');
//var dq = require('./utils/deck-request');
var cache = require('memory-cache');
var {Deck} = require('./models/deck');
var {Card} = require('./models/card');
var {mongoose} = require('./db/mongoose');

const port = process.env.PORT || 3000;
var app = express();

// Register '.html' extension with The Mustache Express
app.engine('html', mustacheExpress());
app.set('view engine','mustache');

app.set('views', __dirname + '/../views');

const publicPath = path.join(__dirname, '/../public');
app.use('/', express.static(publicPath));

// app.use(function (req, res, next) {
//
//   if (req.path === '/favicon.ico') {
//     return next();
//   }
//
//   dq.updateAllDecks(next, res);
//
// });

app.get('/',(req, res) => {
      res.render('index.html');
});

app.get('/cards',(req, res) => {
    Card.find({type: {$nin:['Ability','Pathing','Stronghold','Passive Ability'] }}).sort({type:1}).then((cards) => {
      res.render('cards.html',{
        cards:cards
      });
    });
});


app.get('/card/:name',(req, res) => {
    var name = req.params.name;
    Card.findOne({'name.english':name}).then((card) => {
      res.render('card.html',{
        card:card
      });
    });
});


app.get('/cj', (req,res) => {

  Card.find().then((docs) => {
    res.send(docs);
  });
});

// app.get('/cards/:types/:rarities/:name',(req, res) => {
//
//   var types = req.params.types;
//   var rarities = req.params.rarities;
//   var name = req.params.name;
//
//   var options = {
//     types: types,
//     rarities: rarities,
//     name:name
//   }
//
//   var decks = dq.filterCardsRequest(options).then((decks) => {
//     res.send(decks);
//   })
//
//
// });

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
