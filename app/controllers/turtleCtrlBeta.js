(function () {
	'use strict';
	angular.module('app')
		.controller('TurtleCtrlBeta', turtleCtrlBeta);
		function turtleCtrlBeta($scope, localStorageService, turtleFact, $document) {
		var self = this;
		set_params();
		note_permission();

		function set_params() {
			self.timezone = jstz.determine().name();
			self.global = 'global';

			self.id = localStorageService.get('id');
			self.military = JSON.parse(localStorageService.get('military'));
			self.global = localStorageService.get('version');
			if (self.global === null)
				self.global = 'global';

			self.notif_support = true;
		}
		
		function note_permission() {
			// check if supported
			if (!("Notification" in window))
				self.notif_support = false;

			// check permission
			else if (Notification.permission === 'denied') {
				Notification.requestPermission(function (permission) {
					// display sample notification if permission granted
					if (permission === "granted")
						var notification = new Notification("test notification");
				});
			}
		}

		self.get_cal = function() {
			turtleFact.get_cal();
		};

		self.example_notification = function() {
			turtleFact.example_notification();
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