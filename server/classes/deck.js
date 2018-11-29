var _ = require('lodash');

class Deck {

  constructor (id, expire_time) {
    this.id = id;
    this.expire_time = expire_time;
  }

  setCards (cards) {
    this.cards = cards;
    return this;
  }

  setName(name) {
    this.name = name;
    return this;
  }

  //filtercards
  filterCards(options) {
    // let res = this.cards.filter( card => {
    //   card.card_type === type;
    // })
    //
    // return res;


    return _.filter(this.cards, (card) => {
      return _.includes(options.types,card.card_type) &&
       _.includes(options.rarities,card.rarity) &&
        _.includes(card.card_name.english,options.name);

      // return card.card_type === type;
    })
  }

}


module.exports = {Deck}
