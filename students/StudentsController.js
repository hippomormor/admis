(function () {
    'use strict';

    angular.module('mainApp')
    	.controller('StudentsController', function($scope, apiService, $uibModal, $location){
    		
            $scope.sort = {
                active: true,
                inactive: false
            };
            $scope.search = "";

    		if(!apiService.isLoggedIn()){
    			$location.url('login');
    		}

            apiService.getStudents().then(function(students){
                $scope.students = students;
            });

            $scope.specialSort = function(student){
                return ($scope.sort.active == true && student.status == 1) ||
                       ($scope.sort.inactive == true && student.status != 1);
            };

            $scope.$watchCollection('sort', function () {
                for(var s in $scope.sort){
                    if($scope.sort[s])
                        return;
                }
                $scope.sort.active = true;
            });

            $scope.openStudent = function(student){
                $location.url("students/"+student.studentId);
            };

    	})
        .filter('studentStatus', function() {
            return function(input) {
                return input == 1 ? 'Aktiv' : 'Inaktiv';
            };
        });

})();