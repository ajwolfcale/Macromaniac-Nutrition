'use strict';

angular.module("NutritionApp").controller("NavCtrl", function ($scope, $window, $location) {

  $scope.isActive = (viewLocation) => viewLocation === $location.path();
  
  $scope.navItems = [
    // TODO: Hide/Show login/out
    {
      name: "Logout",
      url: "#!/logout"
    },
    {
      name: "Login",
      url: "#!/login",
      bang: "!"
    },
    {
      name: "All Items",
      url: "#!/items/list"
    },
    {
      name: "Add New Item",
      url: "#!/items/new"
    }
  ];
  // $scope.loadHome = function () {
  //       $location.url('/home');
  //   };
    
  //     $scope.loadAbout = function () {
  //       $location.url('/about');
  //   };
    
  //     $scope.loadContact = function () {
  //       $location.url('/contact');
  //   };
    
});