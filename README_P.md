# generator-modern-protractor

## Whats inside?
- ProtractorJS 5.1.1
- TypeScript 2.2
- JasmineJS (as Protractor 5.1.1 dependency)
- Async/Await support, WebdriverJS ControlFlow is disabled
- PageObjects using [ES6 classes](http://es6-features.org/#ClassDefinition)
- PageFragments (Components) using [protractor-element-extend](https://github.com/Xotabu4/protractor-element-extend) library
- Additional [jasmine-protractor-matchers](https://github.com/Xotabu4/jasmine-protractor-matchers) to verify elements visibility easily
- Reporting made possible by nice [console reporter](https://github.com/razvanz/jasmine2-reporter) and [junit.xml reporter](https://github.com/larrymyers/jasmine-reporters) (to provide test results to your CI system)
- If you are using Visual Studio Code IDE - debug with TypeScript compilation is configured
- Post conditions are added - wiping cookies, local and session storage after each test


## Installation and generation of project

- First, install [Yeoman](http://yeoman.io)

Installing yo and some generators
First thing is to install yo using npm:

"npm install -g yo"

- Then install the needed generator:
"npm install -g generator-webapp"

- To scaffold a new project, run:
"yo webapp"

 - Easily access a generator’s home page by running:
 "npm home generator-webapp"

 - Most issues can be found by running:
 "yo doctor"

 - To add a new controller to the project, run the controller sub-generator:
"yo angular:controller MyNewController"

- generator-modern-protractor using [npm](https://www.npmjs.com/)
"npm install npm@latest -g"

- ```bash
npm install -g yo
npm install -g generator-modern-protractor
```
- Make new folder for your project, and open it:
```bash
mkdir my-shiny-automation-project
cd my-shiny-automation-project
```

- Then generate your new project (will be unpacked in current location, no subfolder):

```bash
yo modern-protractor
```

Feel free to [learn more about Yeoman](http://yeoman.io/).

#### Running
First, do: 

`npm install`

Instalation has `postinstall` hook, that triggers `webdriver-manager update` so you should have fresh chromedriver and selenium server downloaded and prepared.

Then compile your TypeScript code to JavaScript:

`npm run tsc`

Then, start tests:

`npm test`

By default - dirrect connect to local chrome driver is used. 

If you tired with running `npm run tsc` after each change, consider using compiler in `watch` mode:
`npm run tscw` with this compiler would automatically watch changed files, and compile them in real-time.

#### Debug
Debugging is already configured for Visual Studio Code - you should be able to put your breakpoints, and start debugging by running `Debug protractor.conf.js` in debug panel. Pre-debug compilation of TypeScript files is also configured.

This is done by `.vscode/launch.json` and `.vscode/tasks.json`. I suggest to keep this files in your repo.


#### PageObjects and PageFragments (Components)
- PageObjects are done using [ES6 classes](http://es6-features.org/#ClassDefinition)
- PageFragments (Components) done using ES6 classes and [protractor-element-extend](https://github.com/Xotabu4/protractor-element-extend) package

#### Additional matchers
This project has additional jasmine matchers for jasmine `expect()` function - `.toAppear()` and `.toDisappear()`. To read more about additional matchers see [jasmine-protractor-matchers](https://github.com/Xotabu4/jasmine-protractor-matchers) repo. Unfortunately, this lib does not support TypeScript yet. You should cast your `expect()` function to `:any` type to avoid compilation errors.

#### Reporting

Reporting is done using packages - 

- Console reporting - [jasmine-reporters](https://github.com/larrymyers/jasmine-reporters)
- jUnit xml reporting - [jasmine-reporters](https://github.com/larrymyers/jasmine-reporters)

Use generated XML with your continious integration system, so you won't need to generate any HTML reports from tests. By default output directory with xml results is `test_results/`


npm install chromedriver