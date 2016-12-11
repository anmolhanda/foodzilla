var mongoose = require("mongoose");
var Promise = require("bluebird");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var productSchema = new Schema({
    id: ObjectId,
    name: { type: String },
    area: {type: String}
});


var Product = mongoose.model('product', productSchema);

var ProductDao = {
    addProduct: addProduct,
    getProductsInDemand:getProductsInDemand
}

function addProduct(product,location) {
    return new Promise(function (resolve, reject) {
        Product.create({ "name": product, "area":location }, function (err, addedProduct) {
            if (!err) {
                console.log("added product", addedProduct);
                resolve(addedProduct);
            }
            else {
                reject(err);
            }

        });
    });

};

function getProductsInDemand(location) {
    return new Promise(function (resolve, reject) {
        Product.find({"area": location}, function (err, productsInDemand) {
            if (!err) {
                console.log("product which are not present", productsInDemand);
                resolve(productsInDemand);
            }
            else {
                reject(err);
            }

        });
    });

};

module.exports = ProductDao;