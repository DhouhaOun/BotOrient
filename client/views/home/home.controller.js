(function()
{
    angular
        .module("myApp")
        .controller("HomeController", HomeController);
    
    function HomeController($scope,$http)
    {

        $scope.subscribe = function() {
            console.log(this.subject,this.text);

            $http.post('/apisub/add', $scope.sub).success(function(response) {
                console.log("test");

            });
        };
    }
})();

