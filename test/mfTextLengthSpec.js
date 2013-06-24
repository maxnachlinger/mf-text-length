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

	it('Should add indictaor on invalid text length', function () {
		scope.$apply(function () {
			scope.testInputValue = "a test value which is beyond our maximum length";
		});

		var testForm = elm.find('form');
		expect(testForm.children.length).toBe(2);

		var indicator = elm.find('span');
		expect(indicator.text()).toBe(scope.testInputValue.length + ' / ' + maxLength);
		expect(indicator.hasClass('mf-text-length-over'));
	});

});
