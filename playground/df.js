var {Deck} = require('../server/classes/deck');
const fs = require('fs');



var deck = new Deck(1,123123);
deck.setName('test');

// decks = fs.readFileSync('./playground/decks.json');
// var decks = JSON.parse(decks);
//
// // console.log(decks);
//
//
//
//
// deck.setCards(decks[1].cards);
//
// console.log(deck.filterCards(['Hero','Spell']).map((card) => {return card.card_type;} ));


var newDeck = deck;

newDeck.setName("hola");

console.log(deck);
