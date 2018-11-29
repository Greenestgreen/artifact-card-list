const mongoose = require('mongoose');


var CardSchema = new mongoose.Schema({
  artifactId:{
    type:Number
  },
  name:{
    type:Object,
    required:true
  },
  type:{
    type:String,
    required:true
  },
  text:{
    type:Object,
    required:true
  },
  rarity:{
    type:String,
    required:true
  },
  image:{
    type:Object
  },
  ingameImage:{
    type:String
  },
  miniImage:{
    type:String
  },
  attack:{
    type:Number
  },
  hit_points:{
    type:Number
  },
  mana:{
    type:Number
  },
  references:{
    type:Array
  },
  color:{
    type:String
  },
  parentDeck:{
    type:mongoose.Schema.Types.ObjectId
  }
});

CardSchema.statics.finByArtifactId = function(id) {
  var Card = this;
  return Card.findOne({
    artifactId: id
  });
};

var Card = mongoose.model('Card',CardSchema);

module.exports = {
  Card
}
