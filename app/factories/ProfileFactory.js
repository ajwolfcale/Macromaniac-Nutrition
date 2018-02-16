'use strict';

angular.module("NutritionApp").factory("ProfileFactory", function (FBUrl, $q, $http) {

    let addNewProfile = (userProfile) => {
        return $q((resolve, reject) => {
            $http
                .post(`${FBUrl}/users.json`, JSON.stringify(userProfile))
                .then(data => {
                    console.log("Updated user's profile", data.data.name);
                    resolve(data.data);
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                });
        });
    };

    let addConsumed = (data) => {
        return $q((resolve, reject) => {
            $http
                .post(`${FBUrl}/${data.uid}/nutrientsToday.json`, JSON.stringify(data))
                .then(data => {
                    console.log("Added User's nutrients", data.data);
                    resolve(data.data);
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                });
        });
    };

    let getProfile = (user) => {
        return $q((resolve, reject) => {
            $http
              .get(`${FBUrl}/users.json?orderBy="uid"&equalTo="${firebase.auth().currentUser.uid}"`)
              .then(({ data }) => {
                console.log("USER ID", data);
                let userIdArr = Object.keys(data).map(userKey => {
                  console.log("user", userKey);
                  data[userKey].id = userKey;
                  return data[userKey];
                });
                console.log("Current User: ", userIdArr);
                resolve(userIdArr);
            });
        });
    };


    return { addNewProfile, addConsumed, getProfile };
});

