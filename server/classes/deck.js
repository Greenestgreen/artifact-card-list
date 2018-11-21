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

  //id

  //name

  //color


}


module.exports = {Deck}
