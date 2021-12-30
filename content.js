window.addEventListener("load", function () {
    chrome.runtime.onMessage.addListener(handleMessage);
    chrome.runtime.sendMessage({
        cmd: "checkStatus",
        domain: document.domain
    }, function (res) {
        let button = $('<div id="myGTTButton" data-testid="back-to-top-button"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="20" width="20" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle;"><path d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"></path></svg></div>')
        button.css({
            position: "fixed",
            bottom: "110px",
            right: "50px",
            height: "32px",
            width: "32px",
            'z-index': "2147483647",
            cursor: "pointer",
            "box-shadow": "rgb(97, 185, 232) 0px 0px 2px",
            "background-color": "rgba(10, 10, 10, 0.3)",
            "color": "rgba(255, 255, 255, 0.8)",
            "align-items": "center",
            "justify-content": "center",
            "display":"-webkit-flex"
        });

        $('body').append(button);
        $('body').on('click', '#myGTTButton', gotoTop);
        $("#myGTTButton").hover(() => {
            $("#myGTTButton").css({
                "background-color": "rgba(10, 10, 10, 0.5)",
                "color": "rgba(255, 255, 255)" 
            })
        }, () => {
            $("#myGTTButton").css({
                "background-color": "rgba(10, 10, 10, 0.3)",
                "color": "rgba(255, 255, 255,0.8)" 
            }) 
        })
        checkStatus(res.all)
    });
});

const handleMessage = (request, sender, sendResponse) => {
    try {
        switch (request.cmd) {
            case "gototop":
                gotoTop()
                break;
            case "checkStatus":
                checkStatus(request.all)
            default:
                break
        }
    } catch (e) {
        console.error(e)
    }
}

function gotoTop() {
    $('html, body').animate({
        scrollTop: 0
    }, 'fast');
}

function checkStatus(status) {
    if (status) {
        $("#myGTTButton").show();
    } else {
        $("#myGTTButton").hide();
    }
}