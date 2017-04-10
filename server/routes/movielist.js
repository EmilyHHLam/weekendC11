var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var MovieSchema = mongoose.Schema( {
  name: String,
  length: String
});

var Movie = mongoose.model ('movie', MovieSchema, 'movies');

router.get('/', function(req, res) {
  Movie.find({}, function(err, allMovies){
    if(err) {
      console.log('mongo error: ' + err);
    }
    res.send(allMovies);
  });
});


router.post('/', function(req, res) {
  var movie = new Movie({
    name: req.body.name,
    length: req.body.length
  });

  movie.save(function(err, savedMovie) {
    if (err) {
      console.log("mongo error: " + err);
      res.sendStatus(500);
    }
    res.send(savedMovie);
  });

});


router.delete('/:id', function(req, res) {
  var id = req.params.id;
  console.log('id=' + id);
  Movie.findByIdAndRemove(id, function(err, deletedMovie){
    if(err){
      console.log(err);
  res.sendStatus(200);
  }

  res.send(deletedMovie);
  });
});

router.put('/', function(req, res) {
  res.sendStatus(200);
});


module.exports = router;
