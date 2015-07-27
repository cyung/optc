(function () {
	'use strict';

	angular.module('app')
		.factory('turtleFact', turtleFact);

	function turtleFact() {
		var ttimes = [];
		var id;
		var my_time = get_current_time();
		var notifications = [];
		var notif_time, notif_sound;
		var notif_audio = new Audio('sounds/notification.mp3');

		var services = {
			set_id: set_id,
			get_ttimes: get_ttimes,
			get_cal: get_cal,
			example_notification: example_notification,
			set_notif_time: set_notif_time,
			set_notif_sound: set_notif_sound
		};

		return services;

		function set_id(i) {
			id = i;
			get_ttimes();
		}

		function get_ttimes() {
			ttimes = [];
			calc_ttimes_all();
			return ttimes;
		}

		function get_current_time() {
			var my_time = moment.utc().startOf('isoWeek').add(13, 'hours').local();
			var end = my_time.clone().add(18, 'hours');
			if (moment().isAfter(end))
				my_time.add(1, 'week');
			return my_time;
		}

		function calc_ttimes_all() {
			var num_weeks = 2;
			var i = 0;
			var second_time = false;

			while (i<num_weeks) {
				ttimes.push(calc_ttime(i, second_time));
				if (second_time)
					i++;
				second_time = !second_time;
			}

			set_notifications();
		}

		function calc_ttime(week_num, second_time) {
			var weekly_order = [0,1,2,3,4];
			var ttime = my_time.clone();
			var offset = week_num + my_time.isoWeek() + 3;

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

		function get_cal() {
			var cal = ics();

			var subject = "OPTC Turtle Time";
			var description = "One Piece Treasure Cruise Turtle Time";
			var location = "OPTC";
			var begin, end;

			for (var i=0; i<2; i++) {
				begin = ttimes[i].format();
				end = ttimes[i].clone().add(30, 'minutes').format();
				cal.addEvent(subject, description, location, begin, end);
			}

			cal.download('turtle_time', '.ics');
		}

		function set_notifications() {
			var now = moment();
			var options = {
				body: '10 minutes till Turtle Time!',
				icon: 'favicon.ico'
			};
			var time_until;

			for (var i=0; i<ttimes.length; i++) {
				if (now.isAfter(ttimes[i]))
					continue;

				time_until = ttimes[i].format('x') - now.format('x');
				time_until -= notif_time;
				console.log('time_until = ', time_until);
				if (time_until < 0)
					continue;

				if (notifications[i] !== undefined)
					clearTimeout(notifications[i]);

				notifications[i] = setTimeout(function() {
					var instance = new Notification("OPTC Turtle Time", options);
					if (notif_sound)
						notif_audio.play();
				}, time_until);
			}
		}

		function example_notification() {
			var options = {
				body: '10 minutes till Turtle Time!',
				icon: 'favicon.ico'
			};

			var instance = new Notification("OPTC Turtle Time", options);
			if (notif_sound)
				notif_audio.play();
		}

		function set_notif_time(minutes) {
			notif_time = 1000 * 60 * minutes;
		}

		function set_notif_sound(sound) {
			notif_sound = sound;
		}

	}
})();