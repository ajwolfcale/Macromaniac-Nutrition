'use strict';

angular.module("NutritionApp").factory("ProfileFactory", function(FBUrl, $q, $http){
    
    let addNewProfile = (userProfile) => {
        return $q((resolve, reject) => {
            $http
                .post(`${FBUrl}/user-profile.json`, JSON.stringify(userProfile))
                .then(data => {
                console.log("Added user's profile", data.data.name);
                resolve(data.data);
                })
                .catch(error => {
                console.log(error);
                reject(error);
                });
            });
        };
        return { addNewProfile };
    });

