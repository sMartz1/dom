jQuery(document).ready(function($) {
	var botonActual;
	$(".bton").click(function() {
		
		setupModal(this);
		$("#myModal").modal();
	});

	$(".iG").on("change paste keyup", function() {
		checkInputs();
		console.log("Se ha cambiado valor");
		checkIg(this);
     	$(".assBtn").empty();
		$(".assBtn").append($(this).val());

	});
		$(".iGp").on("change paste keyup", function() {
		checkInputs();

	});
});

function setupModal(x){
	console.log(x);
	botonActual = $(x).attr("id");
	console.log("Valor de boton actual : " + botonActual);
	buttonTitleText = $(x).find(".btnTitle").text();
	buttonGroupText = $(x).find(".btnGroupName").text();
	$(".iG").val(buttonTitleText);
	$(".iGp").val(buttonGroupText);
	
	$(".assBtn").empty();
	$(".assBtn").append(buttonTitleText);
	$("#saveChanges").unbind("click").click(function(){
		if(!$(".iG").val()){
			console.log("click activado");
			alert("No puedes dejar vacia la cabecera del boton...pichon...");
			
        }else{
		var valToSaveIg = $(".iG").val();
		var valToSaveIgp = $(".iGp").val();
		var save = {};
		bGp = botonActual +"G";
		save[botonActual] = valToSaveIg;
		save[bGp]= valToSaveIgp;
		
		
		chrome.storage.sync.set(save);		    
		chrome.storage.sync.get([botonActual],function(x){
			console.log(x[botonActual]);
			$(".iG").val("");
			$(".assBtn").empty();
			$(".iGp").val("");
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

function checkInputs(){
	if(!$(".iG").val()){
			
			$(".iG").css("background","#c72929");
			
        }else{
        	
        	$(".iG").css("background","white");

        }
    if(!$(".iGp").val()){
			
			$(".iGp").css("background","#c72929");
			
        }else{
        	
        	$(".iGp").css("background","white");

        }
}