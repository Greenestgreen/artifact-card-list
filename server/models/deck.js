const mongoose = require('mongoose');

var DeckSchema = new mongoose.Schema({
  artifactId:{
    type:Number,
    required:true
  },
  name:{
    type:Object,
    required:true
  },
  version:{
    type:Number,
    required:true
  }
});

var Deck = mongoose.model('Deck',DeckSchema);

module.exports = {
  Deck
}
