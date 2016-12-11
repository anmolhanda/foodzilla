var mongoose= require("mongoose");
// mongoose.connection.dropDatabase(function(err, result) {
//     console.log("removing database");
//     require("./restaurant.script");
// });

// var dbURI='mongodb://localhost/foodzilla';
var dbURI="mongodb://anmolhanda:anmolhanda93@ds127978.mlab.com:27978/foodzilla"
module.exports.connect=mongoose.connect(dbURI);


mongoose.connection.on('connected',function(){
console.log('mongoose connected');
})

mongoose.connection.on('error',function(err){
console.log('mongoose error'+JSON.stringify(err));
})

mongoose.connection.on('disconnected',function(){
console.log("mongoose disconnected");
});

