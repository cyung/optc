angular.module('app', []);

angular.module('app')
	.controller('TimeCtrl', function(){
		var self = this;
		self.id_order = [0,1,2,3,4,5];

		self.turtle = function turtle (id, second_time) {
			var ttime = moment.utc("2015-04-27 13:00");
			if (second_time)
				ttime.add(10,'hours');
			// set my_ttime1 to local time
			var my_offset = moment().utcOffset();
			var my_ttime = ttime.clone();
			my_ttime.utcOffset(my_offset);

			// add additional offset for id 6th digit
			if (id>4)
				id -=5;

			my_ttime.add(id*2, 'hours');

			return printTime(my_ttime);
		};


		function printDate(date) {
			return date.format('YYYY-MM-DD HH:mm:ss');
		}
		function printTime(date) {
			return date.format('h:mm a');
		}


	});