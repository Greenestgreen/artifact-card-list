var rp = require('request-promise-native');
var cache = require('memory-cache');
var {Deck} = require('../classes/deck');
var cacheDeck = require('./cache-decks');
var moment = require('moment');


var updateDeck =  async (set,resolve) => {
  //console.log(`${cacheDeck.getCachedExpirationDate(set)}  > ${moment(Date.now()).unix()}`);

    if (cacheDeck.getCachedExpirationDate(set) > moment(Date.now()).unix()) {
      //let deck =  await getDeckCached(set);
      console.log('Cached Deck Back');
      resolve();

    } else {
      let url = `https://playartifact.com/cardset/${set}/`;
      console.log('Getting URL');
      response = await  rp({url:url, json: true});
      var deck = new Deck(set, response.expire_time);
      getDeckRequest(deck,response,resolve)

    }


}

var getDeckRequest =  async (deck, body,resolve) => {
    console.log('Caching deck', deck);
    response = await rp({url:body.cdn_root + body.url.substring(1), json: true});
    deck.setName(response.card_set.set_info.name.english);
    deck.setCards(response.card_set.card_list);
    cacheDeck.addDeck(deck);
    console.log(cacheDeck.getCachedDecksNames());
    resolve();

}

var getDeckCached = (id) => {
  return new Promise((resolve,reject) =>  {
      resolve(cacheDeck.getCachedDeckById(id));
  });
}

var updateAllDecks = (callback) => {

  let decks = [0,1];
  var request = decks.map((deck) =>  {
    return new Promise( (resolve) => {
       updateDeck(deck,resolve);
    });

  });

  Promise.all(request).then(() => {    
    console.log('Finished');
    callback();
  });
};

module.exports = {updateAllDecks}
