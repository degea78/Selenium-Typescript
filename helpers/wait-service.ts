import { ElementFinder, browser, by, element, protractor, ExpectedConditions as until} from 'protractor';

class WaitService {
  waitForMilliseconds = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  waitForPotentialStaleElement_Promise(elem: any, txt: string, attempts: number) {
    return new Promise((resolve, reject) => {
      this.waitForPotentialStaleElement(elem, txt, attempts).then(() => {
      }, (err) => {
        // console.log('attempted clicks and will try again ' + err); // debug
      }).then(() => {
        resolve(); // resolve the promise d
      }, (err) => {
        console.log('attempted clicks and gave up _2_ ' + err);
      }).catch((e) => {
        console.log('waitForElementClickableAndOverlayingElementIsStale promise not successful: error out');
        reject();
      });
    });
  }
  waitForPotentialStaleElement(elem: any, txt: string, attempts: number) {
    return elem.getWebElement().then((found) => { // first wait for element to be present
      return browser.driver.wait( () => {
        return found.isDisplayed().then((visible) => { // then wait for it to become visible
          if (visible) { // if visible, all good
            console.log('element is visible');
            return found.getText().then(function(gotTxt) {
              console.log(gotTxt);
              return true;
            });
          } else {
            browser.sleep(500); // give it a break
            console.log('stale element IS NOT visible');
            return false;
          }
        }, (err) => { // error handler for 'wait for it to be visible'
          if (attempts > 0) {
            console.log('RETRYING TO FIND UNDISPLAYED stale DOM element, attempts left: ', attempts); // debug
            return this.waitForPotentialStaleElement(elem, txt, --attempts); // recursive call the function
          } else {
            throw err;
          }
        });
      });
    }, (err) => { // error handler for 'wait to be present'
      if (attempts > 0) {
        console.log('RETRYING TO FIND stale DOM element, attempts left: ', attempts); // debug
        browser.sleep(300);
        return this.waitForPotentialStaleElement(elem, txt, --attempts);
      } else {
        throw err;
      }
    });
  }
  clickOnPotentialStaleElement(elem: any, attempts: number) {
    return elem.getWebElement().then((found) => { // first wait for element to be present
      return browser.driver.wait( () => {
        return found.isDisplayed().then((visible) => { // then wait for it to become visible
          if (visible) { // if visible, all good
            console.log('element is clickable');
            return found.click().then(function(gotTxt) {
              console.log(gotTxt);
              return true;
            });
          } else {
            browser.sleep(500); // give it a break
            console.log('stale element IS NOT clickable');
            return false;
          }
        }, (err) => { // error handler for 'wait for it to be visible'
          if (attempts > 0) {
            console.log('RETRYING TO click on UNDISPLAYED stale DOM element, attempts left: ', attempts); // debug
            return this.clickOnPotentialStaleElement(elem, --attempts); // recursive call the function
          } else {
            throw err;
          }
        });
      });
    }, (err) => { // error handler for 'wait to be present'
      if (attempts > 0) {
        console.log('RETRYING TO click on stale DOM element, attempts left: ', attempts); // debug
        browser.sleep(300);
        return this.clickOnPotentialStaleElement(elem, --attempts);
      } else {
        throw err;
      }
    });
  }
  waitForElementClickableAndOverlayingElementIsStale (clickAbleElement: ElementFinder, overlayingElement: ElementFinder): Promise <{}> {
    return new Promise((resolve, reject) => {
      browser.wait(until.and(until.elementToBeClickable(clickAbleElement), until.stalenessOf(overlayingElement))).then(() => {
      }, (err) => {
        console.log('Overlaying element is not gone' + err);
      }).then(() => {
        resolve(); // resolve the promise d
      }, (err) => {
        console.log('Overlaying element is not gone' + err);
      }).catch((e) => {
        console.log('waitForElementClickableAndOverlayingElementIsStale promise not successful: error out');
        reject();
      });
    });
  }
  clickOnElementWithAttemptsAndWait_Promise (elem: ElementFinder, attempts: number): Promise <{}> {
    return new Promise((resolve, reject) => {
      this.clickOnElementWithAttemptsAndWait(elem, attempts).then(() => {
      }, (err) => {
        // console.log('attempted clicks and will try again ' + err); // debug
      }).then(() => {
        resolve(); // resolve the promise d
      }, (err) => {
        console.log('attempted clicks and gave up _2_ ' + err);
      }).catch((e) => {
        console.log('waitForElementClickableAndOverlayingElementIsStale promise not successful: error out');
        reject();
      });
    });
  }
  clickOnElementWithAttemptsAndWait (elem: any, attempts: number): Promise <{}> {
    return elem.click().then((found) => { // do regular click
    }, (err) => { // if it cannot click, do multiple attempts
      if (attempts > 0) {
        browser.sleep(100);
        // console.log('\n RETRYING TO CLICK stale DOM element, attempts left: ', attempts, '\n');
        return this.clickOnElementWithAttemptsAndWait(elem, --attempts);
      } else {
        // console.log('\n\n Gave up RETRYING to click \n\n ');
        throw err;
      }
    });
  }
  headlessWaiter(elementOfConcern) { // waits to fight like a cornered snake...
    try {
      browser.wait(until.presenceOf(elementOfConcern), 40000, `timed out: presenceOf element failed: ${elementOfConcern}`);
      browser.wait(until.visibilityOf(elementOfConcern), 40000, `timed out: visibilityOf element: ${elementOfConcern}`);
      browser.wait(until.elementToBeClickable(elementOfConcern), 40000, `timed out: click-abilityOf element: ${elementOfConcern}`);
    } catch (e) {
      console.error('Error in headlessWaiter function', e);
    }
  }
  waitUntilThisElementDoesNotExistAnymore(elementOfConcern) { // opposite of headlessWaiter()
    try {
      // browser.wait(until.elementToBeClickable(elementOfConcern), 40000, 'timed out: click-abilityOf element'); // wait for click-ability
      browser.wait(until.invisibilityOf(elementOfConcern), 40000, 'timed out: visibilityOf element'); // wait for invisibility
      browser.wait(until.stalenessOf(elementOfConcern), 40000, 'timed out: presenceOf element'); // wait for NON-presence
    } catch (e) {
      console.error('Error in headlessWaiter function', e);
    }
  }
  waitUntilThisElementDoesNotExistAnymore_Promise (locator: any): Promise <{}> {
    return new Promise((resolve, reject) => {
      browser.wait(until.invisibilityOf((locator)), 40000, `timed out: presenceOf element failed: ${locator}`).then(() => {
        browser.wait(until.stalenessOf((locator)), 40000, `timed out: visibilityOf element: ${locator}`).then(() => {
          }, (err) => {
            console.log('Element not found waitUntilThisElementDoesNotExistAnymore_Promise _ 1 ' + err);
          });
      }).then( () => {
        resolve(); // resolve the promise d
      }, (err) => {
        console.log('Element not found waitUntilThisElementDoesNotExistAnymore_Promise _ 2' + err);
      }).catch( (e) => {
        console.log('waitUntilThisElementDoesNotExistAnymore_Promise promise not successful: error out');
        reject();
      });
    });
  }
  waitForElementToBePresentVisibleClickable_Promise (locator: any): Promise <{}> {
    return new Promise((resolve, reject) => {
      browser.wait(until.presenceOf((locator)), 40000, `timed out: presenceOf element failed: ${locator}`).then(() => {
        browser.wait(until.visibilityOf((locator)), 40000, `timed out: visibilityOf element: ${locator}`).then(() => {
          browser.wait(until.elementToBeClickable((locator)), 40000, `timed out: click-abilityOf element: ${locator}`).then(() => {
          }, (err) => {
            console.log('Element not found waitForElementToBePresentVisibleClickable_Promise 1_ ' + err);
          });
        });
      }).then( () => {
        resolve(); // resolve the promise d
      }, (err) => {
        console.log('Element may be present but maybe not visible or clickAble yet :waitForElementToBePresentVisibleClickable_Promise 2_ '
          + err);
      }).catch( (e) => {
        console.log('waitForElementToBePresentVisibleClickable_Promise promise not successful: error out');
        reject();
      });
    });
  }
  waitForElementToBePresentVisibleClickable(locator: ElementFinder) {
    browser.wait(until.presenceOf((locator)), 40000, `timed out: presenceOf element failed: ${locator}`).then(() => {
        browser.wait(until.visibilityOf((locator)), 40000, `timed out: visibilityOf element: ${locator}`).then(() => {
            browser.wait(until.elementToBeClickable((locator)), 40000, `timed out: click-abilityOf element: ${locator}`).then(() => {
            }, (err) => {
              console.log('Element not found waitForElementToBePresentVisibleClickable ' + err);
            });
          });
      });
  }
  waitForElementToBeClickable(locator: any) {
    browser.wait(until.elementToBeClickable(element(locator)), 140000).then( () => {}, (err) => {
      console.log('Element not found waitForElementToBeClickable ' + err);
    });
  }
  waitForBrowserCssElementByClassName (browserCssElementClassName: string) {
    const elementOfConcern = element.all(by.className(browserCssElementClassName)).first(); // var for element
    this.waitForElementToBePresentVisibleClickable_Promise(elementOfConcern); // wait for presence, visibility, click-ability
  }
  waitForBrowserCssElementByClassNameNthElement (browserCssElementClassName: string, nthPosition: number) {
    const elementOfConcern = element.all(by.className(browserCssElementClassName)).get(nthPosition); // var for element
    this.waitForElementToBePresentVisibleClickable_Promise(elementOfConcern); // wait for presence, visibility, click-ability
  }
  waitForBrowserCssElementByText (browserCssElement: string, browserCssElementByText: string) {
    const elementOfConcern = element.all(by.cssContainingText(browserCssElement, browserCssElementByText )).first(); // var for element
    this.waitForElementToBePresentVisibleClickable_Promise(elementOfConcern); // wait for presence, visibility, click-ability
  }
  waitForBrowserCssElementByTextInAlistOfItems (browserCssElement: string, browserCssElementByText: string) {
    const elementOfConcern = element(by.cssContainingText(browserCssElement, browserCssElementByText)); // var for element
    this.waitForElementToBePresentVisibleClickable_Promise(elementOfConcern); // wait for presence, visibility, click-ability
  }
  waitForBrowserCssElement (browserCssElement: string) {
    const elementOfConcern = element.all(by.css(browserCssElement)).first();
    this.waitForElementToBePresentVisibleClickable_Promise(elementOfConcern); // wait for presence, visibility, click-ability
  }
  waitForBrowserCssElementById (browserCssElementID: string) {
    const elementOfConcern = element.all(by.id(browserCssElementID)).first();
    this.waitForElementToBePresentVisibleClickable_Promise(elementOfConcern); // wait for presence, visibility, click-ability
  }
  waitForBrowserDOMtag (browserDOMtag: string) {
    const elementOfConcern = element.all(by.tagName(browserDOMtag)).first();
    this.waitForElementToBePresentVisibleClickable_Promise(elementOfConcern); // wait for presence, visibility, click-ability
  }
  waitForBrowserPartialUrl (partialUrl: string) {
    browser.wait(until.urlContains(partialUrl), 100000); // Checks that the current URL contains the expected text
  }
  waitForBrowserLinkText ( browserLinkText: string) {
    const elementOfConcern = element.all(by.linkText(browserLinkText)).first();
    this.waitForElementToBePresentVisibleClickable_Promise(elementOfConcern); // wait for presence, visibility, click-ability
  }
  clickAButtonAndWaitForUrlToBe(buttonSelector: any, exactUrl: string) {
    buttonSelector.click().then(() => {
      this.getSitesUrlPromiseWhenUrlIs(exactUrl);
    });
  }
  clickAButtonAndWaitForUrlToInclude(buttonSelector: any, urlPart: string) {
    buttonSelector.click().then(() => {
      this.getSitesUrlPromiseWhenUrlIncludes(urlPart);
    });
  }
  clickAButtonAndWaitForUrlToIncludeXandNotY(buttonSelector: any, X: string, Y: string) {
    buttonSelector.click().then(() => {
      this.getSitesUrlPromiseWhenUrlIncludesXandNotY(X, Y);
    });
  }
  waitForElementSelector (elementSelector: ElementFinder) {
    this.waitForElementToBePresentVisibleClickable_Promise(elementSelector);
  }
  waitUntilScrolledToSelectorWithMouseMove (elementSelector: any): Promise <{}> {
    return new Promise((resolve, reject) => {
      browser.driver.wait(() => {
        return browser.driver.actions().mouseMove(elementSelector).perform();
      }, 40000).then( () => {
        resolve(); // resolve the promise d
      }, (err) => {
        console.log('Element not found waitUntilScrolledToSelectorWithMouseMove ' + err);
      }).catch( (e) => {
        console.log('waitUntilScrolledToSelectorWithMouseMove promise not successful: error out');
        reject();
      });
    });
  }
  waitUntilScrolledToSelectorInAVirtualList(listItemWeWantAll: any) {
    let recursionCounter = 0;
    const recursionLimit = 1000;
    const focusOnVirtualScrollList = element(by.tagName('virtual-scroll'));
    getToVirtualListItem();
    function getToVirtualListItem() {
      // listItemWeWantAll.bind(this).count().then((result) => {   // get the count of the item, flatten with then...
      listItemWeWantAll.count().then((result) => {   // get the count of the item, flatten with then...
        if (result >= 1) { // if an element is found
          waitService.waitUntilScrolledToSelectorWithMouseMove(listItemWeWantAll.first()); // scroll to the item we want in the list
        } else {
          focusOnVirtualScrollList.click().then(() => {
            scrollDown();
          });
        }
      }).catch((e) => {
        console.log(e);
      });
    }
    function scrollDown() {
      browser.driver.actions().sendKeys(protractor.Key.ARROW_DOWN).perform().then(() => {
        recursionCounter++;
        if (recursionCounter > recursionLimit) {
          try {
            throw new Error('the item does not exist in this list');
          } catch (e) {
            console.log(e);
          }
        }
        getToVirtualListItem(); // recursive function!
      });
    }
  }
  private getSitesUrlPromiseWhenUrlIs(exactUrl: string): Promise<{}> {
    return new Promise((resolve, reject) => { // wrap browser wait functionality in a custom promise
      browser.driver.wait(() => { // wait on the url to change to the expected value
        return browser.driver.getCurrentUrl().then((url) => { // only return true if url contains expected url
          return url === exactUrl;
        });
      }, 40000).then(() => {
        resolve(); // resolve the promise only once the browser has confirmed the url changed
      }).catch( (e) => {
        console.log('promise not successful: error out');
        reject();
      });
    });
  }
  private getSitesUrlPromiseWhenUrlIncludes(urlPart: string): Promise<{}> {
    return new Promise((resolve, reject) => { // wrap browser wait functionality in a custom promise
      browser.driver.wait(() => { // wait on the url to change to the expected value
        return browser.driver.getCurrentUrl().then((url) => { // only return true if url contains expected url
          return url.includes(urlPart); // wait for site edit
        });
      }, 40000).then(() => {
        resolve(); // resolve the promise only once the browser has confirmed the url changed
      }).catch( (e) => {
        console.log('promise not successful: error out');
        reject();
      });
    });
  }
  getSitesUrlPromiseWhenUrlIncludesXandNotY(X: string, Y: string): Promise<{}> {
    const urlContains = until.urlContains(X);
    const urlDoesNotContain = until.not(until.urlContains(Y));
    browser.wait(until.and(urlContains, urlDoesNotContain), 10000);
    return new Promise((resolve, reject) => { // wrap browser wait functionality in a custom promise
      browser.driver.wait(() => { // wait on the url to change to the expected value
        return browser.driver.getCurrentUrl().then((url) => { // only return true if url contains expected url
          return url.includes(X);
        });
      }, 40000).then(() => {
        resolve(); // resolve the promise only once the browser has confirmed the url changed
      }).catch((e) => {
        console.log('promise not successful: error out');
        reject();
      });
    });
  }
}
export const waitService = new WaitService();
