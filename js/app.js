var angularApp = angular.module('angularApp',['ngRoute', 'ngGrid']);

angularApp.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'create.html',
			controller: 'mainController'
		})
		.when('/play', {
			templateUrl: 'play.html',
			controller: 'playController'
		})
		.when('/play/:puzzleId', {
			templateUrl: 'play.html',
			controller: 'playController'
		})
		.when('/about', {
			templateUrl: 'about.html',
			controller: 'aboutController'
		});
});

//Takes 2d array and returns length of longest row
//Sets all rows to equal length by splicing -1 to front of arrays
function maxLength(arr){
	var max = -1;
	for(var row = 0; row < arr.length; row++){
		if(arr[row].length > max){
			max = arr[row].length;
		}
	}
	for(var row = 0; row < arr.length; row++){
		while(arr[row].length < max){
			arr[row].splice(0,0,-1);
		}
	}
	console.log(arr);
	return max;
}