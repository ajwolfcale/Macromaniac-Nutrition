'use strict';


angular.module("NutritionApp").factory("NutritionFactory", function ($q, $http, FoodCreds, AuthFactory, FBUrl) {

// --------------------------------Nutrition API Call--------------------------------
	let getFoods = (foods) => {
		return $q(function (resolve, reject) {
			$http.get(`https://api.nutritionix.com/v1_1/search/${foods}?results=0%3A50&cal_min=0&cal_max=50000&fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat%2Cnf_total_carbohydrate%2Cnf_protein&appId=${FoodCreds.app_id}&appKey=${FoodCreds.key}`)
				.then(function (data) {
					resolve(data);
				})
				.catch(function (error) {
					reject(error);
				});
		});
	};

// -----------------------------Firebase Data Call--------------------
	let getNutrients = () => {
		return $q(function (resolve, reject) {
			let currentUser = AuthFactory.getCurrentUser();
			console.log("Current User:", currentUser);
			$http.get(`${FBUrl}nutrientsToday.json?&orderBy="uid"&equalTo="${currentUser}"`)
				.then(({ data }) => {
					// console.log("data", data);
					let nutrientArr = Object.values(data).map(nutrients => {
						data[nutrients] = nutrients;
						return data[nutrients];
					});
					// console.log("nutrients", nutrientArr);
					resolve(nutrientArr);
				})
				.catch(function (error) {
					reject(error);
				});
		});
	};

	return { getFoods, getNutrients };

});


