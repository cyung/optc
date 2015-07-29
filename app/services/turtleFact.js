(function () {
	'use strict';

	angular.module('app')
		.factory('turtleFact', turtleFact);

	function turtleFact() {
		var ttimes = [];
		var id, my_time;
		var notifications = [];
		var notif_time, notif_sound;
		var notif_audio = new Audio('sounds/notification.mp3');
		var version, jpn_monday;

		var services = {
			set_id: set_id,
			get_ttimes: get_ttimes,
			get_cal: get_cal,
			example_notification: example_notification,
			set_notif_time: set_notif_time,
			set_notif_sound: set_notif_sound,
			set_version: set_version
		};

		return services;

		function set_id(i) {
			id = i % 5;
			get_ttimes();
		}

		function get_ttimes() {
			get_current_time();
			ttimes = [];
			calc_ttimes_all();
			return ttimes;
		}

		function get_current_time() {
			var end;
			if (version === 'global') {
				my_time = moment.utc().startOf('isoWeek').add(13, 'hours').local();
				end = my_time.clone().add(18, 'hours');
				if (moment().isAfter(end))
					my_time.add(1, 'week');
			}
			else {
				my_time = moment.utc().startOf('isoWeek');
				jpn_monday = true;

				var now = moment();
				end = my_time.clone().add(18, 'hours');
				
				if (now.isAfter(end)) {
					my_time.add(4, 'days');
					end.add(4, 'days');
					jpn_monday = false;
				}

				if (now.isAfter(end)) {
					my_time.add(3, 'days');
					jpn_monday = true;
				}
			}
		}

		function calc_ttimes_all() {
			var num_weeks = 2;
			var i = 0;
			var second_time = false;

			if (version !== 'global')
				num_weeks *= 2;

			while (i<num_weeks) {
				ttimes.push(calc_ttime(i, second_time));
				if (version === 'global'){
					if (second_time)
						i++;
					second_time = !second_time;
				}
				else
					i++;
			}

			set_notifications();
		}

		function calc_ttime(week_num, second_time) {
			var weekly_order = [0,1,2,3,4];
			var ttime = my_time.clone();
			var offset, i;

			if (version === 'global') {
				offset = week_num + my_time.isoWeek() + 3;

				offset = offset % 5;

				for (i=0; i<offset; i++)
					weekly_order.unshift(weekly_order.pop());

				for (i=0; i<week_num; i++)
					ttime.add(1, 'week');

				ttime.add(weekly_order[id]*2, 'hours');
				if (second_time)
					ttime.add(10,'hours');
			}
			else {
				var day_num = week_num;
				var monday = jpn_monday;
				offset = day_num + my_time.isoWeek()*2 + 3;
				if (!monday)
					offset += 1;
				offset = offset % 5;
				for (i=0; i<offset; i++)
					weekly_order.unshift(weekly_order.pop());

				for (i=0; i<day_num; i++) {
					if (monday)
						ttime.add(4, 'days');
					else
						ttime.add(3, 'days');
					monday = !monday;
				}

				ttime.add(weekly_order[id]*3, 'hours');
			}

			return ttime;
		}

		function set_version(v) {
			version = v;
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
			var minutes = notif_time / 1000 / 60;
			var options = {
				body: minutes + ' minutes till Turtle Time!',
				icon: 'favicon.ico'
			};
			var time_until;

			for (var i=0; i<ttimes.length; i++) {
				if (now.isAfter(ttimes[i]))
					continue;

				time_until = ttimes[i].format('x') - now.format('x');
				time_until -= notif_time;
				if (time_until < 0 || isNaN(time_until))
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
			set_notifications();
		}

		function set_notif_sound(sound) {
			notif_sound = sound;
			set_notifications();
		}

	}
})();