(function () {
    'use strict';

    angular.module('admisApp')
    	.controller('LoansController', function($scope, apiService, $uibModal, $location, $filter){

            var groupNameMap = [];
            apiService.getLoans().then(function(loans){
                $scope.loans = loans;

                var oneDay = 1000*3600*24;
                $scope.loans.forEach(function(loan){
                    apiService.getComponent(loan.barcode).then(function(response){
                        loan.componentGroupName = response.componentGroup.name;
                    });
                    loan.status = loan.deliveryDate == "" ? 1 : 0;
                    var dueDate = $filter('dateFromSting')(loan.dueDate);
                    loan.daysToDelivery = (dueDate - (new Date).getTime())/oneDay;
                    console.log(loan.daysToDelivery);
                });
            }, function(response){
                $scope.showAlert("Kunne ikke hente lån");
            });

            $scope.loanSort = {
                active: true,
                inactive: false,
                exceeded: false
            };
            $scope.$watchCollection('loanSort', function (sort) {
                for(var s in sort){
                    if(sort[s])
                        return;
                }
                sort.active = true;
            });


            $scope.openLoan = function(loan){
                $location.url("loans/"+loan.loanId);
            };
    	})
        .filter('loansSort', function() {
            return function(items, sortObj) {
                var filtered = [];
                angular.forEach(items, function(item) {
                    if(sortObj.exceeded){
                        if(item.status != 1 || item.daysToDelivery > 0)
                            return;
                    }
                    if( (sortObj.active && item.status) ||
                        (sortObj.inactive && !item.status)){
                        filtered.push(item);
                    }
                });
                return filtered;
            };
        })
})();