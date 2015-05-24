angular.module('app')
	.config(function ($translateProvider) {
		$translateProvider.translations('en', {
			NAV_TURTLE: 'Turtle Time',
			NAV_BARREL: 'Barrel Breaking',
			NAV_EVENT: 'Event',
			NAV_SETTINGS: 'Settings',
			TT_TITLE: 'Turtle Time Calculator',
			TT_DIGIT: '6th ID digit:',
			TT_FORMAT: '24hr format',
			TT_TIMEZONE: 'Time Zone:',
			TT_SEEMORE: 'See More',
			BB_TITLE: 'Barrel Breaking',
			BB_TIME: 'Time till next rotation:',
			BB_DATE: 'Date',
			BB_WOODEN: 'Wooden',
			BB_SILVER: 'Silver',
			BB_GOLD: 'Gold'
		})
		.translations('de', {
			NAV_TURTLE: 'Turtle Zeiten',
			NAV_BARREL: 'Barrel Breaking',
			NAV_EVENT: 'Event',
			NAV_SETTINGS: 'Einstellungen',
			TT_TITLE: 'Turtle Zeiten Rechner',
			TT_DIGIT: '6th Ziffer der ID:',
			TT_FORMAT: '24 Stunden Format',
			TT_TIMEZONE: 'Zeitzone:',
			TT_SEEMORE: 'siehe mehr',
			BB_TITLE: 'Barrel Breaking',
			BB_TIME: 'Zeit bis zur nächsten Wechsel:',
			BB_DATE: 'Datum',
			BB_WOODEN: 'Holz',
			BB_SILVER: 'Silber',
			BB_GOLD: 'Gold'
		});
		$translateProvider.preferredLanguage('en');
		$translateProvider.useSanitizeValueStrategy('escaped');
	});