'use strict';

angular.module("NutritionApp").controller("SearchCtrl", function($scope, $window, NutritionFactory, ProfileFactory){

    $scope.searchFoods = () => {
        console.log("pressed enter");
    NutritionFactory.getFoods($scope.searchBar)
        .then(function(results) {
            console.log(results);
            $scope.foods = Object.values(results.data.hits);
        })
        .catch(err => console.error(err));
    };

	$scope.consumedToday = {
        date:"",
		calories:"",
		protein: "",
		fat: "",
		carbs:""
	};

	$scope.addNutrients = () => {
		console.log('New Item to add', $scope.consumedToday);
		$scope.consumedToday.uid = firebase.auth().currentUser.uid;
		ProfileFactory.addConsumed($scope.consumedToday)
			.then((data) => {
				$window.location.href = "/#!/search";
			});
	};


});