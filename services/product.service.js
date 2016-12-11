var Promise = require("bluebird");
var productDao = require('../dao/product.model.js');

var productService = {
    addProduct: addProduct,
    getProductsInDemand: getProductsInDemand
}


function addProduct(product, location) {
    return new Promise(function (resolve, reject) {
        productDao.addProduct(product, location).then(function (productAdded) {
            // businessGroups=businessGroups.map(businessGroupMapper.businessGroupShortMapper);
            console.log("added missing product recording for recommendation {{in Service}}");
            resolve(productAdded);
        }).catch(function (err) {
            logger.error("failed to add product in search engine{{in Service}}", err);
            reject(err);
        });
    })

};

function getProductsInDemand(location) {
    return new Promise(function (resolve, reject) {
        productDao.getProductsInDemand(location).then(function (products) {
            // businessGroups=businessGroups.map(businessGroupMapper.businessGroupShortMapper);
            console.log("fetched all product which are not available and highly demanded {{in Service}}",products);
            resolve(products);
        }).catch(function (err) {
            console.error("failed to fetch all the products which are not available{{in Service}}", err);
            reject(err);
        });
    })

};

module.exports = productService;