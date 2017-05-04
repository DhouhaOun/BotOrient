(function()
{
    angular
        .module("myApp")
        .controller('newsController', newsController);
    
    function newsController($scope,$http)
    {

        $scope.sendNews = function() {
            console.log(this.subject,this.text);
            $http.post("/apisub/sendnews?text="+this.text+"&subject="+this.subject).success(function(response) {
                console.log("email est envoyé")

            });
        };

    }
})();
