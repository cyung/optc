(function () {
	'use strict';

	angular.module('app')
		.factory('turtleFact', turtleFact);

	function turtleFact() {
		var ttimes = [];
		var id;
		var my_time = get_current_time();

		var services = {
			set_id: set_id,
			get_ttimes: get_ttimes
		};

		return services;

		function set_id(i) {
			id = i;
			get_ttimes();
		}

		function get_ttimes(num_weeks) {
			if (num_weeks === undefined) {
				num_weeks = 2;
			}
			ttimes = [];
			calc_ttimes_all(num_weeks);
			return ttimes;
		}

		function get_current_time() {
			var my_time = moment().utc().startOf('isoWeek').add(13, 'hours');
			var end = my_time.clone().add(18, 'hours');
			if (moment().isAfter(end))
				my_time.add(1, 'week');
			return my_time;
		}

		function calc_ttimes_all(num_weeks) {
			var i = 0;
			var second_time = false;

			while (i<num_weeks) {
				ttimes.push(calc_ttime(i, second_time));
				if (second_time)
					i++;
				second_time = !second_time;
			}
		}

		function calc_ttime(week_num, second_time) {
			var weekly_order = [0,1,2,3,4];
			var ttime = my_time.clone();
			var offset = week_num + my_time.isoWeek();

			offset = offset % 5;

			for (var i=0; i < offset; i++)
				weekly_order.unshift(weekly_order.pop());

			for (i=0; i < week_num; i++)
				ttime.add(1, 'week');

			if (id>4)
				id -=5;

			ttime.add(weekly_order[id]*2, 'hours');
			if (second_time)
				ttime.add(10,'hours');

			return ttime;
		}
	}
})();