movieApp = angular.module('movieApp', []);
console.log("this page");
//control 1: input
movieApp.controller('InputController', ['$scope', 'MovieService', function($scope, giveMovieService) {
console.log("inputcontroller called");

$scope.searchName = giveMovieService.listofMovie;

}]);

//control 2: output
movieApp.controller('OutputController', ['$scope', '$http', 'MovieService', function($scope, $http, getMovieService) {
console.log("Outcontroller called");
console.log("here it is" + getMovieService.passlistResults);
$scope.listresults = getMovieService.passlistResults;


//delete the item out of search list
$scope.delete = function(item) {
  console.log('item' + item);
  $scope.listresults.results.splice($scope.listresults.results.indexOf(item), 1);
};


//$scope.movieList  = [];
$scope.favmovie = {
  title: '',
  length:''
};
console.log('obj' + $scope.favmovie );

$scope.addFav = function(favmovie) {

  flagmovie = {
    name: favmovie.Title,
    length: favmovie.Runtime
  };
  console.log('this fav one ' + flagmovie);
  //post my  meesage on urlthen respone the 1st function
  $http.post('/favmovie', flagmovie).then(function(response) {
    console.log(response);
    $scope.getMovieList();
  });
  // console.log($scope.newMessage);
};

//get favMovie

$scope.getMovieList = function() {
    $http.get('/favmovie').then(function(response){
      $scope.favMovieList = response.data;
      console.log('list' + response);
    });
};


}]);

//control3: outputFav
movieApp.controller('OutputFavController', ['$scope', 'MovieService', '$http', function($scope, getFavMovieService, $http){
//   $scope.infoFromServer = getFavMovieService.infoFromServer;
//   console.log('back from server ' + getFavMovieService.infoFromServer);
// console.log('testing' + $scope.getRequest);



}]);

//factory
movieApp.factory('MovieService', ['$http',function($http){
  var infoFromServer = {};
//add fav movies into the server
  var favmovie = {
    title: '',
    actors:''
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
    // infoFromServer : infoFromServer,
    // getRequest : function(){
    //       $http.get('/favmovie').then(function(response){
    //
    //         response = response;
    //         console.log('1223' + infoFromServer.response);
    //       });
    // },
    listofMovie: searchName,
    passlistResults: listResults
  };
} ]);
