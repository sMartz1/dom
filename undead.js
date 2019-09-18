
chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
    userF = $(".realname").text();
    var save = {};
    save["user"] = userF;
    chrome.storage.sync.set(save);
    alert("Se ha guardado " + userF + " Como usuario");
});

    botonesOP = [
    {"name":"btn1","title":"x","groupName":"x"},
    {"name":"btn2","title":"x","groupName":"x"},
    {"name":"btn3","title":"x","groupName":"x"},
    {"name":"btn4","title":"x","groupName":"x"},
    {"name":"btn5","title":"x","groupName":"x"},
    {"name":"btn6","title":"x","groupName":"x"},
    {"name":"btn7","title":"x","groupName":"x"},
    {"name":"btn8","title":"x","groupName":"x"}];

$(document).ready(function($) {

    //get current user
    chrome.storage.sync.get("user",function(x){
            console.log("USER: " + x["user"]);
            userF=x["user"];
        });
    getDataButtons();
    var isBug = false;
    var currentTime = new Date();
    var userMain;
    console.log(botonesOP[0].title);

    $(document).on('keypress', function(e) {
        if (e.which == 13) {
            console.log('You pressed enter!');
        }
    });
    getDataButtons();
    //TIMEOUT PARA CARGA TRAS 2 secs
    setupMAIN();
    /** Boolean para vision de menu */
    var menuDisplay = true;
    /** Verificar cambio en Iframe */
    $('#contentFrame').load(function() {
        console.log("IframeCambio");
    });



    $(".recoveryBtn").click(function(event){

        saveText(currentTime,getIncident());
    });

   
    /** ASSIGN CS */
    /** ASSIGN CS */
    
    setTimeout(function() {
    $('#contentFrame').contents().find("#sract_description").focus(function(event){
        console.log("TA click");
    });
},0);
     
       
      
   

    

 


    $('#contentFrame').contents().find(".Button3Parts").click(function(event){
        console.log("add apretado");
    });




    /** Minimizar */
    $(".miniBtn").click(function(event) {
        checkBug();
        if (menuDisplay) {
            $(".btnApply,.btnClose,.btnAssign,.btnPending,.btnInpro,.menuAsignaciones").addClass("animated fadeOutUp");
            $(".btnApply,.btnClose,.btnAssign,.btnPending,.btnInpro,.menuAsignaciones").css("display", "none");
            $(".t55").css("box-shadow", "0px 0px 15px rgba(0, 0, 0, 0.0)");

            menuDisplay = false;
            $(".miniBtn").text("Mostrar");
            $(".miniBtn").css("background-color", "#3B3B98");
            $(".miniBtn").css("color", "#55E6C1");
        } else {
            $(".btnApply,.btnClose,.btnAssign,.btnPending,.btnInpro,.menuAsignaciones").removeClass("fadeOutUp");
            $(".btnApply,.btnClose,.btnAssign,.btnPending,.btnInpro,.menuAsignaciones").addClass("fadeInDown");
            /** Ocultar botonesOP */
            $(".btnApply,.btnClose,.btnAssign,.btnPending,.btnInpro,.menuAsignaciones").css("display", "block");
            /** Ocultar sombra */
            $(".t55").css("box-shadow", "0px 0px 15px rgba(0, 0, 0, 0.1)");
            menuDisplay = true;
            $(".miniBtn").text("Ocultar");
            $(".miniBtn").css("background-color", "#fff");
            $(".miniBtn").css("color", "#000");
        }

    });
 /** Fin READY */
});
/** [setupMAIN Setup MODULO PRINCIPAL] */
function setupMAIN() {

    checkBug();
    

    if (isBug) {
        $("#tr_labelId_status>.Form_Ctrl_Fields>table>tbody>tr>td:first-child>div>div>.selectedTxt>span").trigger('click');
        setTimeout(function() {

            $("body").trigger('click');


        }, 1000);
    } else {
        $('#contentFrame').contents().find("#tr_labelId_status>.Form_Ctrl_Fields>table>tbody>tr>td:first-child>div>div>.selectedTxt>span").trigger('click');
        setTimeout(function() {

            $('#contentFrame').contents().find("body").trigger('click');


        }, 1000);
    }

    //*  BOTON NEXT
    // <div class="nxtBtn">X</div>
    //  */
    //  
    
    setupMenu();


}

/* Cambiar hora de comentarios*/
function setHoraComment(){
    $('#contentFrame').contents().find("input[name='sract_total']").trigger('click');
    $('#contentFrame').contents().find("input[name='sract_total']").val("00:15");
      console.log("Set HORA TR");
      

}
/* Asignar estado */
function setState(estado){
    /** Verificar si web bug */
    checkBug();
    //Se hace click en dropdownList

    if (isBug) {
        $("#tr_labelId_status>.Form_Ctrl_Fields>table>tbody>tr>td:first-child>div>div>.selectedTxt>span").trigger('click');

        //Estados : 1 In progress // 2 Pending // 3 Close // 4 APPLY // 5 Assigned
        switch (estado) {

            case 1:
                $("li:contains('In Progress')").trigger("click");
                break;

            case 2:
                $("li:contains('Pending')").trigger("click");

                break;

            case 3:
                setGroup("N1 APP");
                $("li:contains('Closed')").trigger("click");
                break;

            case 4:
                $("#ApplyBtn").trigger("click");
                break;

            case 5:
                $("li:contains('Assigned')").trigger("click");
                break;
            case 8: 
                $user = userF;
                console.log("Se asigna user" + $user);
                $stringFinal = "li:contains('" + $user + "')";
                $("#tr_labelId_responsibility>.Form_Ctrl_Fields>table>tbody>tr>td:first-child>div>div>.selectedTxt>span").trigger('click');
                $("#tr_labelId_responsibility>.Form_Ctrl_Fields>table>tbody>tr>td:first-child>div>div>input.autoSuggestInput").val($user);
                $($stringFinal).trigger("click");
                break;

            }



        

    } else {

        $('#contentFrame').contents().find("#tr_labelId_status>.Form_Ctrl_Fields>table>tbody>tr>td:first-child>div>div>.selectedTxt>span").trigger('click');

        //Estados : 1 In progress // 2 Pending // 3 Close // 4 APPLY // 5 Assigned
        switch (estado) {

            case 1:
                $('#contentFrame').contents().find("li:contains('In Progress')").trigger("click");
                break;

            case 2:
                $('#contentFrame').contents().find("li:contains('Pending')").trigger("click");
                break;

            case 3:
                setGroup("N1 APP");
                $('#contentFrame').contents().find("li:contains('Closed')").trigger("click");

                break;

            case 4:
                $('#contentFrame').contents().find("#ApplyBtn").trigger("click");
                break;

            case 5:
                $('#contentFrame').contents().find("li:contains('Assigned')").trigger("click");
                break;
            case 8:
                 $user = userF;
                 console.log("Se asigna user" + $user);
                 $stringFinal = "li:contains('" + $user + "')";
                 $('#contentFrame').contents().find("#tr_labelId_responsibility>.Form_Ctrl_Fields>table>tbody>tr>td:first-child>div>div>.selectedTxt>span").trigger('click');
                 $('#contentFrame').contents().find("#tr_labelId_responsibility>.Form_Ctrl_Fields>table>tbody>tr>td:first-child>div>div>input.autoSuggestInput").val($user);
                 $('#contentFrame').contents().find($stringFinal).trigger("click");
                 break;
        }
    
}
};




function setGroup(groupName){
    console.log("llega a SetGroup    :   "  + groupName);
    checkBug();
    var n3Ass = false;
    if(groupName =="N3 DevOps"){
        console.log("n3 TRUE");
        n3Ass = true;
    }
    if (isBug) {
        $("#tr_labelId_assigned_group>.Form_Ctrl_Fields>table>tbody>tr>td:first-child>div>div>.selectedTxt>span").trigger('click');
        $("#tr_labelId_responsibility>.Form_Ctrl_Fields>table>tbody>tr>td:first-child>div>div>.selectedTxt>span").trigger('click');
        $("li:contains('"+ groupName +"')").trigger("click");
        if(!n3Ass){
        $("li:contains('none'):first").trigger("click");
    }
        
        }else{
            $('#contentFrame').contents().find("#tr_labelId_assigned_group>.Form_Ctrl_Fields>table>tbody>tr>td:first-child>div>div>.selectedTxt>span").trigger('click');
            $('#contentFrame').contents().find("#tr_labelId_responsibility>.Form_Ctrl_Fields>table>tbody>tr>td:first-child>div>div>.selectedTxt>span").trigger('click');
            $('#contentFrame').contents().find("li:contains('"+ groupName +"')").trigger("click");
            if(!n3Ass){
            $('#contentFrame').contents().find("li:contains('none'):first").trigger("click");
        }
        
    }

    if(n3Ass){
        console.log("Se llama desde SetGroup a SET STATE ");
        setState(2);
            n3Ass = false;
        }
            else{
        setState(5);
    }
}

function checkBug() {
    if ($('#contentFrame').length) {
        console.log("Frame existe");
        setHoraComment();
        isBug = false;
    } else {
        console.log("No existe");
        isBug = true;
    }
}

function saveText(filename, text) {
            var tempElem = document.createElement('a');
            tempElem.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            tempElem.setAttribute('download', filename);
            tempElem.click();
         }

function getIncident(){
    return $('#contentFrame').contents().find(".UI_Form_BreadCrumbs_Label>span").text();
}

function setupMenu(){

    setTimeout(function() {
    $creacionMenu = '<div class="t55 menuIas">';
    $creacionMenu += '<div class="menuAsignaciones">';
    botonesOP.forEach(function(bot,index){console.log("Se asigna a " + bot.name + " el titulo:    " + bot.title);
        $creacionMenu +='<div class="assBtn ' + bot.name + '">' + bot.title +'</div>';

     });

    $creacionMenu +='</div>';
    $creacionMenu +='<div class="btnMenu btnAssign">Auto-Assign</div>';
    $creacionMenu +='<div class="btnMenu btnInpro">In Progress</div>';
    $creacionMenu +='<div class="btnMenu btnPending">Pending</div>';
    $creacionMenu +='<div class="btnMenu btnClose">Close</div>';
    $creacionMenu +='<div class="btnMenu btnApply">APPLY</div>';
    $creacionMenu +='<div class="miniBtn">Ocultar</div>';
    $creacionMenu +='</div>';
    $("body").append($creacionMenu);
    $(".t55").css("opacity", "1");
    $(".t55").addClass("animated bounceInRight");

    $(".btn1").click(function(event) {
        setGroup(botonesOP[0].groupName);
    });
    /** ASSIGN N2 */
    $(".btn2").click(function(event) {
        setGroup(botonesOP[1].groupName);
    });
    /** ASSIGN EC */
    $(".btn3").click(function(event) {
        setGroup(botonesOP[2].groupName);
    });
    /** ASSIGN RH */
    
    $(".btn4").click(function(event) {
        setGroup(botonesOP[3].groupName);
    });
    $(".btn5").click(function(event) {
        setGroup(botonesOP[4].groupName);
    });
    $(".btn6").click(function(event) {
        setGroup(botonesOP[5].groupName);
    });
    $(".btn7").click(function(event) {
        setGroup(botonesOP[6].groupName);
    });
    $(".btn8").click(function(event) {
        setGroup(botonesOP[7].groupName);
    });

    /** APPLY BUTTON */
    $(".btnApply").click(function(event) {
        setState(4);
    });
    /** IN progress Bttuon */
    $(".btnInpro").click(function(event) {

        setState(1);
    });
    /**   CLOSE BTN   */
    $(".btnClose").click(function(event) {

        setState(3);
    });
    /** PENDING BTN */
    $(".btnPending").click(function(event) {
        setState(2);
    });
    /** AUTOASIGN */
    $(".btnAssign").click(function(event) {

        setState(8);
    });
    }, 2000);
   
}

function getDataButtons(){
    botonesOP.forEach(function(bot,index){
        var name = bot.name;
        var nameG = name +"G";
        chrome.storage.sync.get({[name] :'X'},function(x){
       
            
            botonesOP[index].title =x[name];});
        chrome.storage.sync.get({[nameG] :'X'},function(x){
            console.log("Se asigna en el index " + index + " el valor de grupo " + x[nameG]);
            botonesOP[index].groupName =x[nameG];
        });
    });
}

