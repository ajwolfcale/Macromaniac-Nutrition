'use strict';

angular.module("NutritionApp").controller("ProfileCtrl", function ($scope, $location, $window, ProfileFactory) {

	$scope.userProfile = {
		firstName: "",
		lastName: "",
		age: "",
		weight: "",
		calGoal: "",
		// progPic:""
		date: ""
	};


	$scope.saveProfile = () => {
		console.log('New Item to add', $scope.userProfile);
		$scope.userProfile.uid = firebase.auth().currentUser.uid;
		ProfileFactory.addNewProfile($scope.userProfile)
			.then((data) => {
				$window.location.href = "/#!/search";
			});
	};



});

