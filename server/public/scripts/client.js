//console.log(data);
var forSale= [];
var forRent = [];
var myApp = angular.module("myApp", []);

//remove everything in the container-fluid
myApp.controller("DeleteController", ["$scope", function($scope){
      //invoke the emptyDiv once 'delete everything' button is clicked
      $scope.emptyDiv = function() {
        var containerofListings = angular.element( document.querySelector( '#listofProperty' ) );
        containerofListings.empty();
      };
}]);

myApp.controller("DisplayController", ["$scope", function($scope){
  //list of objects
  $scope.listings = data;
  //manipulating the status and the price of the property
  angular.forEach($scope.listings, function(obj){
     if (obj.cost) {
       obj.price = obj.cost;
       obj.status =  "Property for Sale";
     }
     else {
       obj.price = obj.rent;
       obj.status =  "Apartment for Rent";
     }
   });
//remove an item from listing
  $scope.remove=function($index){
    console.log("item empty");
  $scope.listings.splice($index,1);
};



}]);
