var {mongoose} = require('../db/mongoose');
const _ = require('lodash');
var rp = require('request-promise-native');
var {Deck} = require('../models/deck');
var {Card} = require('../models/card')

var updateDeck =  async (set) => {

      let url = `https://playartifact.com/cardset/${set}/`;
      console.log('Getting URL');
      response = await  rp({url:url, json: true});
      //var deck = new Deck(set, response.expire_time);
      getDeckRequest(response);
}




var getDeckRequest =  async (body) => {
    console.log('Getting deck');
    try {
      response = await rp({url:body.cdn_root + body.url.substring(1), json: true});
      var deck = new Deck({
        artifactId:response.card_set.set_info.set_id,
        name:response.card_set.set_info.name,
        version:response.card_set.version
      });

      deck.save().then((doc) => {
        console.log('Saved Deck to DB',doc.name.english);
        saveCards(response.card_set.card_list,doc._id);
      }, (e) => {
        console.log('Error Saving deck',e);
      });
    } catch (e) {
      throw new Error (e);
    }
}

var saveCards = (cards,deckId) => {
  cards.forEach((c) => {

    var color = '';
    if ( c.is_black) {
      color = 'Black';
    } else if ( c.is_green ) {
      color = 'Green';
    } else if ( c.is_blue ) {
      color = 'Blue';
    } else if ( c.is_red ) {
      color = 'Red';
    }
    try {
      var card  = new Card({
        artifactId:c.card_id,
        name:c.card_name,
        type:c.card_type,
        text:c.card_text,
        rarity:c.rarity ? c.rarity : 'Core',
        image:c.large_image,
        ingameImage:c.ingame_image.default,
        miniImage:c.mini_image.default,
        attack:c.attack,
        hit_points:c.hit_points,
        references:c.references,
        mana: c.mana_cost ? c.mana_cost : 0,
        color:color,
        parentDeck:deckId
      })
    } catch (e) {
      console.log(e);
    }


    card.save().then((doc) => {
      console.log('Saved Card', doc.name.english);
    });
  })
}

var updateAllDecks = () => {

  let decks = [0,1];
  decks.forEach((deck) => {
    updateDeck(deck);
  })
}

updateAllDecks();
