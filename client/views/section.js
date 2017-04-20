/**
 * Created by WAEL on 17/04/2017.
 */
var myApp = angular.module('PassportApp');

myApp.controller('SectionController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
    console.log('SectionController loaded...');

    $scope.getSections = function(){
        $http.get('/api/sections').success(function(response){
            $scope.sections = response;
        });
    }

    $scope.getSection = function(){
        var id = $routeParams.id;
        $http.get('/api/section/'+id).success(function(response){
            $scope.section = response;
        });
    }

    $scope.addSection = function(){
        console.log($scope.section);
        $http.post('/api/section/', $scope.section).success(function(response){
            window.location.href='#/section';
        });
    }

    $scope.updateSection = function(){
        var id = $routeParams.id;
        $http.put('/api/section/'+id, $scope.university).success(function(response){
            window.location.href='#/section';
        });
    }

    $scope.removeSection = function(id){
        $http.delete('/api/section/'+id).success(function(response){
            window.location.href='#/section';
        });
    }
}]);