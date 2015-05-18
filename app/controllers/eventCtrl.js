angular.module('turtleApp')
	.controller('EventCtrl', function(){
		var self = this;
		self.timezone = jstz.determine().name();

		self.my_time = moment.utc("2015-05-18 13:00").local();
		// self.id = 0;

		self.range = function(num) {
			return new Array(num);
		};

	});