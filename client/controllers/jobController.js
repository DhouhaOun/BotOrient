var myApp = angular.module('myApp');

myApp.controller('JobsController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	console.log('JobsController loaded...');

	$scope.getJobs = function(){
		$http.get('/api/jobs').success(function(response){
			$scope.jobs = response;
		});
	}

	$scope.getJob = function(){
		var id = $routeParams.id;
		$http.get('/api/jobs/'+id).success(function(response){
			$scope.job = response;
		});
	}

	$scope.addJob = function(){
		console.log($scope.job);
		$http.post('/api/jobs/', $scope.job).success(function(response){
			window.location.href='#/jobs';
		});
	}

	$scope.updateJob = function(){
		var id = $routeParams.id;
		$http.put('/api/jobs/'+id, $scope.job).success(function(response){
			window.location.href='#/jobs';
		});
	}

	$scope.removeJob = function(id){
		$http.delete('/api/jobs/'+id).success(function(response){
			window.location.href='#/jobs';
		});
	}
}]);