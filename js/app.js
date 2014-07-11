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
function maxLength(arr){
	var max = -1;
	for(var row = 0; row < arr.length; row++){
		if(arr[row].length > max){
			max = arr[row].length;
		}
	}
	return max;
}