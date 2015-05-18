angular.module('turtleApp')
	.controller('EventCtrl', function(){
		var self = this;
		self.timezone = jstz.determine().name();

		var utctime = moment.utc("2015-05-18 13:00");
		var my_offset = moment().utcOffset();
		self.my_time = utctime.clone().utcOffset(my_offset);
		self.id = 0;

		self.range = function(num) {
			return new Array(num);
		};

	});