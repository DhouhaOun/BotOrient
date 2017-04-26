// Code goes here



function MyControllerFN($scope,$http) {
    $scope.getUniversitys = function(){
        $http.get('/apiUniversity/universitys').success(function(response){
            $scope.universitys = response;
        });
    }
  // var list=Project.query();
///$scope.projects=[];
 //$scope.projects=Project.query();

  /*  $scope.getUniversitys = function(){
        $http.get('/apiUniversity/universitys').success(function(response){
            $scope.universitys = response;
        });
    }*/
    /*
    $scope.projects.$promise.then(function(data) {
       console.log(data);
   });
   */
   // angular.toJson($scope.projects) ;
    //console.log($scope.projects);
      
  $scope.currentPage = 1;
  $scope.pageSize = 5;
 $scope.universitys = [];
//console.log($scope.meals);
 var dishes = [
    'medecine university',
    
    'Graduate School of Health Sciences and Techniques at the University',
     'Higher Institute of Computer Science and Mathematics',
     'Higher Institute of civilization Islamic'

  ];
  var sides = [
    'Tunis',
    'sousse',
    'sfax',

  
  ];
  for (var i = 1; i <= 10; i++) {
   var dish = dishes[Math.floor(Math.random() * dishes.length)];
    var side = sides[Math.floor(Math.random() * sides.length)];
    $scope.universitys.push('' + i + ': ' + dish + ' ' + side);
  }
  /* for(var i=0; i<=list.length;i++){
        $scope.projects.push(list.indexOf(i).name);
      
    };*/
  
  $scope.pageChangeHandler = function(num) {
      console.log('projects page changed to ' + num);
  };
}

function OtherController($scope) {
  $scope.pageChangeHandler = function(num) {
   console.log('going to page ' + num);
 };
}
/*var ctrl= function($scope){
    $scope.message="hello";
};*/
angular
    .module("myApp")
.controller('MyController', MyControllerFN)

.controller('OtherController', OtherController);
/*.controller("myCtrl",ctrl);*/




