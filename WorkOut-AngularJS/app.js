angular.module("app",['7minworkout','ngSanitize','ngRoute'])
.config(function($routeProvider,$sceDelegateProvider)
{
  $routeProvider
  .when('/start',
  {
    templateUrl:'template/start.html'
  })
  .when('/workout',{
    templateUrl:'template/workout.html'
    
  })
  .when('/finish',{
    
    templateUrl:'template/finish.html'
  })
  .otherwise({
    
    redirectTo:'/start'
  });
  
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'https://*.youtube.com/**'
 
    
    ]);
});

// The above line is used because module 7minworkout is not in the same folder as app.js

angular.module("7minworkout",[]);