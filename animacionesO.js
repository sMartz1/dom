jQuery(document).ready(function($) {
	var botonActual;
	$(".bton").click(function() {
		
		setupModal(this);
		$("#myModal").modal();
	});

	$(".iG").on("change paste keyup", function() {
		console.log("Se ha cambiado valor");
		checkIg(this);
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
	$("#saveChanges").unbind("click").click(function(){
		if(!$(".iG").val()){
			console.log("click activado");
			alert("No puedes dejar vacia la cabecera del boton...pichon...");
			
        }else{
		var valToSave = $(".iG").val();
		var save = {};
		save[botonActual] = valToSave;
		
		
		chrome.storage.sync.set(save);		    
		chrome.storage.sync.get([botonActual],function(x){
			console.log(x[botonActual]);
			$(".iG").val("");
			$(".assBtn").empty();
			$("#saveChanges").removeAttr("data-dismiss");
		});
	}	
	});
}

function checkIg(x){
	$("#saveChanges").removeAttr("data-dismiss");
		if($(x).val().length>1){
			console.log("Se añade clase a boton");
			$("#saveChanges").attr("data-dismiss","modal");
		}
}