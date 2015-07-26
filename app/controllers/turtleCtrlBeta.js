(function () {
	'use strict';
	angular.module('app')
		.controller('TurtleCtrlBeta', turtleCtrlBeta);
		function turtleCtrlBeta($scope, localStorageService, turtleFact, $document) {
		var self = this;
		set_params();

		function set_params() {
			self.timezone = jstz.determine().name();
			self.global = 'global';

			self.id = localStorageService.get('id');
			self.military = JSON.parse(localStorageService.get('military'));
			self.global = localStorageService.get('version');
			if (self.global === null)
				self.global = 'global';
		}
		



		self.get_cal = function () {
			turtleFact.get_cal();
		};

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
			self.ttimes = turtleFact.get_ttimes(20);
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