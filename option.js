jQuery(document).ready(function($) {
	$(function () {
  $('input[data-toggle="tooltip"]').tooltip()
})

	//SETUP USER
	chrome.storage.sync.get("user",function(x){
			console.log("USER: " + x["user"]);
			$("#user").append(x["user"]);
		});
	botones = [
	{"name":".btn1","title":"x","groupName":"x"},
	{"name":".btn2","title":"x","groupName":"x"},
	{"name":".btn3","title":"x","groupName":"x"},
	{"name":".btn4","title":"x","groupName":"x"},
	{"name":".btn5","title":"x","groupName":"x"},
	{"name":".btn6","title":"x","groupName":"x"},
	{"name":".btn7","title":"x","groupName":"x"},
	{"name":".btn8","title":"x","groupName":"x"}];

	botones.forEach(function(bot,index){
			var name = bot.name;
		chrome.storage.sync.get([name],function(x){
			
			cad = name + ">.col-md-12:first>.btnTitle";
			$(cad).append(x[name]);
		});

		var nameG = bot.name +"G";
		chrome.storage.sync.get([nameG],function(x){
			cad = name + ">div:last>.btnGroupName";
			$(cad).append(x[nameG]);
		});

	});


});

