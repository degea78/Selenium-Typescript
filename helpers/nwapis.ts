import {
  browser,
  element,
  $
} from "protractor";
import { isString, isNumber } from "util";
import { waitService } from "./wait-service";

declare let finstack: any;
declare let expect: any;
declare let assert: any;

export async function click(sel) {
  await $(sel).click();
}

export async function finEval(
  query: string,
  callback: Function,
  timeout: number = 5000
) {
  const self = this;
  browser.allScriptsTimeout = timeout;

  browser
    .executeAsyncScript(function() {
      const pQuery = arguments[0];
      const pCb = arguments[arguments.length - 1];

      const stringifyOnce = function(obj, replacer = null, indent = 2) {
        let printedObjects = [];
        let printedObjectKeys = [];

        function printOnceReplacer(key, value) {
          if (printedObjects.length > 2000) {
            // browsers will not print more than 20K, I don't see the point to allow 2K.. algorithm will not be fast anyway if we have too many objects
            return "object too long";
          }
          let printedObjIndex: any = false;
          printedObjects.forEach(function(obj, index) {
            if (obj === value) {
              printedObjIndex = index;
            }
          });

          if (key == "") {
            //root element
            printedObjects.push(obj);
            printedObjectKeys.push("root");
            return value;
          } else if (
            printedObjIndex + "" != "false" &&
            typeof value == "object"
          ) {
            if (printedObjectKeys[printedObjIndex as number] == "root") {
              return "(pointer to root)";
            } else {
              return (
                "(see " +
                (!!value && !!value.constructor
                  ? value.constructor.name.toLowerCase()
                  : typeof value) +
                " with key " +
                printedObjectKeys[printedObjIndex as number] +
                ")"
              );
            }
          } else {
            let qualifiedKey = key || "(empty key)";
            printedObjects.push(value);
            printedObjectKeys.push(qualifiedKey);
            if (replacer) {
              return replacer(key, value);
            } else {
              return value;
            }
          }
        }
        return JSON.stringify(obj, printOnceReplacer, indent);
      };

      finstack.eval(pQuery, function(result) {
        if (result !== null && result !== false) {
          let obj = null;

          try {
            obj = stringifyOnce(result.result.toObj());
          } catch (err) {
            //console.error(err);
          }
          pCb.call(null, obj);
        } else {
          pCb.call(null, { error: "Invalid returned data" });
        }
      });
    }, query)
    .then(function(data) {
      if (typeof callback === "function") {
        let obj = JSON.parse(data.toString());
        callback.call(self, obj);
      }
    });
}

export async function finEvalAsync(query) {
  return new Promise((resolve, reject) => {
    finEval(query, data => {
      resolve(data);
    });
  });
}

export async function frame(idOrName) {
  
  if(idOrName === null)
    await browser.switchTo().defaultContent();
  else {
    let fr;
    if (isString(idOrName)) 
      fr = $(idOrName).getWebElement();
    else if (isNumber(idOrName)) 
      fr =idOrName;
    browser.switchTo().frame(fr);
  } 
}



export async function getText(sel, cb = null) {
  let text = await $(sel).getText();
  if (cb != null) cb(text);
  else return text;
}

export async function end() {
  return browser.close();
}

export async function urlContains(needle, msg) {
  const url = await browser.getCurrentUrl();
  const condition = url.indexOf(needle) < 0;
  if (condition) {
    fail(msg);
  } else {
    expect(condition).toBeFalsy();
  }
}

export async function clearValue(sel) {
  return $(sel).clear();
}

export async function setValue(sel, value) {
  return $(sel).sendKeys(value);
}

export async function containsText(sel, text, msg = null) {
  const elText = await $(sel).getText();
  const cond = elText.indexOf(text) < 0;
  if (cond) {
    fail(msg);
  } else {
    expect(cond).toBeFalsy();
  }
}

export async function notContainsText(sel, text, msg = null) {
  const elText = await $(sel).getText();
  const cond = elText.indexOf(text) >= 0;
  if (cond) {
    fail(msg);
  } else {
    expect(cond).toBeFalsy();
  }
}

export async function getElementSize(sel, cb) {
  const el = $(sel);
  const size = await el.getSize();
  cb(size);
}

export async function hidden(sel, msg = null) {
  const shown = await $(sel).isDisplayed();
  if (shown) fail(msg);
  else expect(shown).toBeFalsy();
}

export async function equal(data, compareTo, msg = null) {
  const cond = data !== compareTo;
  if (cond) {
    fail(msg);
  } else {
    expect(cond).toBeFalsy();
  }
}

export async function notEqual(data, compareTo, msg = null) {
  const cond = data === compareTo;
  if (cond) {
    fail(msg);
  } else {
    expect(cond).toBeFalsy();
  }
}

export async function getAttribute(sel, prop, cb) {
  const el = $(sel);
  const val = await el.getAttribute(prop);
  cb(val);
}

export async function elements(locator, sel, cb) {
  if (locator === "css selector") {
    const elems = await element.all(sel);
    cb(elems);
  } else throw new Error("Do not support locator strategy " + locator);
}

export async function elementNotPresent(sel, msg) {
  const cond = await $(sel).isPresent();
  if (cond) {
    fail(msg);
  } else {
    expect(cond).toBeFalsy();
  }
}

export async function elementPresent(sel, msg = "Element is not present") {
  const cond = await $(sel).isPresent();
  if (!cond) {
    fail(msg);
  } else {
    expect(cond).toBe(true);
  }
}

export async function value(sel, expectedText, msg = "") {
  const el = $(sel);
  const text = await el.getText();
  const cond = text === expectedText;
  if (!cond) {
    fail(msg);
  } else {
    expect(cond).toBe(true);
  }
}

export async function window_handles(cb) {
  const handles = await browser.getAllWindowHandles();
  cb(handles);
}

export async function switchWindow(windowHandle) {
  await browser.switchTo().window(windowHandle);
}

export async function resizeWindow(w, h) {
  const window = await browser
    .manage()
    .window()
    .setSize(w, h);
}

export async function getLocationInView(sel, cb) {
  const el = $(sel);
  const loc = await el.getLocation();
  const view = await browser
    .manage()
    .window()
    .getSize();
  let result = {
    x: loc.x,
    y: loc.y,
    status: 1
  };
  if (loc.x < view.width && loc.y < view.height) result.status = 0;
  cb(result);
}

export async function url(cb) {
  cb(await browser.getCurrentUrl());
}

export async function ok(cond: boolean, msg: string) {
  if (!cond) {
    fail(msg);
  } else {
    expect(cond).toBe(true);
  }
}

export async function moveToElement(sel, x, y) {}

export async function waitForElementPresent(sel, timeout, msg = "") {
   waitService.waitForBrowserCssElement(sel);
}

export async function waitForElementNotPresent(sel, timeout, msg = "") {
   waitService.waitForBrowserCssElement(sel);
}



export async function cssClassPresent(sel, className, msg = "") {}

export async function cssClassNotPresent(sel, className, msg = "") {}

export async function cssProperty(sel, prop, value, msg = "") {}
