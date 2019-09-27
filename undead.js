//Listener boton superior para coger nombre
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    userF = $(".realname").text();
    var save = {};
    save["user"] = userF;
    chrome.storage.sync.set(save);
    alert("Se ha guardado " + userF + " Como usuario");
}); //Fin 


//Se definen variables globales para su posterior uso

botonesOP = [{
    "name": "btn1",
    "title": "x",
    "groupName": "x"
}, {
    "name": "btn2",
    "title": "x",
    "groupName": "x"
}, {
    "name": "btn3",
    "title": "x",
    "groupName": "x"
}, {
    "name": "btn4",
    "title": "x",
    "groupName": "x"
}, {
    "name": "btn5",
    "title": "x",
    "groupName": "x"
}, {
    "name": "btn6",
    "title": "x",
    "groupName": "x"
}, {
    "name": "btn7",
    "title": "x",
    "groupName": "x"
}, {
    "name": "btn8",
    "title": "x",
    "groupName": "x"
}];

var isClosing = false;
var isBug = false;
var userMain;
var menuDisplay = true;

//Inicio READY
$(document).ready(function($) {

    setupMAIN();

}); // FIN READY

//Definicio Setup MAIN
function setupMAIN() {
    //Recoleccion de datos
    getDataButtons();
    //Se hace click de debug
    startClick();
    //Verificacion de BUG en web
    checkBug();

    setupMenu();
} //FIN SETUP MAIN

//Metodo para evitar bug inicial, se fuerza un click en cuailquier lugar
function startClick() {
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
} //FIN STARTCLICK

//Metodo para recoger datos de chrome.Storage
function getDataButtons() {
    //Datos User
    chrome.storage.sync.get("user", function(x) {
        console.log("USER: " + x["user"]);
        userF = x["user"];
    });
    botonesOP.forEach(function(bot, index) {
        var name = bot.name;
        var nameG = name + "G";
        //Datos titulo
        chrome.storage.sync.get({
            [name]: 'X'
        }, function(x) {
            botonesOP[index].title = x[name];
            console.log("Se asigna al boton" + index + " el titulo " + botonesOP[index].title);
        });
        //Datos grupo
        chrome.storage.sync.get({
            [nameG]: 'X'
        }, function(x) {
            console.log("Se asigna en el index " + index + " el valor de grupo " + x[nameG]);
            botonesOP[index].groupName = x[nameG];
        });
    });
} //FIN GETDATA()

//Metodo verificacion si iframe existe
function checkBug() {
    console.log("CheckBug ejecutado. Existe frame?");
    if ($('#contentFrame').length) {
        console.log("Frame existe");
        isBug = false;
    } else {
        console.log("No existe");
        isBug = true;
    }
} //FIN CHECKBUG()

//Metodo colocacion menu
function setupMenu() {
    
    setTimeout(function() {

    	$creacionMenu = '<div class="t55 menuIas">';
    $creacionMenu += '<div class="menuAsignaciones">';
    botonesOP.forEach(function(bot, index) {
        console.log("Se asigna a " + bot.name + " el titulo:    " + bot.title);
        $creacionMenu += '<div class="assBtn ' + bot.name + '">' + bot.title + '</div>';

    });

    $creacionMenu += '</div>';
    $creacionMenu += '<div class="btnMenu btnAssign">Auto-Assign</div>';
    $creacionMenu += '<div class="btnMenu btnInpro">In Progress</div>';
    $creacionMenu += '<div class="btnMenu btnPending">Pending</div>';
    $creacionMenu += '<div class="btnMenu btnClose">Close</div>';
    $creacionMenu += '<div class="btnMenu btnApply">APPLY</div>';
    $creacionMenu += '<div class="miniBtn">Ocultar</div>';
    $creacionMenu += '</div>';
        //Se añade menu
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
        }else{
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

    }, 2000);

} //FIN setupMenu()

//Metodo setGroup, gestiona cambios de grupo
function setGroup(groupName) {
    console.log("llega a SetGroup    :   " + groupName);
    checkBug();
    var n3Ass = false;
    var sys = false;

    //Se verifica si es grupo Sysops para seleccionar el correcto
    if (groupName == "N1 SysOps") {
        console.log("sys true");
        sys = true;
    }

    //Se verifica si es N3 DevOps para no cambiar a none.
    if (groupName == "N3 DevOps") {
        console.log("n3 TRUE");
        n3Ass = true;
    }
    if (isBug) {
        $("#tr_labelId_assigned_group>.Form_Ctrl_Fields>table>tbody>tr>td:first-child>div>div>.selectedTxt>span").trigger('click');
        $("#tr_labelId_responsibility>.Form_Ctrl_Fields>table>tbody>tr>td:first-child>div>div>.selectedTxt>span").trigger('click');
        if (sys) {
            $("li:contains('" + groupName + "'):first").trigger("click");
        } else {
            $("li:contains('" + groupName + "')").trigger("click");
        }

        if (!n3Ass || !isClosing) {
            $("li:contains('none'):first").trigger("click");
        }

    } else {
        $('#contentFrame').contents().find("#tr_labelId_assigned_group>.Form_Ctrl_Fields>table>tbody>tr>td:first-child>div>div>.selectedTxt>span").trigger('click');
        //$('#contentFrame').contents().find("#tr_labelId_responsibility>.Form_Ctrl_Fields>table>tbody>tr>td:first-child>div>div>.selectedTxt>span").trigger('click');
        $('#contentFrame').contents().find("li:contains('" + groupName + "')").trigger("click");
        if (sys) {
            $('#contentFrame').contents().find("li:contains('" + groupName + "'):first").trigger("click");

        } else {
            $('#contentFrame').contents().find("li:contains('" + groupName + "')").trigger("click");
        }
        if (!n3Ass || !isClosing) {

            $('#contentFrame').contents().find("li:contains('none'):first").trigger("click");
        }

    }

    if (n3Ass) {
        console.log("Se llama desde SetGroup a SET STATE ");
        setState(2);
        n3Ass = false;
    } else {
        setState(5);
    }
} //FIN SETGROUP()


//Metodo cambio de estado de ticket
function setState(estado) {

    console.log("Se llega a setState con" + estado);
    /** Verificar si web bug */
    checkBug();


    if (estado == 3) {
        console.log("is closing true");
        isClosing = true;
    }

    if (isBug) {
        console.log("Se detectca bug de UI");
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
        console.log("Se accede a setState sin bug");
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
    } //FIN setSTATE()