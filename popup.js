$(document).ready(function($) {
	$("#takeName").click(function(event) {
		/* Act on the event */
		chrome.tabs.query({currentWindow: true, active: true},
		function(tabs){
			chrome.tabs.sendMessage(tabs[0].id,"alo");
		});
	});
	
});