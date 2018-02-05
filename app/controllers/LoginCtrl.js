'use strict';

angular.module("NutritionApp").controller("LoginCtrl", function ($scope, AuthFactory, FBCreds, $window) {

	$scope.login = () => {
		AuthFactory.loginUser($scope.account).then(user => {
			console.log("You have logged in.", user);
			// $window.location.href = "/#!/search";
		})
			.catch((err) => {
				console.log(err);
			});
	};

	$scope.logout = () => {
		AuthFactory.logoutUser()
			.then((data) => {
				console.log("logged out", data);
				$window.location.href = "/#!/login";
			});
	};

	$scope.register = () => {
		AuthFactory.createUser($scope.account).then(user => {
			console.log("You have created a new user", user);
			// this should auto-login....
			$scope.login();
			$window.location.href = "/#!/profile";
			console.log("you have registered and logged in as a new user");
		})
			.catch(function ({ code, message }) {
				console.log("Who are you? You are not welcome.", code, message);
			});
	};
});


