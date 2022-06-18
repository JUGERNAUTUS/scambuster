function displayAlert() {
    var parentDiv = document.createElement('div');
    parentDiv.style.display = "flex";
    parentDiv.style.justifyContent = "center";

    var childDivOne = document.createElement('div');
    childDivOne.id = "blabal";
    childDivOne.style.background = "rgb(222, 222, 222)";
    childDivOne.style.width = "300px";
    childDivOne.style.position = "fixed";
    childDivOne.style.top = "20px";
    childDivOne.style.zIndex = "10000";
    childDivOne.style.textAlign = "center";
    childDivOne.style.borderRadius = "15px";
    childDivOne.style.padding = "20px"
    childDivOne.style.borderWidth = "3px"
    childDivOne.style.borderColor = "rgba(0,0,0)"
    // childDivOne.style.display = "flex";
    // childDivOne.style.justifyContent = "space-between";
    //childDivOne.innerText = "Warning! Spam Site"
    
    var warnTxt = document.createElement('p')
    warnTxt.innerText = "WARNING! "
    warnTxt.style.margin = "auto"
    warnTxt.style.fontWeight = "bold"

    var sbIcon = document.createElement('img');
    sbIcon.src = browser.runtime.getURL("sbIcons/sb-48-r.png")

    var innerMsg = document.createElement('p')
    innerMsg.innerText = new URL(window.location.href).hostname + " is a scam site"
    innerMsg.style.marginTop = "10px"
    // innerMsg.style.color = "white"

    var childDivTwo = document.createElement('div')
    childDivTwo.style.display = "flex"

    childDivTwo.appendChild(sbIcon)
    childDivTwo.appendChild(warnTxt)

    childDivOne.appendChild(childDivTwo)
    childDivOne.appendChild(innerMsg)
    
    parentDiv.appendChild(childDivOne)

    document.body.appendChild(parentDiv);
}

function getDataFromBackend() {
    //console.log('CURRENT URL: ', window.location.href)
    let url = new URL(window.location.href).hostname
    fetch('https://localhost:7171/getSiteStatus?&' + new URLSearchParams({ url: url })).then(data => data.json())
        .then((json) => {
            console.log('Request succeeded with JSON response ', json["Data"]["1"])
            let spamCheckData = json["Data"]["1"]
            if (spamCheckData === 'TRUE') {
                console.warn('SPAM SITE')
                displayAlert()

                // Dynamically change Extension Icon 
                // chrome.tabs.query({active:true, windowType:"normal", currentWindow: true},function(d){
                //     var tabId = d[0].id;
                //     chrome.browserAction.setsbIcon({path: browser.runtime.getURL("sbIcons/sb-48-r.png"), tabId: tabId});
                // })
                // chrome.browserAction.setsbIcon({path: browser.runtime.getURL("sbIcons/sb-48-r.png"));
                // let alertinnerMsg = displayAlert()
                // document.body.appendChild(alertinnerMsg);
            } else {
                //console.log('NOT SPAM')
            }
        }).catch(function (error) {
            console.log('request failed', error)
        });
}

getDataFromBackend()
