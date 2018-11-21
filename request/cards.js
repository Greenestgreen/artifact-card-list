var rp = require('request-promise-native');
var cache = require('memory-cache');




var getCards = (force = false) => {
  let  sets = ['0','1'];

    sets.forEach ( (set) => {
      if ( Date.now > cache.get(`expire_time_${set}`) || !cache.get(`expire_time_${set}` || force) ) {
        let url = `https://playartifact.com/cardset/${set}/`;
        rp({
          url:url,
          json: true})
        .then(async (body) => {
          cache.put(`expire_time_${set}`, body.expire_time );
          await getSet(body);
        })
        .catch((err) => {
          console.log(err);
        });
      }
    });
}




var getSet = (body) => {
  console.log(body);
  return rp({
    url:body.cdn_root + body.url.substring(1),
    json: true})
  .then(() => {
    console.log(body.card_set.set_info.name.english);
    cache.put(body.card_set.set_info.name.english, body.card_set.card_list);
  })
  .catch(() => {

  });
};


module.exports = {
  getCards
}
