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
}]);

//factory
movieApp.factory('MovieService', ['$http',function($http){
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
    listofMovie: searchName,
    passlistResults: listResults
  };
} ]);
