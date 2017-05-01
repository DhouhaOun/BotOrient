var myApp = angular.module('myApp');

myApp.controller('AdminController',['$scope', '$http', '$location', '$routeParams','UserService',function($scope, $http, $location, $routeParams,UserService) {
    console.log('Controller loaded...');

    $scope.getusers = function() {
        $http.get('/api/users').success(function(response) {
            $scope.users = response;
        });
    };
    $scope.remove = remove;
    $scope.update = update;
    $scope.add    = add;
    $scope.select = select;

    function remove(user)
    {
        UserService
            .deleteUser(user._id)
            .then(handleSuccess, handleError);
    }

    function update(user)
    {
        UserService
            .updateUser(user._id, user)
            .then(handleSuccess, handleError);
    }

    function add(user)
    {
        UserService
            .createUser(user)
            .then(handleSuccess, handleError);
    }

    function select(user)
    {
        $scope.user = angular.copy(user);
    }

    function handleSuccess(response) {
        $scope.users = response.data;
    }

    function handleError(error) {
        $scope.error = error;
    }

}]);