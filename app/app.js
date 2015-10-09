angular.module('app', ['LocalStorageModule', 'timer', 'ngTable', 'pascalprecht.translate', 'ui.bootstrap', 'ngAnimate', 'polyglotLanguageSwitcher'])
.config( [
    '$compileProvider',
    function( $compileProvider )
    {   
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|data):/);
    }
]);