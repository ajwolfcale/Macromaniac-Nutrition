'use strict';

angular.module("NutritionApp").controller("NavCtrl", function($scope, $window, AuthFactory) {
  $scope.isLoggedIn = false;

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      $scope.isLoggedIn = true;
      $scope.$apply();
    } else {
      $scope.isLoggedIn = false;
      $window.location.href = "#/login";
    }
  });
  $scope.logout = () => {
		AuthFactory.logoutUser()
			.then((data) => {
				console.log("logged out", data);
				$window.location.href = "#!/login";
			});
	};
});

// angular.module("NutritionApp").controller("NavCtrl", function ($scope, $window, $location) {

//   $scope.isActive = (viewLocation) => viewLocation === $location.path();
  
//   $scope.navItems = [
//     {
//       name: "HOME",
//       url: "/"
//     },
//     {
//       name: "PROGRESS",
//       url: "#!/search"
//     },
//     {
//       name: "Sign in",
//       url: "#!/login"
//     },
//     {
//       name: "Sign out",
//       url: "#!/login",
//       bang: "!"
//     }
//   ];    
//