angular.module('app', []);

angular.module('app')
	.controller('TimeCtrl', function(){
		var self = this;
		self.timezone = jstz.determine().name();

		self.military = false;
		self.my_id = 0;

		self.my_time = moment().utc().startOf('isoWeek').add(13, 'hours').local();
		console.log('my_time', self.my_time);
		var end = self.my_time.clone().add(18,'hours');
		if (moment().isAfter(end))
			self.my_time.add(1, 'week');

		self.turtle = function (my_time, id, week_num, second_time) {
			var weekly_order = [0,1,2,3,4];
			var ttime = my_time.clone();

			week_num = parseInt(week_num);
			offset = week_num + my_time.isoWeek() + 2;
			offset = offset % 5;


			var temp;
			for (var i=0; i < offset; i++) {
				temp = weekly_order.pop();
				weekly_order.unshift(temp);
			}

			for (var i=0; i < week_num; i++) {
				ttime.add(1, 'week');
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