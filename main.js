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

  // $scope.select = function(day, hour) {
  //   if ($scope.schedule[day][hour] === 1) {
  //     $scope.schedule[day][hour] = null;
  //   } else {
  //     $scope.schedule[day][hour] = 1;
  //   }
  //   console.log('day='+day, 'hour='+hour);
  //   scheduleTimes();
  // }

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

app.directive('dragSelect', function($window, $document) {
  return {
    controller: function($scope, $element) {
      var startCell = null;
      var dragging = false;

      function mouseUp(el) {
        dragging = false;
      }
      
      function mouseDown(el) {
        dragging = true;
        setStartCell(el);
        setEndCell(el);
      }
      
      function mouseEnter(el) {
        if (!dragging) return;
        setEndCell(el);
      }
      
      function setStartCell(el) {
        startCell = el;
      }
      
      function setEndCell(el) {
        $element.find($('.c')).removeClass('selected');
        cellsBetween(startCell, el).each(function() {
          var el = angular.element(this);
          el.addClass('selected');
        });
      }
      
      function cellsBetween(start, end) {
        var coordsStart = getCoords(start);
        var coordsEnd = getCoords(end);
        var topLeft = {
          column: $window.Math.min(coordsStart.column, coordsEnd.column),
          row: $window.Math.min(coordsStart.row, coordsEnd.row),
        };
        var bottomRight = {
          column: $window.Math.max(coordsStart.column, coordsEnd.column),
          row: $window.Math.max(coordsStart.row, coordsEnd.row),
        };
        return $element.find($('.c')).filter(function() {
          var el = angular.element(this);
          var coords = getCoords(el);
          return coords.column >= topLeft.column
              && coords.column <= bottomRight.column
              && coords.row >= topLeft.row
              && coords.row <= bottomRight.row;
        });
      }
      
      function getCoords(cell) {
        var row = cell.parents('row');
        console.log(cell[0].cellIndex);
        return {
          column: cell[0].cellIndex, 
          row: cell.parent()[0].rowIndex
        };
      }
    
      function wrap(fn) {
        return function() {
          var el = angular.element(this);
          $scope.$apply(function() {
            fn(el);
          });
        }
      }
      
      $element.delegate('.c', 'mousedown', wrap(mouseDown));
      $element.delegate('.c', 'mouseenter', wrap(mouseEnter));
      $document.delegate('body', 'mouseup', wrap(mouseUp));
    }
  }
});