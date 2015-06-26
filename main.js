var app = angular.module('calendar', []);

app.controller('calendarController', function($scope) {
  $scope.hours = 24;
  $scope.days = 7;
});