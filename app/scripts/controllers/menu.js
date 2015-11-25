'use strict';

/**
 * @ngdoc function
 * @name gabineteApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the gabineteApp
 */
angular.module('gabineteApp')
  .controller('MenuCtrl', function ($scope,TabletopService) {

		TabletopService.getDataOptions().then(function(info){
			$scope.options = info;
        });

  });
