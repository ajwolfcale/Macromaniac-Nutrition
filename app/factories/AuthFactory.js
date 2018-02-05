'use strict';

angular.module("NutritionApp").factory("AuthFactory", (FBCreds, $q) => {
    let authObj = {};
    let currentUser = null;
  
    authObj.createUser = ({ email, password }) => {
      return firebase.auth().createUserWithEmailAndPassword(email, password);
    };
  
    authObj.loginUser = ({ email, password }) => {
      return firebase.auth().signInWithEmailAndPassword(email, password);
    };
  
    authObj.logoutUser = () => {
      return firebase.auth().signOut();
    };
  
    authObj.isAuthenticated = () => {
      console.log("isAuthenticated called AuthFactory");
      return $q((resolve, reject) => {
        console.log("firing onAuthStateChanged");
        firebase.auth().onAuthStateChanged( (user) => {
          console.log("onAuthStateChanged finished");
          if (user) {
            console.log("user", user);
            currentUser = user.uid;
            resolve(true);
          } else {
            resolve(false);
          }
        });
      });
    };
  
    authObj.getCurrentUser = () => {
      return currentUser;
    };
  
    return authObj;
  });