/**
 * Created by WAEL on 17/04/2017.
 */
var myApp = angular.module('myApp');

myApp.controller('SectionController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
    console.log('SectionController loaded...');

    $scope.getSections = function(){
        $http.get('/apiSection/sections').success(function(response){
            $scope.sections = response;
        });
    }

    $scope.getSection = function(){
        var id = $routeParams.id;
        $http.get('/apiSection/sections/'+id).success(function(response){
            $scope.section = response;
        });
    }

    $scope.addSection = function(){
        console.log($scope.section);
        $http.post('/apiSection/sections/', $scope.section).success(function(response){
            window.location.href='#/sections';
        });
    }

    $scope.updateSection = function(){
        var id = $routeParams.id;
        $http.put('/apiSection/sections/'+id, $scope.university).success(function(response){
            window.location.href='#/sections';
        });
    }

    $scope.removeSection = function(id){
        $http.delete('/apiSection/sections/'+id).success(function(response){
            window.location.href='#/sections';
        });
    }
}]);