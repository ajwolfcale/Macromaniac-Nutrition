'use strict';

angular.module("NutritionApp").factory("ProfileFactory", function(FBUrl, $q, $http){
    
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
                    // console.log(data);
                // console.log("Added User's nutrients", data.data);
                resolve(data.data);
                })
                .catch(error => {
                console.log(error);
                reject(error);
                });
            });
        };


        return { addNewProfile, addConsumed };
    });

