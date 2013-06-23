'use strict';

angular.module('mf.controllers', []).controller('SimpleController', function ($scope) {
	$scope.name0 = 'Test Name';
	$scope.name1 = 'Test Name which is quite long and no doubt violates our text-length';
});
