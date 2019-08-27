$(document).ready(function($) {
    var isBug = false;
    var currentTime = new Date();
    $(document).on('keypress', function(e) {
        if (e.which == 13) {
            console.log('You pressed enter!');
        }
    });
    //TIMEOUT PARA CARGA TRAS 2 secs
    setupMAIN();
    /** Boolean para vision de menu */
    var menuDisplay = true;
    /** Verificar cambio en Iframe */
    $('#contentFrame').load(function() {
        console.log("IframeCambio");
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

        $user = $(".realname").text();
        console.log($user);
        $stringFinal = "li:contains('" + $user + "')";
        checkBug();

        if (!isBug) {
            $('#contentFrame').contents().find("#tr_labelId_responsibility>.Form_Ctrl_Fields>table>tbody>tr>td:first-child>div>div>.selectedTxt>span").trigger('click');
            $('#contentFrame').contents().find("#tr_labelId_responsibility>.Form_Ctrl_Fields>table>tbody>tr>td:first-child>div>div>input.autoSuggestInput").val($user);
            $('#contentFrame').contents().find($stringFinal).trigger("click");
        } else {
            $("#tr_labelId_responsibility>.Form_Ctrl_Fields>table>tbody>tr>td:first-child>div>div>.selectedTxt>span").trigger('click');
            $("#tr_labelId_responsibility>.Form_Ctrl_Fields>table>tbody>tr>td:first-child>div>div>input.autoSuggestInput").val($user);
            $($stringFinal).trigger("click");
        }
    });

    $(".recoveryBtn").click(function(event){

        saveText(currentTime,getIncident());
    });

    /** ASSIGN CS */
    /** ASSIGN CS */
    $(".csBtn").click(function(event) {
        setGroup(1);
    });
    /** ASSIGN N2 */
    $(".n2Btn").click(function(event) {
        setGroup(2);
    });
    /** ASSIGN EC */
    $(".ecBtn").click(function(event) {
        setGroup(3);
    });
    /** ASSIGN RH */
    $(".rhBtn").click(function(event) {
        setGroup(4);
    });
    $(".n1Btn").click(function(event) {
        setGroup(5);
    });
    $(".n3Btn").click(function(event) {
        setGroup(6);
    });
    $(".hdBtn").click(function(event) {
        setGroup(7);
    });
    $(".trBtn").click(function(event) {
        setGroup(8);
    });
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
            /** Ocultar botones */
            $(".btnApply,.btnClose,.btnAssign,.btnPending,.btnInpro,.menuAsignaciones").css("display", "block");
            /** Ocultar sombra */
            $(".t55").css("box-shadow", "0px 0px 15px rgba(0, 0, 0, 0.1)");
            menuDisplay = true;
            $(".miniBtn").text("Ocultar");
            $(".miniBtn").css("background-color", "#fff");
            $(".miniBtn").css("color", "#000");
        }

    });
}); /** Fin READY */

/** [setupMAIN Setup MODULO PRINCIPAL] */
function setupMAIN() {

    checkBug();
    setupMenu();

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

    $("body").append('<div class="t55 menuIas"><div class="menuAsignaciones"><div class="assBtn n1Btn">N1</div><div class="assBtn n2Btn">N2</div><div class="assBtn n3Btn">N3</div><div class="assBtn hdBtn">HD</div><div class="assBtn csBtn">CS</div><div class="assBtn ecBtn">EC</div><div class="assBtn trBtn">TR</div><div class="assBtn rhBtn">RH</div></div><div class="btnMenu btnAssign">Auto-Assign</div><div class="btnMenu btnInpro">In Progress</div><div class="btnMenu btnPending">Pending</div><div class="btnMenu btnClose">Close</div><div class="btnMenu btnApply">APPLY</div><div class="miniBtn">Ocultar</div></div>');
    $(".t55").css("opacity", "1");
    $(".t55").addClass("animated bounceInRight");
   
}

/* Cambiar hora de comentarios*/
function setHoraComment(){
    $('#contentFrame').contents().find("input[name='sract_total']").trigger('click');
    $('#contentFrame').contents().find("input[name='sract_total']").val("00:15");
      console.log("Set HORA TR");
      

}
/* Asignar estado */
function setState(estado) {
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
                setGroup(5);
                $("li:contains('Closed')").trigger("click");
                break;

            case 4:
                $("#ApplyBtn").trigger("click");
                break;

            case 5:
                $("li:contains('Assigned')").trigger("click");
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
                setGroup(10);
                $('#contentFrame').contents().find("li:contains('Closed')").trigger("click");

                break;

            case 4:
                $('#contentFrame').contents().find("#ApplyBtn").trigger("click");
                break;

            case 5:
                $('#contentFrame').contents().find("li:contains('Assigned')").trigger("click");
                break;


        }
    }


}
/* Asignar grupo */
function setGroup(estado) {
    checkBug();
    var n3Ass = false;
    if (isBug) {
        $("#tr_labelId_assigned_group>.Form_Ctrl_Fields>table>tbody>tr>td:first-child>div>div>.selectedTxt>span").trigger('click');
        $("#tr_labelId_responsibility>.Form_Ctrl_Fields>table>tbody>tr>td:first-child>div>div>.selectedTxt>span").trigger('click');
        switch (estado) {

            case 1:
                
                $("li:contains('Customer Services')").trigger("click");
                $("li:contains('none'):first").trigger("click");

                break;

            case 2:
                $("li:contains('N2 APP')").trigger("click");
                $("li:contains('none'):first").trigger("click");
                break;

            case 3:
                $("li:contains('DepartamentoEcommerce')").trigger("click");
                $("li:contains('none'):first").trigger("click");
                break;

            case 4:
                $("li:contains('Administration & Labor Relations')").trigger("click");
                $("li:contains('none'):first").trigger("click");
                break;
            case 5:
                $("li:contains('N1 SysOps'):first").trigger("click");
                $("li:contains('none'):first").trigger("click");
                break;

            case 6:
                $("li:contains('N3 DevOps')").trigger("click");
                n3Ass = true;
                break;

            case 7:
                $("li:contains('N1 Helpdesk')").trigger("click");
                $("li:contains('none'):first").trigger("click");
                break;
            case 8:
                $("li:contains('SIGGERTRAINING'):first").trigger("click");
                $("li:contains('none'):first").trigger("click");
                break;
            case 10:
                $("li:contains('N1 APP')").trigger("click");
                break;




        }
        if(n3Ass){
            setState(2);
            n3Ass = false;
        }
            else{
        setState(5);
        }

    } else {

        $('#contentFrame').contents().find("#tr_labelId_assigned_group>.Form_Ctrl_Fields>table>tbody>tr>td:first-child>div>div>.selectedTxt>span").trigger('click');
        $('#contentFrame').contents().find("#tr_labelId_responsibility>.Form_Ctrl_Fields>table>tbody>tr>td:first-child>div>div>.selectedTxt>span").trigger('click');
        switch (estado) {

            case 1:
                $('#contentFrame').contents().find("li:contains('Customer Services')").trigger("click");
                $('#contentFrame').contents().find("li:contains('none'):first").trigger("click");
                break;

            case 2:
                $('#contentFrame').contents().find("li:contains('N2 APP')").trigger("click");
                $('#contentFrame').contents().find("li:contains('none'):first").trigger("click");
                break;

            case 3:
                $('#contentFrame').contents().find("li:contains('DepartamentoEcommerce')").trigger("click");
                $('#contentFrame').contents().find("li:contains('none'):first").trigger("click");
                break;

            case 4:
                $('#contentFrame').contents().find("li:contains('Administration & Labor Relations')").trigger("click");
                $('#contentFrame').contents().find("li:contains('none'):first").trigger("click");
                break;

            case 5:
                $('#contentFrame').contents().find("li:contains('N1 SysOps'):first").trigger("click");
                $('#contentFrame').contents().find("li:contains('none'):first").trigger("click");
                break;

            case 6:
                $('#contentFrame').contents().find("li:contains('N3 DevOps')").trigger("click");
                n3Ass=true;
                break;

            case 7:
                $('#contentFrame').contents().find("li:contains('N1 Helpdesk')").trigger("click");
                $('#contentFrame').contents().find("li:contains('none'):first").trigger("click");
                break;

            case 8:
                $('#contentFrame').contents().find("li:contains('SIGGERTRAINING'):first").trigger("click");
                $('#contentFrame').contents().find("li:contains('none'):first").trigger("click");
                break;
             case 10:
                $('#contentFrame').contents().find("li:contains('N1 APP'):first").trigger("click");
                break;

        }
                if(n3Ass){
            setState(2);
            n3Ass = false;
        }
            else{
        setState(5);
        }
        
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
    $creacionMenu = '<div class="t55 menuIas">';
    $creacionMenu += '<div class="menuAsignaciones">';
    $creacionMenu +='<div class="assBtn n1Btn">N1</div>';
    $creacionMenu +='<div class="assBtn n2Btn">N2</div>';
    $creacionMenu +='<div class="assBtn n3Btn">N3</div>';
    $creacionMenu +='<div class="assBtn hdBtn">HD</div>';
    $creacionMenu +='<div class="assBtn csBtn">CS</div>';
    $creacionMenu +='<div class="assBtn ecBtn">EC</div>';
    $creacionMenu +='<div class="assBtn trBtn">TR</div>';
    $creacionMenu +='<div class="assBtn rhBtn">RH</div>';
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
}


