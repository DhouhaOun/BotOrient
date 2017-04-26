(function()
{
    angular
        .module("myApp")
        .controller('newsController', newsController);
    
    function newsController($scope, UserService)
    {
    

        $scope.send = function ()
        {
            UserService
                .send(this.subject,this.text)
                .then(
                    function(response) {
    
                      console.log("email est envoyé")
                    },
                    function(err) {
                        $scope.error = err;
                        console.log("error")
                    }
                );
        }
    }
})();
