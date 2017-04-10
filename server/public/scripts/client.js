movieApp = angular.module('movieApp', []);
console.log("this page");
//control 1: input
movieApp.controller('InputController', ['$scope', 'MovieService', function($scope, giveMovieService) {
console.log("inputcontroller called");

//binging the search movie towards factory
$scope.searchName = giveMovieService.listofMovie;

}]);

//control 2: output
movieApp.controller('OutputController', ['$scope', 'MovieService', function($scope, getMovieService) {
$scope.listresults = getMovieService.passlistResults;


//delete the item out of search list
$scope.delete = function(item) {
  console.log('item' + item);
  $scope.listresults.results.splice($scope.listresults.results.indexOf(item), 1);
};

//binding the addFav function to the factory
$scope.addFav = getMovieService.listofFav;

}]);

//control3: outputFav
movieApp.controller('OutputFavController', ['$scope', 'MovieService', function($scope, getFavMovieService){
//   $scope.infoFromServer = getFavMovieService.infoFromServer;
//   console.log('back from server ' + getFavMovieService.infoFromServer);
// console.log('testing' + $scope.getRequest);
getFavMovieService.favMovieList();
$scope.listofFavMovie = getFavMovieService.listofFavMovie;
console.log("list of fav", getFavMovieService.listofFavMovie);


$scope.deleteFav = getFavMovieService.deletefromFav;

}]);

//factory
movieApp.factory('MovieService', ['$http',function($http){
  var infoFromServer = {};
//add fav movies into the server

  var results = [];
  var listResults = {
    results: results
  };

  //$scope.movieList  = [];
var favMovieList = [];

  var getMovieList = function() {
      $http.get('/favmovie').then(function(response){
        favMovieList.length = 0;
        favMovieList.push(response.data);
        //favMovieList = response.data;
        console.log('list' + response.data);
      });
    };
  var addFav = function(favmovie) {
    flagmovie = {
      name: favmovie.Title,
      length: favmovie.Runtime
    };
    console.log('this fav one ' + flagmovie);
    //post my  meesage on urlthen respone the 1st function
    $http.post('/favmovie', flagmovie).then(function(response) {
      console.log(response);
      getMovieList();
    });
    // console.log($scope.newMessage);
  };
  //delete favorite movie
  var deleteFav = function (favmovie) {
    var favmovie_id = { id : favmovie._id };
    console.log(favmovie_id);
    $http.delete('/favmovie/' + favmovie._id).then(function(response) {
      console.log(response);
      getMovieList();
    });
  };
  //search the movie
  var searchName = function(name) {
    $http.get('http://www.omdbapi.com/?t=' + name + '&y=&plot=full&r=json').then(function(response){
    results.push(response.data);
    });
  };

  return {
    //delete the favorite movie
    deletefromFav: deleteFav,
    //add to the fav list
    listofFav: addFav,

    listofFavMovie: favMovieList,
    favMovieList: getMovieList,
    //searching the movie
    listofMovie: searchName,
    //get list of movie back
    passlistResults: listResults
  };
} ]);
