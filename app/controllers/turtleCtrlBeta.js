(function () {
	'use strict';
	angular.module('app')
		.controller('TurtleCtrlBeta', turtleCtrlBeta);
	function turtleCtrlBeta($scope, localStorageService, turtleFact) {
		var self = this;
		set_params();
		console.log(turtleFact.get_ttimes());

		function set_params() {
			self.timezone = jstz.determine().name();
			self.global = 'global';

			self.id = localStorageService.get('id');
			self.military = JSON.parse(localStorageService.get('military'));
			self.global = localStorageService.get('version');
			if (self.global === null)
				self.global = 'global';
		}

		self.version = function() {
			return (self.global === 'global');
		};

		self.range = function(num) {
			return new Array(num);
		};

		$scope.$watch(function() {
			return self.id;
		}, function(newVal, oldVal) {
			localStorageService.set('id', newVal);
			turtleFact.set_id(self.id);
			self.ttimes = turtleFact.get_ttimes();
		});

		$scope.$watch(function() {
			return self.military;
		}, function(newVal, oldVal) {
			localStorageService.set('military', newVal);
		});

		$scope.$watch(function() {
			return self.global;
		}, function(newVal, oldVal) {
			localStorageService.set('version', newVal);
		});
	}
})();