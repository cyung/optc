angular.module('app', []);

angular.module('app')
	.controller('TimeCtrl', function(){
		var self = this;
		self.timezone = jstz.determine().name();

		var utctime = moment.utc("2015-05-04 13:00");
		var my_offset = moment().utcOffset();
		self.my_time = utctime.clone().utcOffset(my_offset);
		self.military = false;
		self.my_id = 0;

		self.turtle = function (my_time, id, week_num, second_time) {
			var weekly_order = [4,0,1,2,3];
			var ttime = my_time.clone();

			var temp;
			for (var i=0; i < week_num; i++) {
				ttime.add(7, 'days');
				temp = weekly_order.pop();
				weekly_order.unshift(temp);
			}

			if (id>4)
				id -=5;

			ttime.add(weekly_order[id]*2, 'hours');

			if (second_time)
				ttime.add(10,'hours');

			return ttime;
		};

		self.getDate = function (next_week) {
			if (!next_week)
				return self.day1.format('MMMM Do, YYYY');
			return self.day2.format('MMMM Do, YYYY');
		};

		self.printTime = function (date, military) {
			if (military)
				return date.format('HH:mm');
			return date.format('h:mm a');
		};

		self.range = function(num) {
			return new Array(num);
		};

	});