angular.module('mf.directives', []).directive('mfTextLength', function () {
	return {
		require: 'ngModel',
		// ctrl here is the controller for ng-model
		link: function (scope, element, attrs, ctrl) {

			var textLength = parseInt(attrs.mfTextLength || 40);
			var warnAtLength = parseInt(attrs.mfTextWarnAt || textLength - 10);

			var states = {
				ok: {
					test: function (len) {
						return len < warnAtLength;
					},
					style: attrs.mfTextOkClass || 'mf-text-length-off',
					text: function () {
						return '';
					},
					lengthValid: true
				},
				near: {
					test: function (len) {
						return len >= warnAtLength && len < textLength;
					},
					style: attrs.mfTextNearClass || 'mf-text-length-near',
					text: function (len) {
						return len + ' / ' + textLength;
					},
					lengthValid: true
				},
				at: {
					test: function (len) {
						return len == textLength;
					},
					style: attrs.mfTextAtClass || 'mf-text-length-at',
					text: function (len) {
						return len + ' / ' + textLength;
					},
					lengthValid: true
				},
				over: {
					test: function (len) {
						return len > textLength;
					},
					style: attrs.mfTextOverClass || 'mf-text-length-over',
					text: function (len) {
						return len + ' / ' + textLength;
					},
					lengthValid: false
				}
			};

			function getState(text) {
				var textLength = (text || '').length;
				var state;

				for (var key in states) {
					state = states[key];
					if (state.test(textLength)) {
						return {
							style: state.style,
							text: state.text(textLength),
							lengthValid: state.lengthValid
						};
					}
				}
				return {};
			}

			function statesAreDifferent(state1, state2) {
				return state1.text != state2.text || state1.style != state2.style;
			}

			// sick sick shit from https://gist.github.com/1308368
			function createIndicatorId() {
				for (var a = '', b = ''; a++ < 36; b += a * 51 & 52 ? (a ^ 15 ? 8 ^ Math.random() * (a ^ 20 ? 16 : 4) : 4).toString(16) : '');
				return 'text-length-indicator-' + b;
			}

			var state;
			var indicator;

			function addIndicator() {
				var indicatorId = createIndicatorId();
				indicator = $('<span id="' + indicatorId + '" class="' + state.style + '">' + state.text + '</span>');
				element.parent().append(indicator);
			}

			function validateText(value) {
				var newState = getState(value);

				if (!statesAreDifferent(state, newState))
					return;

				state = newState;
				$(indicator).attr({'class': state.style});
				$(indicator).text(state.text);

				ctrl.$setValidity('mfTextLength', state.lengthValid);

				if (state.text.lengthValid)
					$(element).removeClass('indicator-visible');
				else
					$(element).addClass('indicator-visible');
			}

			function setup() {
				state = getState();
				addIndicator();
			}

			setup();

			// $parsers run each time a value is put into the model via a user update. Pushing onto $parsers
			// means our validator will run last
			ctrl.$parsers.push(function (value) {
				ctrl.$setValidity('mfTextLength', true);

				// if another validator already failed, just exit
				if (!ctrl.$valid) return value;

				validateText(value);

				// returning undefined tells angular to not set the bad data in the model
				return state.text.lengthValid ? value : undefined;
			});

			// $formatters run before the data in the scope is added to the DOM. Validating here will catch bad
			// initial values
			ctrl.$formatters.push(function (value) {
				validateText(value);
				return value;
			});

		}
	};
});
