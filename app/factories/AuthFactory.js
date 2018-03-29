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
      return $q((resolve, reject) => {
        firebase.auth().onAuthStateChanged( (user) => {
          if (user) {
            // console.log("user", user);
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