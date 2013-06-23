describe('mf.directives Tests', function () {
	var elm, scope;

	beforeEach(module('mf.directives'));

	beforeEach(inject(function ($rootScope, $compile) {
		scope = $rootScope;
		scope.testInputValue = "";

		elm = angular.element('<form name="testForm" novalidate><input type="text" id="testInput" ' +
			'ng-model="testInputValue" mf-text-length="20" mf-text-warn-at="10" required></form>');

		$compile(elm)(scope);
		scope.$digest();
	}));

	it('Should add indictaor on invalid text length', function () {
		scope.$apply(function() {
			scope.testInputValue = "a test value which is beyond our maximum length";
		});

		var testInput = elm.find('input');
		expect(testInput).toHaveClass('active');
		expect(testInput.text()).toBe(scope.testInputValue);
	});

});
