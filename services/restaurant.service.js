var Promise = require("bluebird");
var restaurantDao = require('../dao/restaurant.model.js');

var restaurantService = {
  getRestroBasedOnProductAndLocation: getRestroBasedOnProductAndLocation,
  updateRating:updateRating
  //   getRestroBasedOnLocation:getRestroBasedOnLocation
}


function getRestroBasedOnProductAndLocation(product, location) {
  return new Promise(function (resolve, reject) {
    restaurantDao.getRestroBasedOnProductAndLocation(product, location).then(function (restros) {
      // businessGroups=businessGroups.map(businessGroupMapper.businessGroupShortMapper);
      console.log("fetched all restros based on product {{in Service}}");
      resolve(restros);
    }).catch(function (err) {
      console.error("failed to fetch all the restros based on products{{in Service}}", err);
      reject(err);
    });
  })

};

function updateRating(rating, restro, item) {
  return new Promise(function (resolve, reject) {
    restaurantDao.updateRating(rating, restro, item).then(function (updatedRating) {
      // businessGroups=businessGroups.map(businessGroupMapper.businessGroupShortMapper);
      console.log("updated the ratings for a speciality {{in Service}}");
      resolve(updatedRating);
    }).catch(function (err) {
      console.error("failed to update the ratings for a speciality{{in Service}}", err);
      reject(err);
    });
  })

};

module.exports = restaurantService;