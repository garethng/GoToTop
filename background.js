chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.cmd === "checkStatus") {
    getSettings((item) => {
      sendResponse({
        all: item.all
      })
    })
  } else if (request.cmd === "setStatus") {
    setSettings({
      all: request.all
    })
  }
  return true;
})

chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason === "install") {
    setSettings({
      all: true
    })
  } else if (details.reason === "update") {
    // When extension is updated
  } else if (details.reason === "browser_update") {
    // When browser is updated
  }
});

function handleResponse(message) {
  console.log(`Message from the background script:  ${message.response}`);
}

function handleError(error) {
  console.log(`Error: ${error}`);
}

function getSettings(successHandler) {
  chrome.storage.local.get((item) => {
    successHandler(item)
  })
}

function setSettings(config, successHandler) {
  chrome.storage.local.set(config)
}

function onError(error) {
  console.log(error)
}

function init() {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      title: "Goto Top",
      id: "root"
    })

    chrome.contextMenus.create({
      title: "Top",
      id: "gototop",
      parentId: "root"
    })

    chrome.contextMenus.create({
      title: "Bottom",
      id: "gotoBottom",
      parentId: "root"
    })

    chrome.contextMenus.onClicked.addListener(function (info, tab) {
      if (info.menuItemId === "gototop" || info.menuItemId === "gotoBottom") {
        chrome.tabs.sendMessage(tab.id, {
          cmd: info.menuItemId
        })
      }
    })
  })

}

init()