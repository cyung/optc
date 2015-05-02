angular.module('app', []);

angular.module('app')
	.controller('TimeCtrl', function(){
		var self = this;
		self.weekly_order = [4,0,1,2,3]; // id=1 is the first offset
		self.timezone = jstz.determine().name();

		self.utctime = moment.utc("2015-05-04 13:00");
		self.my_offset = moment().utcOffset();
		self.my_time = self.utctime.clone();
		self.my_time.utcOffset(self.my_offset);
		self.day1 = self.my_time.clone();
		self.day2 = self.my_time.clone();
		self.military = false;

		self.turtle = function turtle (id, second_time, next_week) {
			var weekly_order = self.weekly_order.slice(0);
			var ttime = self.my_time.clone();
			if (next_week){
				ttime.add(7, 'days');
				var temp = weekly_order.pop();
				weekly_order.unshift(temp);
			}

			// add additional offset for id 6th digit
			if (id>4)
				id -=5;
			ttime.add(weekly_order[id]*2, 'hours');

			// if second turtle time, add 10 hours
			if (second_time)
				ttime.add(10,'hours');
			else {
				if (!next_week)
					self.day1 = ttime.clone();
				else
					self.day2 = ttime.clone();
			}

			return printTime(ttime);
		};


		self.getDate = function getDate(next_week) {
			if (!next_week)
				return self.day1.format('MMMM Do, YYYY');
			return self.day2.format('MMMM Do, YYYY');
		};

		function printTime(date) {
			if (self.military)
				return date.format('HH:mm');
			return date.format('h:mm a');
		}


	});