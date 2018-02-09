'use strict';

angular.module("NutritionApp").controller("SearchCtrl", function ($scope, $window, NutritionFactory, ProfileFactory) {

	$scope.consumedToday = {
		// date: "",
		calories: "",
		protein: "",
		fat: "",
		carbs: ""
	};

	$scope.formatDate = (date) => {
		console.log("CHEKC THIS DATE", date);
		$scope.consumedToday.date = date;
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

	// --------------------------------Get Today's date--------------------------\
	// $scope.today = new Date();
	// $scope.dd = $scope.today.getDate();
	// $scope.mm = $scope.today.getMonth() + 1; //January is 0!
	// $scope.yyyy = $scope.today.getFullYear();
	// if ($scope.dd < 10) {
	// 	$scope.dd = '0' + $scope.dd;
	// }
	// if ($scope.mm < 10) {
	// 	$scope.mm = '0' + $scope.mm;
	// }
	// $scope.today = $scope.mm + '/' + $scope.dd + '/' + $scope.yyyy;
	// $scope.consumedToday.date = $scope.today;

// --------------------------------Add Nutrients to FB--------------------------

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
		// console.log("$scope.consumedToday.fat", $scope.consumedToday.fat);
		$scope.consumedToday.uid = firebase.auth().currentUser.uid;
		console.log("LOOOOOOK:", $scope.consumedToday);
		ProfileFactory.addConsumed($scope.consumedToday);
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
		NutritionFactory.getNutrients()
			.then(function (results) {
				console.log("CHECK THIS", results);
				let nutrientsByDate = results.map((item) => {
					// console.log("Item", item);
					$scope.todaysDate = item.date;
					calArr.push(item.calories);
					proteinArr.push(item.protein);
					fatArr.push(item.fat);
					carbArr.push(item.carbs);
					// console.log("TODAY'S DATE", $scope.todaysDate);
					// console.log("TOTAL CALORIES: ", calArr.reduce(getTotal));
					// console.log("TOTAL PROTEIN: ", proteinArr.reduce(getTotal));
					// console.log("TOTAL FAT: ", fatArr.reduce(getTotal));
					// console.log("TOTAL CARBS: ", carbArr.reduce(getTotal));
					$scope.totalCalories = calArr.reduce(getTotal);
					$scope.totalProtein = proteinArr.reduce(getTotal);
					$scope.totalFat = fatArr.reduce(getTotal);
					$scope.totalCarbs = carbArr.reduce(getTotal);
					$scope.pieData = [$scope.totalProtein, $scope.totalFat, $scope.totalCarbs];
				});
			})
			.catch( (err) => {
				console.log(err);
			  });	
	};


	// ---------------------------------PIE CHART---------------------------------

	$scope.pieLabels = ["Protein", "Fat", "Carbs"];
	$scope.pieData = [1, 1, 1];
	

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
