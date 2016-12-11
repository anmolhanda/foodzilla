var mongoose = require("mongoose");
var Promise = require("bluebird");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var _ = require('underscore');
var restaurantSchema = new Schema({
    id: ObjectId,
    name: { type: String },
    description: String,
    area: String,
    imageLink: String,
    speciality: [{
        item: String,
        rating: String,
        count: Number
    }],
    created_at: { type: Date, default: Date.now },
    rating: String
});


var Restaurant = mongoose.model('restaurant', restaurantSchema);

var RestaurantDao = {
    addRestaurant: addRestaurant,
    getRestroBasedOnProductAndLocation: getRestroBasedOnProductAndLocation,
    updateRating: updateRating,
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
        }, function (err, restro) {
            if (!err) {
                resolve(restro);
            } else {
                reject(err);
            }
        });
    });
};

function updateRating(rating, restro, item) {
    return new Promise(function (resolve, reject) {
        console.log("things are--------",rating,restro,item)
        Restaurant.findOne({
            "name": restro
        }, function (err, restaurant) {
            if (!err) {
                // restaurant=JSON.parse(JSON.stringify(restaurant));
                console.log("restro fetched is",restaurant);
                var speciality = restaurant.speciality;
                console.log("speciality is",speciality);
                for (var i = 0; i < speciality.length; ++i) {
                    if (speciality[i].item == item) {
                        speciality[i].count++;
                        speciality[i].rating = (parseInt(speciality[i].rating)*(speciality[i].count-1) + parseInt(rating)) / speciality[i].count;
                    }

                }
                console.log("speciality after updation is",speciality);
                restaurant.speciality=speciality;
                restaurant.save(function (err, updation) {
                    if(!err){
                    console.log("updated ratings");
                    resolve(updation);
                    }
                    else 
                    console.log("error",err);
                    reject(err);
                });

            } else {
                console.log("error while fetching");
                reject(err);
            }
        });
    });
};


module.exports = RestaurantDao;