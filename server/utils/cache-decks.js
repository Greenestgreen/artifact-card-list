var cache = require('memory-cache');
var moment = require('moment');




var decksCache = [];
cache.put('decks_array',decksCache);


var checkArrayDeck  = (name) => {
  //console.log(JSON.parse(cache.get('decks_array')),'acacaca');
  return cache.get('decks_array').includes(name);
}

var addDeck  = (deck) => {
  if(checkArrayDeck(deck.name))
  {
    return;
  }

  arrayDecks = cache.get('decks_array');
  arrayDecks.push(deck.name);
  cache.put('decks_array',arrayDecks);
  cache.put(deck.name,deck);

}

var getCachedDecksNames = () => {
  return cache.get('decks_array');
}

var getCachedNameDeck = (index) => {
  return cache.get('decks_array')[index];
}

var getCachedDeckByName = (name) => {
  return cache.get(name);
}

//return cached object deck by id
var getCachedDeckById = (id) => {

  let deckName = getCachedNameDeck(id);
  return getCachedDeckByName(deckName);
}

var getCachedExpirationDate = (index) => {
    let deckName = getCachedNameDeck(index);
    if ( deckName ) {
      var deck = getCachedDeckByName(deckName);
      return deck.expire_time;
    }

    return 0;
}

var getAllCachedDecks = () => {
  let decks = [];
  let deckNames = getCachedDecksNames();

  deckNames.forEach( function(name)  {
    decks = decks.concat(getCachedDeckByName(name));
  });

  return decks;
}



module.exports = {checkArrayDeck,
  getCachedExpirationDate,
  addDeck,
  getCachedDecksNames,
  getCachedDeckById,
  getAllCachedDecks}
