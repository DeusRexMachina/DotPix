var angularApp = angular.module('angularApp',['ngRoute']);

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
		.when('/about', {
			templateUrl: 'about.html',
			controller: 'aboutController'
		});
});