import {browser, Config} from 'protractor';


//const chromePaths = require('@gen6033/chrome-path')();

const headless:boolean = process.argv.indexOf('--headless') > 0;

let chromeSettings:any = {
  args :['--window-size=1920,1080']
}
/*
if(headless)
{
  chromeSettings.args.push('--headless','--window-size=1920,1080');  
  chromeSettings['binary'] = chromePaths["google-chrome"];
  if("google-chrome-canary" in chromePaths && typeof chromePaths["google-chrome-canary"] !== 'undefined')
    chromeSettings.binary = chromePaths["google-chrome-canary"];
}
*/
let config:Config = {
  //baseUrl: 'http://www.google.ro',
  specs:[
   

   '../specs/primulTest.spec.js',   
     
  ],

  capabilities: {
    browserName: 'chrome',
    acceptInsecureCerts: true,
		chromeOptions: chromeSettings
	},  
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 130000,
    print: function() { }
  },

  allScriptsTimeout: 30000,
  directConnect: !process.env.SELENIUM_URL,
  onPrepare: () =>{
    // let consoleReport = require('jasmine2-reporter').Jasmine2Reporter;
    // let opts = {
    //   startingSpec:true
    // }
    // jasmine.getEnv().addReporter(new consoleReport(opts));
    const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: true
      }
    }));
    const HtmlReporter = require('protractor-beautiful-reporter');
    jasmine.getEnv().addReporter(new HtmlReporter({
      baseDirectory:'reports/',
      takeScreenShotsOnlyForFailedSpecs:true
    }).getJasmine2Reporter());

    var protractorMatchers = require('jasmine-protractor-matchers');
    beforeEach(function() {
        jasmine.addMatchers(protractorMatchers);
        browser.waitForAngularEnabled(false);
    });

    beforeAll(async function(){
      jasmine.addMatchers(protractorMatchers);
        browser.waitForAngularEnabled(false);
     
    })
  }
}

exports.config = config;