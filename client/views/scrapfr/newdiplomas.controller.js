var myApp = angular.module('myApp');

myApp.controller('DiplomasfrController',['$scope', '$http', '$location', '$routeParams',function($scope, $http, $location, $routeParams) {
    console.log('DiplomasController loaded...');

    $scope.getDiplomasfr = function() {
        $http.get('/diploma/diplomas').success(function(response) {
            $scope.diplomas = response;
        });
    };





}]);