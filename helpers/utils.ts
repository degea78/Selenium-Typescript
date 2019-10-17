import { browser } from "protractor";
import AppLauncherPO from '../page_objects/finstack5/appLauncherPO';

export function randomString() {
  let randomStr = '';
  let charSequence = 'abcdefghijklmnopqrstuvwxyz';

  for (var i = 0; i < 10; i++) randomStr += charSequence.charAt(Math.floor(Math.random() * charSequence.length));
  return randomStr;
}

export async function clearAndSendKeys(inputField, value) {
  await inputField.clear();
  await inputField.sendKeys(value);
}

export function simulateDragDrop(sourceNode, destinationNode) {
  var EVENT_TYPES = {
    DRAG_END: 'dragend',
    DRAG_START: 'dragstart',
    DROP: 'drop'
  }

  function createCustomEvent(type) {
    var event = new CustomEvent("CustomEvent")
    event.initCustomEvent(type, true, true, null)
    event.dataTransfer = {
      data: {
      },
      setData: function (type, val) {
        this.data[type] = val
      },
      getData: function (type) {
        return this.data[type]
      }
    }
    return event
  }

  function dispatchEvent(node, type, event) {
    if (node.dispatchEvent) {
      return node.dispatchEvent(event)
    }
    if (node.fireEvent) {
      return node.fireEvent("on" + type, event)
    }
  }

  var event = createCustomEvent(EVENT_TYPES.DRAG_START)
  dispatchEvent(sourceNode, EVENT_TYPES.DRAG_START, event)

  var dropEvent = createCustomEvent(EVENT_TYPES.DROP)
  dropEvent.dataTransfer = event.dataTransfer
  dispatchEvent(destinationNode, EVENT_TYPES.DROP, dropEvent)

  var dragEndEvent = createCustomEvent(EVENT_TYPES.DRAG_END)
  dragEndEvent.dataTransfer = event.dataTransfer
  dispatchEvent(sourceNode, EVENT_TYPES.DRAG_END, dragEndEvent)
}


declare let finstack: any;

export async function finEval(
  query: string,
  callback: Function,
  timeout: number = 5000
) {
  const self = this;
  browser.allScriptsTimeout = timeout;

  browser
    .executeAsyncScript(function () {
      const pQuery = arguments[0];
      const pCb = arguments[arguments.length - 1];

      const stringifyOnce = function (obj, replacer = null, indent = 2) {
        let printedObjects = [];
        let printedObjectKeys = [];

        function printOnceReplacer(key, value) {
          if (printedObjects.length > 2000) {
            // browsers will not print more than 20K, I don't see the point to allow 2K.. algorithm will not be fast anyway if we have too many objects
            return "object too long";
          }
          let printedObjIndex: any = false;
          printedObjects.forEach(function (obj, index) {
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

      finstack.eval(pQuery, function (result) {
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
    .then(function (data) {
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

export async function openApplicationsInAppLauncher(appText) {
  let appLauncherPO = new AppLauncherPO();
  var dataTextLength = appLauncherPO.grabAllText.count().then((max) => {
    return max;
  });

  dataTextLength.then((max) => {
    for (let i = 0; i < (Number(max)); i++) {
      var dataGrabAllText = appLauncherPO.grabAllText.get(i).getText().then((text) => {
        return text;
      })
      dataGrabAllText.then((text) => {
        if (text == appText) {
          browser.actions().mouseMove(appLauncherPO.grabAll.get(i)).perform().then(() => {
            appLauncherPO.grabAll.get(i).click();
            console.log(text)
          });
        }
      })
    }
  })
}

