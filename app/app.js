'use strict';

let isAuth = (AuthFactory) =>
new Promise((resolve, reject) => {
  AuthFactory.isAuthenticated().then(userBool => {
    console.log("Current User: ", userBool);
    if (userBool) {
      console.log("User recognized. You may proceed.");
      resolve();
    } else {
      console.log("Who are you? Get Outta Here!");
      reject();
    }
  });
});

angular.module("NutritionApp", ["ngRoute", 'chart.js'])
.constant("FBUrl", "https://macromaniac-nutrition.firebaseio.com/")
.config($routeProvider => {
    $routeProvider
    .when("/login", {
        templateUrl: "partials/login.html",
        controller: "LoginCtrl"
    })
    .when("/search", {
        templateUrl: "partials/search-bar.html",
        controller: "SearchCtrl",
        resolve: { isAuth }
    })
    .when("/register", {
        templateUrl: "partials/register.html",
        controller: "LoginCtrl"
    })
    .when("/profile", {
        templateUrl: "partials/profile.html",
        controller: "ProfileCtrl",
        resolve: { isAuth }
    })
    .when("/graph", {
        templateUrl: "partials/graph.html",
        controller: "GraphCtrl",
        resolve: { isAuth }
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

