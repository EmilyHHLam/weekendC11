var mongoose = require('mongoose');
//var mongoURI = 'mongodb://localhost:27017/movies';
var mongoURI = "mongodb://users:1234567@ds147480.mlab.com:47480/emily-testdb";
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function(err){
  console.log('Mongo Connection Error: ' + err);
});

MongoDB.once('open', function(){
  console.log('Connected to Mongo');
});

module.exports = MongoDB;
