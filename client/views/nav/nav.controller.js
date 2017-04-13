(function()
{
    angular
        .module("myApp")
        .controller("NavCtrl", NavCtrl);
    
    function NavCtrl($scope, UserService, $location, $rootScope)
    {
        $scope.logout = logout;

        function logout()
        {
            UserService
                .logout()
                .then(
                    function(response){
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    },
                    function(err) {
                        $scope.error = err;
                    }
                );
        }
    }
})();
