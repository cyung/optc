angular.module('turtleApp')
	.controller('TurtleCtrl', function($scope, localStorageService){
		var self = this;
		self.timezone = jstz.determine().name();

		self.my_time = moment().utc().startOf('isoWeek').add(13, 'hours').local();
		var end = self.my_time.clone().add(18,'hours');
		if (moment().isAfter(end))
			self.my_time.add(1, 'week');

		self.id = localStorageService.get('id');
		self.military = JSON.parse(localStorageService.get('military'));

		self.range = function(num) {
			return new Array(num);
		};

	});