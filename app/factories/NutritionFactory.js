'use strict';


angular.module("NutritionApp").factory("NutritionFactory", function ($q, $http, FoodCreds) {

	let getFoods = (foods) => {
		return $q(function (resolve, reject) {
			$http.get(`https://api.nutritionix.com/v1_1/search/${foods}?results=0%3A20&cal_min=0&cal_max=50000&fields=item_name%2Citem_id%2Cbrand_id%2Cnf_calories%2Cnf_total_fat%2Cnf_total_carbohydrate%2Cnf_protein&appId=${FoodCreds.app_id}&appKey=${FoodCreds.key}`)

				.then(function (data) {
					resolve(data);
				})
				.catch(function (error) {
					reject(error);
				});
		});
	};
	return {
		getFoods
	};

});


