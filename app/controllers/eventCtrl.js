angular.module('turtleApp')
	.controller('EventCtrl', function(localStorageService){
		var self = this;
		self.timezone = jstz.determine().name();

		self.my_time = moment.utc("2015-05-19 13:00").local();
		self.id = localStorageService.get('id');
		self.military = JSON.parse(localStorageService.get('military'));

		self.range = function(num) {
			return new Array(num);
		};

	});