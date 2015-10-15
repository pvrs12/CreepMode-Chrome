var modifying = false;
var enabled = false;

var hideElements=[
	'_5gl-',//photobar
	'_32jt',//addfriend
	'share_root',//share
	'comment_link',//commentlink
	'UFIAddComment',//commentbox
	'UFILikeLink',//likelink
	'FriendRequestAdd',//friendrequest button
	'addButton',//friendrequest button
	'pageLikeButton', //like button on pages
]

document.body.addEventListener("DOMSubtreeModified",function(){
	if(!modifying){
		hideStuff();
	}
},false);

chrome.runtime.onMessage.addListener(function(msg, _, sendResponse) {
	if(msg.header && (msg.header == 'creepmode')){
		if(msg.text == 'enabled'){
			creepModeOn();
		} else if(msg.text == 'disabled'){
			creepModeOff();
		} else {
			console.log('received: '+msg.text);
		}
	}
});

function sendMessage(_text){
	chrome.runtime.sendMessage({header:'creepmode',text:_text});
}

function creepModeOff(){
	enabled = false;
	showStuff();
}

function creepModeOn(){
	enabled = true;
	hideStuff();
}

function hideStuff(){
	if(enabled){
		modifying=true;
		for(var i=0;i<hideElements.length;++i){
			hideClassElements(hideElements[i]);
		}
		modifying=false;
	}
}

function showStuff(){
	modifying=true;
	for(var i=0;i<hideElements.length;++i){
		showClassElements(hideElements[i]);
	}
	modifying=false;
}

function hideClassElements(className){
	var elements = document.getElementsByClassName(className);
	
	for(var i=0;i<elements.length;++i){
		elements[i].style.display="none";
	}
}

function showClassElements(className){
	var elements = document.getElementsByClassName(className);
	
	for(var i=0;i<elements.length;++i){
		elements[i].style.display="inline";
	}
}

sendMessage('loaded');
