chrome.browserAction.onClicked.addListener(function (e) {
    chrome.tabs.executeScript(e.id, {
        file: "js/jquery-3.6.0.min.js"
    })
    chrome.tabs.executeScript(e.id, {
        file: "js/xlsx.core.min.js"
    })
    chrome.tabs.executeScript(e.id, {
        file: "js/get.js"
    })
})