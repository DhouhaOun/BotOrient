(function() {
    angular.module("myApp")
        .config(function($routeProvider, $httpProvider) {
            $routeProvider
              .when('/home', {
                  templateUrl: 'views/home/home.view.html',
                  controller: 'HomeController',
                  resolve: {
                      loggedin: checkCurrentUser
                  }
              })
              .when('/profile', {
                  templateUrl: 'views/profile/profile.view.html',
                  controller: 'ProfileCtrl',
                  resolve: {
                      loggedin: checkLoggedin
                  }
              })
              .when('/admin', {
                  templateUrl: 'views/admin/admin.view.html',
                  controller: 'AdminController',
                  resolve: {
                      loggedin: checkAdmin
                  }
              })
              .when('/login', {
                  templateUrl: 'views/login/login.view.html',
                  controller: 'LoginCtrl',
                  controllerAs: 'model'
              })
              .when('/register', {
                  templateUrl: 'views/register/register.view.html',
                  controller: 'RegisterCtrl',
                  controllerAs: 'model'
              }).when('/feeds', {
                templateUrl: 'templates/index.html',
                controller: 'MyFeedsController',
                controllerAs: 'model'
            })
                .when('/diplomas',{
                    controller:'DiplomasController',
                    templateUrl:'views/diploma/diplomas.html'
                })
                .when('/diplomas/detail/:id',{
                    controller:'DiplomasController',
                    templateUrl:'views/diploma/diploma_detail.html'
                })
                .when('/diplomas/test/:genreing',{
                    controller:'DiplomasController',
                    templateUrl:'views/diploma/diplomeing.html'
                })
                .when('/diplomas/test/:genremaster',{
                    controller:'DiplomasController',
                    templateUrl:'views/diploma/diplomemaster.html'
                })
                .when('/diplomas/test/:genrelicense',{
                    controller:'DiplomasController',
                    templateUrl:'views/diploma/diplomelicense.html'
                })
                .when('/diplomas/test/:genrebts',{
                    controller:'DiplomasController',
                    templateUrl:'views/diploma/diplomebts.html'
                })
                .when('/diplomas/add',{
                    controller:'DiplomasController',
                    templateUrl:'views/diploma/add_diploma.html'
                })
                .when('/diplomas/edit/:id',{
                    controller:'DiplomasController',
                    templateUrl:'views/diploma/edit_diploma.html'
                })
                .when('/universitys', {
                    controller:'UniversityController',
                    templateUrl: 'views/universitys.html'
                })
                .when('/universitys/details/:id',{
                    controller:'UniversityController',
                    templateUrl: 'views/university_details.html'
                })
                .when('/universitys/add',{
                    controller:'UniversityController',
                    templateUrl: 'views/add_university.html'
                })
                .when('/universitys/edit/:id',{
                    controller:'UniversityController',
                    templateUrl: 'views/edit_university.html'
                })
                .when('/universitys/delete/:id',{
                    controller:'UniversityController',
                    templateUrl: 'views/universitys.html'
                })
                .when('/jobs', {
                    controller:'JobsController',
                    templateUrl: 'views/jobs.html'
                })
                .when('/jobs/details/:id',{
                    controller:'JobsController',
                    templateUrl: 'views/job_details.html'
                })
                .when('/jobs/add',{
                    controller:'JobsController',
                    templateUrl: 'views/add_job.html'
                })
                .when('/jobs/edit/:id',{
                    controller:'JobsController',
                    templateUrl: 'views/edit_job.html'
                })
                .when('/jobs/delete/:id',{
                    controller:'JobsController',
                    templateUrl: 'views/jobs.html'
                })
              .otherwise({
                  redirectTo: '/login'
              });
        });
    
    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();
    
        $http.get('/api/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('admin') != -1)
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
        });
        
        return deferred.promise;
    };
    
    
    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();
    
        $http.get('/api/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });
        
        return deferred.promise;
    };
    
    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();
    
        $http.get('/api/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
            }
            deferred.resolve();
        });
        
        return deferred.promise;
    };

  
})();

