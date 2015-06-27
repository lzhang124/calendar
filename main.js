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
  $scope.schedule = new Array(days);
  for (var i = 0; i < days; i++) {
    $scope.schedule[i] = new Array(hours);
  }

  $scope.number = function(num) {
    return new Array(num);
  }

  $scope.select = function(day, hour) {
    if ($scope.schedule[day][hour] === 1) {
      $scope.schedule[day][hour] = null;
    } else {
      $scope.schedule[day][hour] = 1;
    }
    console.log('day='+day, 'hour='+hour);
    scheduleTimes();
  }

  $scope.startTimes = [];
  $scope.durations = [];
  var scheduleTimes = function() {
    $scope.startTimes = [];
    $scope.durations = [];
    var block = false;
    var duration;
    for (var day = 0; day < 7; day++) {
      for (var hour = 0; hour < 24; hour++) {
        if ($scope.schedule[day][hour] === 1) {
          if (block) {
            duration++;
          } else {
            $scope.startTimes.push(hour);
            block = true;
            duration = 1;
          }
        } else {
          if (block) {
            $scope.durations.push(duration);
            block = false;
          }
        }
      }
    }
  }
});