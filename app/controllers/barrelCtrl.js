angular.module('barrelApp')
	.controller('BarrelCtrl', function($scope, ngTableParams){
		var self = this;
		self.see_more = false;

		var day = moment().utc().startOf('day').add(12,'hours');
		var now = moment();
		if (day.isAfter(now))
			day.subtract(1, 'days');

		self.day_num = day.dayOfYear();
		self.day = day.clone().add(1, 'days').format('x');
		
		self.times = [];

		set_time();

		// $scope.tableParams = new ngTableParams({
		//         page: 1,            // show first page
		//         count: 10           // count per page
		//     }, {
		//         total: self.times.length, // length of data
		//         getData: function ($defer, params) {
		//             $defer.resolve(self.times.slice((params.page() - 1) * params.count(), params.page() * params.count()));
		//         }
		//     });

		function set_time() {
			self.times = [];
			for (var i=0; i<5; i++)
				self.times.push(calc_day(i));
		}

		function calc_day(day_num) {
			var wooden = [0,5,4,9,3,8,4,9,2,7,3,8,1,6,2,7,0,5,1,6];
			var silver = [1,6,2,7,0,5,1,6,0,5,4,9,3,8,4,9,2,7,3,8];
			var gold   = [3,8,2,7,1,6,0,5,4,9];

			var offset = day_num + 2;

			var start1 = (offset*4) % 20;
			var start2 = (offset*2) % 10;

			var chest_wooden = wooden.slice(start1, start1+4);
			var chest_silver = silver.slice(start1, start1+4);
			var chest_gold   = gold  .slice(start2, start2+2);

			var now = moment();
			for (var i=0; i<day_num; i++)
				now.add(1,'day');

			var date = now.format('YYYY/MM/DD');

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