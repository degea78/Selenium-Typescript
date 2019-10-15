import {browser, Config} from 'protractor';

let config:Config = {
  baseUrl: 'http://localhost:85/finMobile/demo',
  specs:[
    '../specs/finstack/login.spec.js',
    '../specs/finstack/users/createAdminAndCheckFolio.spec.js'
  ],

  onPrepare: () =>{
    browser.manage().window().maximize();
    let consoleReport = require('jasmine2-reporter').Jasmine2Reporter;
    let opts = {
      startingSpec:true
    }
    jasmine.getEnv().addReporter(new consoleReport(opts));

    var protractorMatchers = require('jasmine-protractor-matchers');
    beforeEach(function() {
        jasmine.addMatchers(protractorMatchers);
        browser.waitForAngularEnabled(false);
    });
  }
}

exports.config = config;