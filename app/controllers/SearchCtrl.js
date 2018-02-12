'use strict';

angular.module("NutritionApp").controller("SearchCtrl", function ($scope, $window, $route, $moment, NutritionFactory, ProfileFactory) {

	$scope.$on('$viewContentLoaded', function() {
		$scope.graphNutrients();
	});

	// --------------------------------Get Today's date--------------------------

	$scope.today = $moment().format('L');

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

   
// --------------------------------Add MANUAL Nutrients to FB--------------------------

	$scope.addNutrients = () => {
		if ($scope.consumedToday.calories === null){
			$scope.consumedToday.calories = 0;
		}
		if ($scope.consumedToday.protein === null){
			$scope.consumedToday.protein = 0;
		} 
		if ($scope.consumedToday.fat === null){
			$scope.consumedToday.fat = 0;
		}
		if ($scope.consumedToday.carbs === null){
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

	let calArr =[];
	let proteinArr =[];
	let fatArr =[];
	let carbArr =[];
	let getTotal = (total, num) => {
		return total + num;
	};

	$scope.graphNutrients = () => {

		$scope.pieLabels = ["Protein", "Fat", "Carbs"];
		$scope.pieData = [1, 1, 1];

		return NutritionFactory.getNutrients()
			.then(function (results) {
				let dateSort = _.keyBy(results, 'date');
				console.log('RESULTS: ', results);
				let dateResults = results.filter(function(currentDay){
					return currentDay.date === $scope.consumedToday.date;
				});
				console.log(dateResults);


				let nutrientsByDate = dateResults.map((item) => {
					calArr.push(item.calories);
					proteinArr.push(item.protein);
					fatArr.push(item.fat);
					carbArr.push(item.carbs);
					$scope.totalCalories = calArr.reduce(getTotal);
					$scope.totalProtein = proteinArr.reduce(getTotal);
					$scope.totalFat = fatArr.reduce(getTotal);
					$scope.totalCarbs = carbArr.reduce(getTotal);
					$scope.pieData = [$scope.totalProtein, $scope.totalFat, $scope.totalCarbs];
				});
			})
			.catch( (err) => {
				console.log('ERROR', err);
			  });	
	};
	

	// ---------------------------------LINE CHART---------------------------------
	$scope.lineLabels = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
	$scope.lineSeries = ['Calorie Goal', 'Calories Eaten'];
	$scope.lineData = [
		[2000, 2000, 2000, 2000, 2000, 2000, 2000],
		[2500, 2300, 3000, 2456, 1986, 2000, 3090]
	];

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