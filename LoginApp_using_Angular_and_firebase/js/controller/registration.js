angular.module('myApp').controller("RegistrationController",['$scope','Authentication',function($scope,Authentication)
{
  
  
  //$scope.message="Welcome to my App";
  $scope.login=function()
  {
    Authentication.login($scope.user);
    
    
  };//LOGIN
  $scope.register=function()
  {
    Authentication.register($scope.user);
    
    
  };//END of SCOPE REGISTER
  $scope.logout=function()
  {
  	Authentication.logout();
  }
  
}]);//END OF CONTROLLER