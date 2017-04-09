movieApp = angular.module('movieApp', []);

//control 1: input
movieApp.controller('InputController', ['$scope', 'MovieService', function($scope, giveMovieService) {
console.log("inputcontroller called");

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

// $scope.addFav = function(title, actors) {
//
//   console.log('fav movie is' + title + actors );
// };
}]);

//control3: outputFav
movieApp.controller('OutputFavController', ['$scope', 'MovieService', '$http', function($scope, getFavMovieService, $http){
//   $scope.infoFromServer = getFavMovieService.infoFromServer;
//   console.log('back from server ' + getFavMovieService.infoFromServer);
// console.log('testing' + $scope.getRequest);

$scope.addFav = function(title, actors) {

  console.log('fav movie is' + title + actors );
};
  //$scope.getMessages = function() {
    $http.get('/favmovie').then(function(response){
      $scope.movieList = response.data;
      console.log('list' + $scope.movieList);
    });


}]);

//factory
movieApp.factory('MovieService', ['$http',function($http){
  var infoFromServer = {};
//add fav movies into the server
  var favmovie = {
    title: '',
    length:''
  };
// var infoFromServer = {};
//   var getRequest =  function(){
//     $http.get('/favmovie').then(function(response){
//       infoFromServer.response = response;
//       console.log('info from server' + infoFromServer.response);
//       return infoFromServer.response;
//
//     });
//   };
  //
  // var addFav = function(favmovie) {
  //   $http.post('/favmovie', favmovie).then(function(response) {
  //     console.log(response);
  //
  //   }) ;
  // };

  var results = [];
  var listResults = {
    results: results
  //  total: 0
  };
  var searchName = function(name) {
    $http.get('http://www.omdbapi.com/?t=' + name + '&y=&plot=full&r=json').then(function(response){

    results.push(response.data);
    //searchResult.total
    //console.log(results);
    });

  };

  return {
    infoFromServer : infoFromServer,
    getRequest : function(){
          $http.get('/favmovie').then(function(response){

            response = response;
            console.log('1223' + infoFromServer.response);
          });
    },
    listofMovie: searchName,
    passlistResults: listResults
  };
} ]);
