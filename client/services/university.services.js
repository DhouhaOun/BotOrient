/**
 * Created by ste usb on 26/04/2017.
 */
(function(){
    angular
        .module("myApp")
        .factory("UService", UService);

    function UService($http) {
        var api = {

            getUniversityss: getUniversityss
        };
        return api;
        function getUniversityss() {
          return  $http.get('/apiUniversity/universitys');
        }
    }
})();