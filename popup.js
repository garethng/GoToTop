$("#allToggle").click(function () {

    chrome.runtime.sendMessage({
        "cmd": "setStatus",
        all: $("#allToggle")[0].checked
    })
    chrome.tabs.query({
        currentWindow: true,
        active: true
    }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            cmd: "checkStatus",
            all: $("#allToggle")[0].checked
        }, function (res) {})
    })
})

chrome.runtime.sendMessage({
    "cmd": "checkStatus"
},item => {
    if (item.all === undefined) {
        $("#allToggle")[0].checked = true
        chrome.runtime.sendMessage({
            "cmd": "setStatus",
            all: true
        })
    }
    $("#allToggle")[0].checked = item.all
})

function setupL10N() { 
    $("label.title-toggle").text(chrome.i18n.getMessage("popup_config_hide_all"))
}

setupL10N()