(function () {
    'use strict';

    angular.module('mainApp',['ui.bootstrap', 'ngRoute'])
    	.config(function($locationProvider, $routeProvider){
    		$locationProvider
				.html5Mode(true)
				.hashPrefix('!');

    		$routeProvider
				.when('/', {
					templateUrl: 'front/front.html',
					controller: 'FrontController'
				})
				.when('/login', {
					templateUrl: 'login/login.html',
					controller: 'LoginController'
				})
				.when('/components', {
					templateUrl: 'components/components.html',
					controller: 'ComponentsController'
				})
				.when('/components/group/:groupId', {
					templateUrl: 'group/group.html',
					controller: 'GroupController'
				})
				.when('/components/:componentId', {
					templateUrl: 'component/component.html',
				})
				.when('/students', {
					templateUrl: 'students/students.html',
					controller: 'StudentsController'
				})
				.otherwise({
					redirectTo: '/'
				});
    	})
    	.controller('AppController', function($scope, $location){
    		$scope.currentUri = function(){
    			return $location.url();
    		};
    	})

})();