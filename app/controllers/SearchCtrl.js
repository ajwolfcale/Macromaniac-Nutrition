'use strict';

angular.module("NutritionApp").controller("SearchCtrl", function ($q, $scope, $window, $route, $moment, NutritionFactory, ProfileFactory, $rootScope) {

	$scope.$on('$viewContentLoaded', function () {
		$scope.graphNutrients();
	});

	// --------------------------------Get Dates--------------------------

	$scope.today = $moment().format('L');
	$scope.back1Days = $moment().subtract(1, 'days').format('L');
	$scope.back2Days = $moment().subtract(2, 'days').format('L');
	$scope.back3Days = $moment().subtract(3, 'days').format('L');
	$scope.back4Days = $moment().subtract(4, 'days').format('L');
	$scope.back5Days = $moment().subtract(5, 'days').format('L');
	$scope.back6Days = $moment().subtract(6, 'days').format('L');

	$scope.lastWeekArr = [$scope.back6Days, $scope.back5Days, $scope.back4Days, $scope.back3Days, $scope.back2Days, $scope.back1Days, $scope.today];

	// ----------------------------Create FB Object----------------------------------

	$scope.consumedToday = {
		calories: "",
		protein: "",
		fat: "",
		carbs: "",
		date: $scope.today
	};

	$scope.formatDate = (date) => {
		$scope.consumedToday.date = date;
		$scope.graphNutrients();
	};

	// --------------------------------Get Foods from API--------------------------

	$scope.searchFoods = () => {
		console.log("pressed enter");
		NutritionFactory.getFoods($scope.searchBar)
			.then(function (results) {
				console.log(results);
				$scope.foods = Object.values(results.data.hits);
			})
			.catch(err => console.error(err));
	};


	// ----------------------------Add MANUAL Nutrients to FB--------------------------

	$scope.addNutrients = () => {
		if ($scope.consumedToday.calories === null) {
			$scope.consumedToday.calories = 0;
		}
		if ($scope.consumedToday.protein === null) {
			$scope.consumedToday.protein = 0;
		}
		if ($scope.consumedToday.fat === null) {
			$scope.consumedToday.fat = 0;
		}
		if ($scope.consumedToday.carbs === null) {
			$scope.consumedToday.carbs = 0;
		}

		// $scope.graphNutrients();

		$scope.consumedToday.uid = firebase.auth().currentUser.uid;
		ProfileFactory.addConsumed($scope.consumedToday)
			.then(() => {
				$route.reload("/#!/search");
			});
	};

	// --------------------------------Add API Nutrients to FB--------------------

	$scope.addDbNutrients = (food) => {
		console.log($scope.consumedToday); //empty string
		$scope.consumedToday.calories = food.nf_calories;
		$scope.consumedToday.protein = food.nf_protein;
		$scope.consumedToday.fat = food.nf_total_fat;
		$scope.consumedToday.carbs = food.nf_total_carbohydrate;

		console.log($scope.consumedToday); //overwritten

		$scope.addNutrients();
	};

	// --------------------------------Add Nutrients to FB--------------------------

	let calArr = [];
	let proteinArr = [];
	let fatArr = [];
	let carbArr = [];

	let getNutrientsForGraph = (date) => {
		return NutritionFactory.getNutrients()
			.then(function (results) {
				let dateResults = results.filter(function (currentDay) {
					return currentDay.date === date;
				});
				// console.log('date Results', dateResults);
				return dateResults;
			})
			.catch((err) => {
				console.log('ERROR', err);
			});
	};


	let graphPastCals = () => {
		let promiseArr = [];
		for (let i = 0; i < $scope.lastWeekArr.length; i++) {
			promiseArr.push(getNutrientsForGraph($scope.lastWeekArr[i]));
		}
		return $q.all(promiseArr)
			.then(function (data) {
				return data;
			});
	};

	$scope.graphNutrients = () => {

		getNutrientsForGraph($scope.consumedToday.date)
			.then(function (chartData) {
				// console.log(chartData);
				let nutrientsByDate = chartData.map((item) => {
					calArr.push(item.calories);
					proteinArr.push(item.protein);
					fatArr.push(item.fat);
					carbArr.push(item.carbs);
				});
				$scope.totalCalories = _.sum(calArr);
				$scope.totalProtein = _.sum(proteinArr);
				$scope.totalFat = _.sum(fatArr);
				$scope.totalCarbs = _.sum(carbArr);
				$scope.pieData = [$scope.totalProtein, $scope.totalFat, $scope.totalCarbs];
			});

		graphPastCals()

			.then(function (lastWeek) {
				let lastWeekCals = [];
				lastWeek.forEach(function (eachDay) {
					let eachDayCal = [];
					eachDay.forEach(function (dailyTotals) {
						eachDayCal.push(dailyTotals.calories);
					});
					lastWeekCals.push(_.sum(eachDayCal));
				});
				$scope.lineData = [
					// [userGoal, userGoal, userGoal, userGoal, userGoal, userGoal, userGoal],
					lastWeekCals
				];
			});

		$scope.pieLabels = ["Protein", "Fat", "Carbs"];
		$scope.pieData = [1, 1, 1];
	};
	// ---------------------------------LINE CHART---------------------------------


	$scope.lineLabels = [$scope.back6Days, $scope.back5Days, $scope.back4Days, $scope.back3Days, $scope.back2Days, $scope.back1Days, `Today: ${$scope.today}`];
	$scope.lineSeries = ['Calorie Goal', 'Calories Eaten'];
	$scope.lineData = [
		[2000, 2000, 2000, 2000, 2000, 2000, 2000],
		[2000, 2000, 2000, 2000, 2000, 2000, 2000]
	];

	// ProfileFactory.getProfile();

	$scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
	$scope.options = {
		scales: {
			yAxes: [
				{
					id: 'y-axis-1',
					type: 'linear',
					display: true,
					position: 'left'
				}
			]
		}
	};
});