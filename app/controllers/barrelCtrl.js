angular.module('app')
	.controller('BarrelCtrl', function($scope, localStorageService){
		var self = this;
		self.see_more = false;

		var day = moment().utc().startOf('day').add(12,'hours');
		var local = day.clone().local();
		var hour_start = local.format('HH:mm');
		var hour_end = local.clone().add(23,'hours').add(59, 'minutes').format('HH:mm');
		var hour_string = ' ' + hour_start + '-' + hour_end;
		var now = moment();
		if (day.isAfter(now))
			day.subtract(1, 'days');

		self.day_num = day.dayOfYear();
		self.day = day.clone().add(1, 'days').format('x');
		self.times = [];

		set_time();

		$scope.show = localStorageService.get('bb_alt');
		if ($scope.show === null)
			$scope.show = false; // show hours

		$scope.$watch('show', function(newVal) {
			localStorageService.set('bb_alt');
			console.log('bb_alt changed');
			set_time();
		});

		function set_time() {
			self.times = [];
			for (var i=0; i<5; i++)
				self.times.push(calc_day(i));
		}

		function calc_day(day_offset) {
			var wooden = [0,5,4,9,3,8,4,9,2,7,3,8,1,6,2,7,0,5,1,6];
			var silver = [1,6,2,7,0,5,1,6,0,5,4,9,3,8,4,9,2,7,3,8];
			var gold   = [3,8,2,7,1,6,0,5,4,9];

			var offset = self.day_num + day_offset + 4;
			offset = offset % 5;

			var start1 = (offset*4) % 20;
			var start2 = (offset*2) % 10;

			var chest_wooden = wooden.slice(start1, start1+4);
			var chest_silver = silver.slice(start1, start1+4);
			var chest_gold   = gold  .slice(start2, start2+2);

			var now = moment();
			for (var i=0; i<day_offset; i++)
				now.add(1,'day');

			var date = now.format('YYYY/MM/DD');
			if ($scope.show)
				date += hour_string;
			console.log(day.format('HH:mm'));

			var chest_day = {};
			chest_day.date = date;
			chest_day.wooden = chest_wooden;
			chest_day.silver = chest_silver;
			chest_day.gold = chest_gold;

			return chest_day;
		}

		self.range = function(num) {
			return new Array(num);
		};

	});