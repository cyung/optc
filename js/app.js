angular.module('app', []);

angular.module('app')
	.controller('TimeCtrl', function(){
		var self = this;
		self.weekly_order = [0,1,2,3,4];
		// self.weekly_order = [1,2,3,4,0]; // id=4 is the first time
		self.timezone = jstz.determine().name();

		self.utctime = moment.utc("2015-04-27 13:00");
		self.my_offset = moment().utcOffset();
		self.my_time = self.utctime.clone();
		self.my_time.utcOffset(self.my_offset);

		self.day = self.my_time.clone();

		self.turtle = function turtle (id, second_time) {
			var ttime = self.my_time.clone();

			// add additional offset for id 6th digit
			if (id>4)
				id -=5;
			ttime.add(self.weekly_order[id]*2, 'hours');

			// if second turtle time, add 10 hours
			if (second_time)
				ttime.add(10,'hours');
			else // if first time, set the day
				self.day = ttime.clone();

			return printTime(ttime);
		};


		self.getDate = function getDate(date) {
			return self.day.format('MMMM Do, YYYY');
		};

		function printTime(date) {
			return date.format('h:mm a');
		}


	});