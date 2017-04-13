var myApp = angular.module('PassportApp');

myApp.controller('UniversityController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	console.log('UniversityController loaded...');

	$scope.getUniversitys = function(){
		$http.get('/apiUniversity/universitys').success(function(response){
			$scope.universitys = response;
		});
	}

	$scope.getUniversity = function(){
		var id = $routeParams.id;
		$http.get('/apiUniversity/universitys/'+id).success(function(response){
			$scope.university = response;
		});
	}

	$scope.addUniversity = function(){
		console.log($scope.university);
		$http.post('/apiUniversity/universitys/', $scope.university).success(function(response){
			window.location.href='#/universitys';
		});
	}

	$scope.updateUniversity = function(){
		var id = $routeParams.id;
		$http.put('/apiUniversity/universitys/'+id, $scope.university).success(function(response){
			window.location.href='#/universitys';
		});
	}

	$scope.removeUniversity = function(id){
		$http.delete('/apiUniversity/universitys/'+id).success(function(response){
			window.location.href='#/universitys';
		});
	}
}]);