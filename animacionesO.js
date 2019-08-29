jQuery(document).ready(function($) {
	var botonActual;
	$(".bton").click(function() {
		
		setupModal(this);
		$("#myModal").modal();
	});

	$(".iG").on("change paste keyup", function() {
		console.log("Se ha cambiado valor");
     	$(".assBtn").empty();
		$(".assBtn").append($(this).val());
	});
});

function setupModal(x){
	console.log(x);
	botonActual = $(x).attr("id");
	console.log("Valor de boton actual : " + botonActual);
	buttonToModify = $(x).find(".btnTitle").text();
	$(".iG").attr("placeholder", buttonToModify);
	console.log(buttonToModify);
	$(".assBtn").empty();
	$(".assBtn").append(buttonToModify);
	$("#saveChanges").click(function(){
		var valToSave = $(".iG").val();
		var save = {};
		save[botonActual] = valToSave;
		
		chrome.storage.sync.set(save);		    
		chrome.storage.sync.get([botonActual],function(x){
			console.log(x[botonActual]);
		});
		
	});
}