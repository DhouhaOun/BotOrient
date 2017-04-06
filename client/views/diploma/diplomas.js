var myApp = angular.module('PassportApp');

myApp.controller('DiplomasController',['$scope', '$http', '$location', '$routeParams',function($scope, $http, $location, $routeParams) {
    console.log('DiplomasController loaded...');

        $scope.getDiplomas = function() {
            $http.get('/api/diplomas').success(function(response) {
                $scope.diplomas = response;
            });
        };

        $scope.getDiploma = function() {
            var id = $routeParams.id;   //get id มา
            $http.get('/api/diplomas/'+id).success(function(response) {
                $scope.diploma = response;
            });
        };
        $scope.addDiploma = function() {
            console.log($scope.diploma);
            $http.post('/api/diplomas/', $scope.diploma).success(function(response) {
                window.location.href='#/diplomas';
                $.smkAlert({ text: "success insert", type:'success', position:'bottom-right'});
            });
        };
        $scope.updateDiploma = function() {
            var id = $routeParams.id;
            $http.put('/api/diplomas/'+id, $scope.book).success(function(response) {
                window.location.href='#/diplomas';
                $.smkAlert({ text: "success update", type:'warning', position:'bottom-right'});
            });
        };
        $scope.removeDiploma = function(id) {
            $http.delete('/api/diplomas/'+id).success(function(response) {
                window.location.href='#/diplomas';
                $('#myModal').modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
            });
        };
}]);