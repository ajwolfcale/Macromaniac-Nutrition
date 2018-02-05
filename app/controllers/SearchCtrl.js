'use strict';

angular.module("NutritionApp").controller("SearchCtrl", function($scope, NutritionFactory){

    $scope.searchFoods = () => {
        console.log("pressed enter");
    NutritionFactory.getFoods($scope.searchBar)
        .then(function(results) {
            console.log(results);
            $scope.foods = Object.values(results.data.hits);
        })
        .catch(err => console.error(err));
    };

});