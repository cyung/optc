angular.module('app')
	.directive('turtleDay', [function () {
		return {
			restrict: 'E',
			scope: {
				military: '=',
				index: '@',
				turtle: '&',
				printTime: '&',
				my_id: '=myId',
				my_time: '=myTime',
			},
			template: '<div><h2>{{date}}</h2><p>First time {{ttime1_format}}</p><p>Second time {{ttime2_format}}</p></div>',
			link: function (scope, elem, attrs) {
				var turtleHandler = scope.turtle();
				var printHandler = scope.printTime();
				scope.$watch('military', function(value) {
					update_times();
				});

				scope.$watch('my_id', function(value) {
					update_times();
				});

				function update_times() {
					scope.ttime1 = turtleHandler(scope.my_time, scope.my_id, scope.index, false);
					scope.ttime2 = turtleHandler(scope.my_time, scope.my_id, scope.index, true);

					scope.date = scope.ttime1.format('MMMM Do, YYYY');
					scope.ttime1_format = printHandler(scope.ttime1, scope.military);
					scope.ttime2_format = printHandler(scope.ttime2, scope.military);
				}
			}
		};
	}])
	.directive('selectOnClick', [function () {
		return {
			restrict: 'A',
			link: function (scope, elem, attrs) {
				var focused;
				elem.on('click', function() {
					if (focused != this) {
						this.select();
						focused = this;
					}
				});
				elem.on('blur', function() {
					focused = null;
				});
			}
		};
	}]);