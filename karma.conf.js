// Karma configuration
// Generated on Sun Jun 23 2013 15:29:40 GMT-0700 (PDT)


// base path, that will be used to resolve files and exclude
basePath = '';


// list of files / patterns to load in the browser
files = [
	JASMINE,
	JASMINE_ADAPTER,
	'https://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js',
	'http://code.angularjs.org/1.1.5/angular.min.js',
	'http://code.angularjs.org/1.1.5/angular-mocks.js',
	'src/**/*.js',
	'test/**/*Spec.js'
];


// list of files to exclude
exclude = [

];


// test results reporter to use
// possible values: 'dots', 'progress', 'junit'
reporters = ['progress'];


// web server port
port = 9876;


// cli runner port
runnerPort = 9100;


// enable / disable colors in the output (reporters and logs)
colors = true;


// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;


// enable / disable watching file and executing tests whenever any file changes
autoWatch = true;


// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = ['PhantomJS'];


// If browser does not capture in given timeout [ms], kill it
captureTimeout = 60000;


// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false;
