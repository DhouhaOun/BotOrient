/**
 * Created by dhouha on 04/05/2017.
 */
var myApp = angular.module('myApp');

myApp.controller('jobfrController',['$scope', '$http', '$location', '$routeParams',function($scope, $http, $location, $routeParams) {
    console.log('Controller loaded...');

    $scope.getjobsfr = function() {
        $http.get('/job/job').success(function(response) {
            $scope.jobs = response;
        });
    };





}]);