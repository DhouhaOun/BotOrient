var myApp = angular.module('myApp');

myApp.controller('subController',['$scope', '$http', '$location', '$routeParams',function($scope, $http, $location, $routeParams) {
    console.log('subController loaded...');


    $scope.subscribe = function() {

        $http.post('/apisub/subsribe/', $scope.sub).success(function(response) {

            $.smkAlert({ text: "success insert", type:'success', position:'bottom-right'});
        });
    };

}]);