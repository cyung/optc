angular.module('app')
	.controller('EventCtrl', function(localStorageService){

		/////////////////////////////////////////
		// Implementation for one-time event //
		/////////////////////////////////////////
		var self = this;
		self.timezone = jstz.determine().name();

		self.my_time = moment.utc("2015-05-19 13:00").local();
		self.id = localStorageService.get('id');
		self.military = JSON.parse(localStorageService.get('military'));
		

		
		self.see_more = false;

		var day = moment().utc().startOf('day').add(12,'hours');
		var now = moment();
		if (day.isAfter(now))
			day.subtract(1, 'days');

		self.day_num = day.dayOfYear();
		self.day = day.clone().add(1, 'days').format('x');
		self.times = [];

		set_time();

		function set_time() {
			self.times = [];
			for (var i=0; i<7; i++)
				self.times.push(calc_day(i));
		}

		function calc_day(day_offset) {
			var drop = ['Loguetown', 'Arlong Park', 'Baratie', 'Syrup Village', 'Orange Town, Little Garden', 'Shell Town, Whiskey Peak', "Alvida's Hideout, Twin Cape"];
			var stamina = ['Orange Town', 'Shell Town, Little Garden', "Alvida's Hideout, Whiskey Peak", 'Fuschia Village, Twin Cape', 'Loguetown', 'Arlong Park', 'Baratie'];
			var beli = ['Baratie, Whiskey Peak', "Syrup Village, Twin Cape", 'Loguetown', 'Arlong Park', 'Baratie', 'Syrup Village', 'Little Garden'];

			var offset = self.day_num + day_offset + 4;
			offset = offset % 7;

			var day_drop = drop[offset];
			var day_stamina = stamina[offset];
			var day_beli = beli[offset];

			var now = moment();
			for (var i=0; i<day_offset; i++)
				now.add(1,'day');

			var date = now.format('YYYY/MM/DD');

			var day_bonus = {};
			day_bonus.date = date;
			day_bonus.drop = day_drop;
			day_bonus.stamina = day_stamina;
			day_bonus.beli = day_beli;

			return day_bonus;
		}

		self.range = function(num) {
			return new Array(num);
		};

	});