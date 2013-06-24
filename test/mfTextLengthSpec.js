describe('mf.directives Tests', function () {
	var elm, scope;
	var maxLength = 20, warnLength = 10;

	beforeEach(module('mf.directives'));

	beforeEach(inject(function ($rootScope, $compile) {
		scope = $rootScope.$new();
		scope.testInputValue = "";

		elm = angular.element('<form name="testForm" novalidate><input type="text" id="testInput" ' +
			'ng-model="testInputValue" mf-text-length="' + maxLength + '" mf-text-warn-at="' + warnLength + '" required></form>');

		$compile(elm)(scope);
		scope.$digest();
	}));

	it('Should handle text with a length greater than mf-text-length', function () {
		var newtextLength = 30;
		givenTextOfLength(newtextLength);
		indicatorHaClassAndText('mf-text-length-over', newtextLength + ' / ' + maxLength);

		expect(scope.testForm.$valid).toBeFalsy();
	});

	it('Should handle text with a length equal to mf-text-length', function () {
		var newtextLength = maxLength;
		givenTextOfLength(newtextLength);
		indicatorHaClassAndText('mf-text-length-at', newtextLength + ' / ' + maxLength);

		expect(scope.testForm.$valid).toBeTruthy();
	});

	it('Should handle text with a length within greater than mf-text-warn-at and less than mf-text-length', function () {
		var newtextLength = 15;
		givenTextOfLength(newtextLength);
		indicatorHaClassAndText('mf-text-length-near', newtextLength + ' / ' + maxLength);

		expect(scope.testForm.$valid).toBeTruthy();
	});

	it('Should handle text with a length less than mf-text-warn-at', function () {
		var newtextLength = 8;
		givenTextOfLength(newtextLength);
		indicatorHaClassAndText('mf-text-length-off', '');

		expect(scope.testForm.$valid).toBeTruthy();
	});

	function givenTextOfLength(length) {
		scope.$apply(function () {
			scope.testInputValue = new Array(length +1 ).join('x');
		});
	}

	function indicatorHaClassAndText(cssClass, text) {
		var indicator = elm.find('span');
		expect(indicator.hasClass(cssClass));
		expect(indicator.text()).toBe(text);
	}

});
