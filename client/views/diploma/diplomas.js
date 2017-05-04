var myApp = angular.module('myApp');

myApp.controller('DiplomasController',['$scope', '$http', '$location', '$routeParams',function($scope, $http, $location, $routeParams) {
    console.log('DiplomasController loaded...');

        $scope.getDiplomas = function() {
            $http.get('/apidiploma/diplomas').success(function(response) {
                $scope.diplomas = response;
            });
        };

        $scope.getDiploma = function() {
            var id = $routeParams.id;   //get id มา
            $http.get('/apidiploma/diplomas/'+id).success(function(response) {
                $scope.diploma = response;
            });
        };
        $scope.addDiploma = function() {
            console.log($scope.diploma);
            $http.post('/apidiploma/diplomas/', $scope.diploma).success(function(response) {
                window.location.href='#/diplomas';

            });
        };
   
        $scope.updateDiploma = function() {
            var id = $routeParams.id;
            $http.put('/apidiploma/diplomas/'+id, $scope.diploma).success(function(response) {
                window.location.href='#/diplomas';
                $.smkAlert({ text: "success update", type:'warning', position:'bottom-right'});
            });
        };
        $scope.removeDiploma = function(id) {
            $http.delete('/apidiploma/diplomas/'+id).success(function(response) {
                window.location.href='#/diplomas';
                $('#myModal').modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
            });
        };

}]);