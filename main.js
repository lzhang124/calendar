var app = angular.module('calendar', []);

app.controller('calendarController', function($scope) {
  $scope.week = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
  ];
  $scope.times = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11'
  ];

  var hours = 24;
  var days = 7;
  $scope.schedule = new Array(hours);
  for (var i = 0; i < hours; i++) {
    $scope.schedule[i] = new Array(days);
  }

  $scope.number = function(num) {
    return new Array(num);
  }

  $scope.select = function(day, hour) {
    if ($scope.schedule[hour][day] === 1) {
      $scope.schedule[hour][day] = null;
    } else {
      $scope.schedule[hour][day] = 1;
    }
    console.log('day='+day, 'hour='+hour);
  }
});