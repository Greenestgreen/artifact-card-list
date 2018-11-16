var request = require('request');

var getCards = async() => {


  var completeSet = []; 

  let response1 = await getSet('0');
  completeSet = completeSet.concat(response1);
  let response2 = await getSet('1');
  completeSet = completeSet.concat(response2);

  return completeSet;

};


var getSet = (id) => {
  let url = `https://playartifact.com/cardset/${id}/`;
  return new Promise((resolve,reject) => {
    request({
      url: url,
      json: true,
    }, (error,response,body) => {
      if (error) {
        reject('Unable to connect to valve servers');
      } else if (response.statusCode === 400) {
        reject('Unable to connect to valve servers');
      } else if (response.statusCode === 200)  {
        resolve(getResponseSet(body));
      }
    });
  });
};


var getResponseSet = (body) => {
  console.log(body);
  return new Promise((resolve,reject) => {
  request({
    url: body.cdn_root + body.url.substring(1),
    json: true,
  }, (error,response,body) => {
    if (error) {
      reject('Unable to connect to valve servers');
    } else if (response.statusCode === 400) {
      reject('Unable to connect to valve servers');
    } else if (response.statusCode === 200)  {
      resolve(body.card_set.card_list);
    }
  })
});
};


module.exports = {
  getCards
}
