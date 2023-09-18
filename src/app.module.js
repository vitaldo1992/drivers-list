import angular from 'angular';
import 'angular-animate';
import 'angular-sanitize';
import 'angular-cookies';
import 'angular-ui-router';
import 'angular-translate';
import 'angular-dynamic-locale';

angular.module('app', [
  // Angular modules
  'ngSanitize',
  'ngAnimate',
  'ngCookies',

  // Custom modules

  // 3rd Party Modules
  'pascalprecht.translate',
  'tmh.dynamicLocale',
  'ui.router'
]);
