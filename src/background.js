chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        tabUrl = tab.url;
        tabTitle = tab.title;
        console.log(tabUrl+tabTitle);

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            let message = {pageStart: true}
            chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
                console.log(response);
            });
        });
    }
});

