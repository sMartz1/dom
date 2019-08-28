jQuery(document).ready(function($) {
	$(".bton").click(function() {
		console.log("btnTrigger");
		setupModal(this);
		$("#myModal").modal();
	});
	$(".iG").on("change paste keyup", function() {
     	$(".assBtn").empty();
		$(".assBtn").append($(this).val());
	});
});

function setupModal(x){
	console.log(x);
	buttonToModify = $(x).find(".btnTitle").text();
	$(".iG").attr("placeholder", buttonToModify);
	console.log(buttonToModify);
	$(".assBtn").empty();
	$(".assBtn").append(buttonToModify);
}