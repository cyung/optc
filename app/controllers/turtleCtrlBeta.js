(function () {
	'use strict';
	angular.module('app')
		.controller('TurtleCtrlBeta', turtleCtrlBeta);
		function turtleCtrlBeta($scope, localStorageService, turtleFact, $document) {
		var self = this;
		set_params();

		function set_params() {
			self.timezone = jstz.determine().name();
			self.global = 'global';

			self.id = localStorageService.get('id');
			self.military = JSON.parse(localStorageService.get('military'));
			self.global = localStorageService.get('version');
			if (self.global === null)
				self.global = 'global';
		}
		
		function formatCalendarDate(date) {
			return date.format('YYYYMMDDTHHmmss')
		}
		
		function createCalendarData() {
			var calendarData = "BEGIN:VCALENDAR\r\n" +
			"VERSION:2.0\r\n" +
			"PRODID:-//Microsoft Corporation//Outlook 12.0 MIMEDIR//EN\r\n" +
			"CALSCALE:GREGORIAN\r\n" +
			"METHOD:PUBLISH\r\n" +
			"X-WR-CALNAME:OPTC Turtle Time\r\n" +
			"X-WR-CALDESC:Turtle Times for One Piece Treasure Cruise\r\n";
			for(var i = 0; i < self.ttimes.length; i++) {
				var dtStart = formatCalendarDate(self.ttimes[i]);
				var dtEnd = formatCalendarDate(self.ttimes[i].add(1, 'h'));
				var utcNow = formatCalendarDate(moment.utc());
				calendarData += "BEGIN:VEVENT\r\n" +
				"DESCRIPTION:Log on to One Piece Treasure Cruise for Turtle Time!\r\n" +
				"DTSTART;TZID="+self.timezone+":"+dtStart+"\r\n" +
				"DTEND;TZID="+self.timezone+":"+dtEnd+"\r\n" +
				"DTSTAMP:"+utcNow+"Z\r\n" +
				"SUMMARY;LANGUAGE=en-us:Turtle Time\r\n" +
				"UID:TT"+dtStart+"\r\n" +
				"END:VEVENT\r\n";

			}
			calendarData += "END:VCALENDAR";
			
			return calendarData;
		}

		self.version = function() {
			return (self.global === 'global');
		};

		self.range = function(num) {
			return new Array(num);
		};
		
		self.addToCalendar = function() {	
			var calendarData = createCalendarData();		
			var calendarLink = document.createElement('a');
			calendarLink.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(calendarData));
			calendarLink.setAttribute('download', 'TurtleTimes.ical');
			
			calendarLink.style.display = 'none';
			document.body.appendChild(calendarLink);
			
			// Angular complains about multiple events if this isn't in a timeout.
			setTimeout(function() {
				calendarLink.click();
				document.body.removeChild(calendarLink);
			}, 1);
		};

		$scope.$watch(function() {
			return self.id;
		}, function(newVal, oldVal) {
			localStorageService.set('id', newVal);
			turtleFact.set_id(self.id);
			self.ttimes = turtleFact.get_ttimes(20);
			
		});

		$scope.$watch(function() {
			return self.military;
		}, function(newVal, oldVal) {
			localStorageService.set('military', newVal);
		});

		$scope.$watch(function() {
			return self.global;
		}, function(newVal, oldVal) {
			localStorageService.set('version', newVal);
		});
	}
})();