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
			self.notif_time = localStorageService.get('notif_time');
			if (self.notif_time === null)
				self.notif_time = 10;
			self.notif_sound = JSON.parse(localStorageService.get('notif_sound'));
			if (self.notif_sound === null)
				self.notif_sound = false;
		}
		
		function note_permission() {
			// if not supported, show mesage
			if (!("Notification" in window))
				self.notif_support = false;
			else
				Notification.requestPermission();
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

		$scope.$watch(function() {
			return self.notif_time;
		}, function(newVal, oldVal) {
			localStorageService.set('notif_time', newVal);
			turtleFact.set_notif_time(self.notif_time);
		});

		$scope.$watch(function() {
			return self.notif_sound;
		}, function(newVal, oldVal) {
			localStorageService.set('notif_sound', newVal);
			turtleFact.set_notif_sound(self.notif_sound);
		});
	}
})();