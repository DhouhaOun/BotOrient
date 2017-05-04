/**
 * Created by dhouha on 04/05/2017.
 */
var myApp = angular.module('myApp');

myApp.controller('universityfrController',['$scope', '$http', '$location', '$routeParams',function($scope, $http, $location, $routeParams) {
    console.log('Controller loaded...');

    $scope.getuniversityfr = function() {
        $http.get('/university/university').success(function(response) {
            $scope.univesitys = response;
        });
    };





}]);