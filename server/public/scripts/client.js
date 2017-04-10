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
console.log("Outcontroller called");
console.log("here it is" + getMovieService.passlistResults);
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
  //  total: 0
  };

  //$scope.movieList  = [];
var favMovieList = [];

  var getMovieList = function() {
      $http.get('/favmovie').then(function(response){
        favMovieList.push(response.data);
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

  //delete
  var deleteFav = function (favmovie) {
    console.log('delete this ' + favmovie);
    $http.delete('/favmovie', favmovie).then(function(response) {
      console.log(response);
      getMovieList();
    });
  };

  var searchName = function(name) {
    $http.get('http://www.omdbapi.com/?t=' + name + '&y=&plot=full&r=json').then(function(response){
    results.push(response.data);

    });

  };

  return {
    //delete
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
