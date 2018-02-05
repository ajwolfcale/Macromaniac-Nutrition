'use strict';

angular.module("NutritionApp", ["ngRoute"])
.constant("FBUrl", "https://macromaniac-nutrition.firebaseio.com/")
.config($routeProvider => {
    $routeProvider
    .when("/login", {
        templateUrl: "partials/login.html",
        controller: "LoginCtrl"
    })
    .when("/search", {
        templateUrl: "partials/search-bar.html",
        controller: "SearchCtrl"
    })
    .when("/register", {
        templateUrl: "partials/register.html",
        controller: "LoginCtrl"
    })
    .when("/profile", {
        templateUrl: "partials/profile.html",
        controller: "ProfileCtrl"
    });
})
.run(FBCreds => {
  let creds = FBCreds;
  let authConfig = {
    apiKey: creds.key,
    authDomain: creds.authDomain
  };
  firebase.initializeApp(authConfig);
});

