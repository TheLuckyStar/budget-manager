'use strict';

/* App Module */

var budgetApp = angular.module('budgetApp', [
  'ngRoute',
  'budgetControllers',
]);

budgetApp.factory('UserService', [function() {
    var user = {
      isLogged: false,
      username: ''
    };

    return user;
}]);

budgetApp.directive('checkUser', ['$rootScope', '$location', 'UserService', function ($root, $location, userSrv) {
  return {
    restrict: 'A',
    link: function (scope, elem, attrs, ctrl) {
      $root.$on('$routeChangeStart', function(event, nextRoute, currentRoute){
        if (nextRoute.access.requiredLogin && !userSrv.isLogged) {
          $location.path("/login");
        }
      });
    }
  }
}]);

var budgetControllers = angular.module('budgetControllers', []);

budgetApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/accounts', {
        templateUrl: 'partials/account-list.html',
        controller: 'AccountListCtrl',
        access: { requiredLogin: true }
      }).
      when('/accounts/:accountId', {
        templateUrl: 'partials/account-detail.html',
        controller: 'AccountDetailCtrl',
        access: { requiredLogin: true }
      }).
      when('/categories', {
        templateUrl: 'partials/category.html',
        controller: 'CategoryCtrl',
        access: { requiredLogin: true }
      }).
      when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl',
        access: { requiredLogin: false }
      }).
      otherwise({
        redirectTo: '/accounts',
        access: { requiredLogin: true }
      });
  }]);

