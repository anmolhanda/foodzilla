var mongoose = require("mongoose");
var Promise = require("bluebird");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var restaurantSchema = new Schema({
    id: ObjectId,
    name: { type: String },
    description: String,
    area: String,
    imageLink: String,
    speciality: [{
        item: String,
        rating: String
    }],
    created_at: { type: Date, default: Date.now },
    rating: String
});


var Restaurant = mongoose.model('restaurant', restaurantSchema);

var RestaurantDao = {
    addRestaurant: addRestaurant,
    getRestroBasedOnProductAndLocation: getRestroBasedOnProductAndLocation
}

function addRestaurant(restaurant) {
    return new Promise(function (resolve, reject) {
        Restaurant.create(restaurant, function (err) {
            if (!err) {
                resolve(restaurant);
            }
            else {
                reject(err);
            }

        });
    });

}

function getRestroBasedOnProductAndLocation(product, location) {
    return new Promise(function (resolve, reject) {
        var matchObject = { item: product };
        Restaurant.find({
            "speciality.item": matchObject.item,
            "area": location
        }, function (err, product) {
            if (!err) {
                resolve(product);
            } else {
                reject(err);
            }
        });
    });
};

module.exports = RestaurantDao;