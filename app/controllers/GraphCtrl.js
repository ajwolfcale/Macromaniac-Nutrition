'use strict';

angular.module("NutritionApp").controller("GraphCtrl", function($scope){
    $scope.labels = ["Protein", "Fat", "Carbs"];
    $scope.data = [300, 500, 100];
});


