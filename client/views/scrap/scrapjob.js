var myApp = angular.module('myApp');

myApp.controller('scrapjobController',function($scope, $localStorage, $http){
    $scope.$storage = $localStorage;
    $scope.welcome = true;
    $scope.npages = 1;
    $scope.getData = function() {
        $scope.loading = true;
        $scope.welcome = false;
        $scope.ready = false;
        $http.post('/job/paginate', {npages: $scope.$storage.npages})
            .success(function(data) {
                $scope.data = data.pages;
            })
            .finally(function(){
                $scope.loading = false;
                $scope.ready = true;
            });
    }
    $scope.reset = function() {
        $scope.welcome = true;
        $scope.ready = false;
    }
});
