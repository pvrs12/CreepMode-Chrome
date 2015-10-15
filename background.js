var enabled = false;

chrome.browserAction.onClicked.addListener(onClicked);

function onClicked(tab){
	enabled = !enabled;
	if(enabled){
		chrome.browserAction.setIcon({path:'data/icons/enabled-16.png'});
		sendMessage('enabled',tab.id);
	} else {
		chrome.browserAction.setIcon({path:'data/icons/disabled-16.png'});
		sendMessage('disabled',tab.id);
	}
	return;
}

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse){
	if(msg.header && (msg.header == 'creepmode')){
		if(msg.text == 'loaded'){
			if(enabled){
				//if creepmode is already on
				//need to tell the content-script it is on
				sendMessage('enabled',sender.tab.id);
			}
		}
	}
});

function sendMessage(_text,tabid){
	chrome.tabs.sendMessage(tabid,{header:'creepmode',text:_text});
}

if(enabled){
	chrome.browserAction.setIcon({path:'data/icons/enabled-16.png'});
} else {
	chrome.browserAction.setIcon({path:'data/icons/disabled-16.png'});
}
