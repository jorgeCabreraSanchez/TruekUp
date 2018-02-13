function chats(idTrade) {
  if (!$("#perfil-contenedor-chats").length) {
    if (!jQuery.isEmptyObject($("#modal-propio-lateral-derecho"))) {
      borrarContenidoCapaDerecha();
    }

    var texto = '<div id="perfil-contenedor-chats" class="contenedor-chats">' +
      '<div class="contenedor-chats__nombre-chat"><div class="contenedor-chats__nombre-chat__item"><h3>Chats</h3></div></div>' +
      '<div class="contenedor-chats__usuario"></div>' +
      '<div class="contenedor-chats__usuarios"></div>' +
      '<div class="contenedor-chats__chat"></div>' +
      '<div class="contenedor-chats__trade"></div>' +
      '</div>';
    $("#perfil-contenedor-chats").addClass("modal-propio__lateral--derecho__animation");
    $("#modal-propio-lateral-derecho").append(texto);

    rellenarUsuarios(idTrade);

    rellenarInventario();
  }
}

function rellenarUsuarios(idTrade) {
  var texto = '<div class="contenedor-chats__usuarios__item">' +
    '<ul id="lista-usuarios" class="lista-usuarios">' +
    '</ul>' +
    '</div>';
  $("#perfil-contenedor-chats").children(".contenedor-chats__usuarios").append(texto);

  $("#lista-usuarios").on("click", ".lista-usuarios__item", event => {
    cambiarUsuarioTradear(event);
  });

  $("#lista-usuarios").on("mouseenter", ".lista-usuarios__item", function () {
    this.getElementsByTagName("i")[0].style.visibility = "visible";
  });

  $("#lista-usuarios").on("mouseleave", ".lista-usuarios__item", function () {
    this.getElementsByTagName("i")[0].style.visibility = "hidden";
  });

  $("#lista-usuarios").on("click", ".lista-usuarios__item i.lista-usuarios__icon", borrarTrades);


  if (idTrade != null) {
    $.ajax({
      url: "php/obtenerUsuarioIdTrade.php",
      type: 'GET',
      data: {
        idTrade: idTrade
      },
      dataType: 'text',
      success: function (respuesta) {
        usuario = respuesta;
        obtenerUsuarios(usuario, idTrade);
      },
      error: function (jqXHR, status, error) {
        console.log("Error al traer el usuario dueño del producto. " + error);
      }
    });

  } else {
    obtenerUsuarios(0, idTrade);
  }


}

function obtenerUsuarios(usuario, idTrade) {
  $.ajax({
    url: "php/obtenerUsuarios.php",
    type: 'GET',
    dataType: 'json',
    success: function (json) {
      $.each(json, (index, data) => {
        var imagen = data.imagen;
        var imagenAntes = imagen.substring(0, imagen.lastIndexOf("."));
        var imagenDespues = imagen.substring(imagen.lastIndexOf("."));
        var imagen = imagenAntes + '-35x30' + imagenDespues;
        var text = "<li value='" + data.id + "' class='lista-usuarios__item'><img src='images/usuarios/" + imagen + "' class='lista-usuarios__imagen' />" +
          "<span class='lista-usuarios__nombre'>" + data.nombre + "</span><i class='lista-usuarios__icon fa fa-times-circle'></i></li>";
        $("#lista-usuarios").append(text);
        var entrar = false;
        if (usuario == 0) {
          if (index == usuario) {
            entrar = true;
          }
        } else {
          if (data.id == usuario) {
            entrar = true;
          }
        }

        if (entrar) {
          $("#lista-usuarios").children(".lista-usuarios__item:last").addClass("lista-usuarios__item--clicked");
          idUsuarioPropio = "";
          imagenUsuarioPropio = "";

          obtenerDatosId().then(response => {
            rellenarUsuario(imagen, data.nombre);
            rellenarChat(data.id, data.imagen, response['id'], response['imagen']);
            rellenarTrade(data.id, idTrade);
          });
        }


      });
    },
    error: function (jqXHR, status, error) {
      console.log("Error al traer los usuarios. " + error);
    }
  });
}


function rellenarChat(idUsuario, imagen, idUsuarioPropio, imagenUsuarioPropio) {
  

  var texto = '    <div class="col-sm-12 col-sm-offset-4 frame auto">  ' +
    '               <ul class="listaChat"></ul>  ' +
    '               <div>  ' +
    '                   <div class="msj-rta macro" style="margin:auto">                          ' +
    '                       <div class="text text-r" style="background:whitesmoke !important">  ' +
    '                           <input class="mytext" placeholder="Type a message"/>  ' +
    '                       </div>   ' +
    '                   </div>  ' +
    '               </div>  ' +
    '          </div>     ';
  $("#perfil-contenedor-chats").children(".contenedor-chats__chat").append(texto);


  var me = {};


  me.avatar = "images/usuarios/" + imagenUsuarioPropio;

  var you = {};
  you.avatar = "images/usuarios/" + imagen;

  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  //-- No use time. It is a javaScript effect.
  function insertChat(who, text, time = 0) {
    var control = "";
    var date = formatAMPM(new Date());

    if (who == idUsuarioPropio) {
      control = '<li style="width:100%">' +
        '<div class="msj macro">' +
        '<div class="avatar1"><img class="imagenChat" style="width:100%;" src="' + me.avatar + '" /></div>' +
        '<div class="text text-l">' +
        '<p>' + text + '</p>' +
        '<p><small>' + date + '</small></p>' +
        '</div>' +
        '</div>' +
        '</li>';
    } else {
      control = '<li style="width:100%;">' +
        '<div class="msj-rta macro">' +
        '<div class="text text-r">' +
        '<p>' + text + '</p>' +
        '<p><small>' + date + '</small></p>' +
        '</div>' +
        '<div class="avatar1 style="padding:0px 0px 0px 10px !important"><img class="imagenChat" style="width:100%;" src="' + you.avatar + '" /></div>' +
        '</li>';
    }
    setTimeout(
      function () {
        $(".listaChat").append(control);
      }, time);
  }

  function resetChat() {
    $(".listaChat").empty();
  }


  function existeUrl(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status != 404;
  }

  $(".listaChat").html("");
  if (existeUrl('php/logs/chatLog' + idUsuarioPropio + '-' + idUsuario + '.txt')) {
    url = 'php/logs/chatLog' + idUsuarioPropio + '-' + idUsuario + '.txt';
  } else {
    url = 'php/logs/chatLog' + idUsuario + '-' + idUsuarioPropio + '.txt';
  }

  $.get(url, function (myContentFile) {
    words = myContentFile.split('\n');
    for (let i = 0; i < words.length; i++) {
      if (words[i].substring(0, 1) == ',') {
        lineaIn = words[i].substring(1);
        elementos = words[i].split("@|@|@");
        elemento1 = elementos[0];
        elemento2 = elementos[1];
        insertChat(elemento1, elemento2)
        // insertChat(elemento1,elemento2);
      } else {
        elementos = words[i].split("@|@|@");
        elemento1 = elementos[0];
        elemento2 = elementos[1];
        insertChat(elemento1, elemento2)

      }
    }
  }, 'text');

  if(typeof refrescar!='undefined'){
    clearInterval(refrescar);
  };

  refrescar = setInterval(function () { 
    
    if (existeUrl('php/logs/chatLog' + idUsuarioPropio + '-' + idUsuario + '.txt')) {
      url = 'php/logs/chatLog' + idUsuarioPropio + '-' + idUsuario + '.txt';
    } else {
      url = 'php/logs/chatLog' + idUsuario + '-' + idUsuarioPropio + '.txt';
    }
    
    
    $.get(url, function (myContentFile) {
      words = myContentFile.split('\n');
      $(".listaChat").html("");
      for (let i = 0; i < words.length; i++) {
        if (words[i].substring(0, 1) == ',') {
          lineaIn = words[i].substring(1);
          elementos = words[i].split("@|@|@");
          elemento1 = elementos[0];
          elemento2 = elementos[1];
          insertChat(elemento1, elemento2)
          // insertChat(elemento1,elemento2);
        } else {
          elementos = words[i].split("@|@|@");
          elemento1 = elementos[0];
          elemento2 = elementos[1];
          insertChat(elemento1, elemento2)

        }
      }
    }, 'text');
  }, 3000);


  $(".mytext").on("keyup", function (e) {
    if (e.which == 13) {
      var text = "";
      var text = $(this).val();
      var that = $(this);
      if (text !== "") {
        var dataString = "";
        dataString = '\n' + idUsuarioPropio + '@|@|@' + $(this).val();
        $.ajax({
          type: "POST",
          url: "php/guardarLog.php",
          data: {
            dato1: dataString,
            dato2: idUsuario,
            url: url
          },
          success: function (data) {
            insertChat(idUsuarioPropio, text);
            that.val('');
            $('form').remove();
            $('.content').append('<p>Tu texto se ha guardado correctamente!</p><a href="data.txt" target="_blank">Ver</a>');
          }
        });
        return false;

      }
    }
  });

  //-- Clear Chat
  // resetChat();
}



function rellenarTrade(idUsuario, idTrade) {
  if (!jQuery.isEmptyObject($("#perfil-contenedor-chats").children(".contenedor-chats__trade"))) {
    $("#perfil-contenedor-chats").children(".contenedor-chats__trade").empty();
  }
  var texto = "<div id='trade-productos' class='trade'>" +
    "<div id='trade-header' class='trade__header'>" +
    "<button class='trade__header__button trade__header__button--before boton-invisible' value='-1'><i class='fa fa-angle-double-left' aria-hidden='true'></i></button>" +
    "<div class='trade__header__container__list'>" +
    "<ul id='trade-header-list' class='trade__header__list'>" +
    "</ul>" +
    "</div>" +
    "<button class='trade__header__button trade__header__button--after boton-invisible' value='+1'><i class='fa fa-angle-double-right' aria-hidden='true'></i></button>" +
    "</div>" +
    "<div id='trade-body' class='trade__body'>" +
    "</div>" +
    "<div id='trade-footer' class='trade__footer'>" +
    "<button class='trade__footer__item trade__footer__item--inventary'><i class='fa fa-briefcase trade__footer__icon' aria-hidden='true'></i> Inventario</button>" +
    "<button class='trade__footer__item trade__footer__item--accept'><i class='fa fa-check-square-o' aria-hidden='true'></i> Aceptar Trueke</button>" +
    "<button class='trade__footer__item trade__footer__item--cancel'><i class='fa fa-times-circle trade__footer__icon'></i> Cancelar Trueke</button>" +
    "<button class='trade__footer__item trade__footer__item--delete'><i class='fa fa-times-circle trade__footer__icon'></i> Eliminar Trueke</button>" +
    "</div>" +
    "</div>";
  $("#perfil-contenedor-chats").children(".contenedor-chats__trade").append(texto);
  $("#trade-footer").on("click", "button.trade__footer__item--inventary", mostrarInventario);

  $("#trade-footer").on("click", "button.trade__footer__item--accept", aceptarCambios);

  $("#trade-footer").on("click", "button.trade__footer__item--delete", eliminarTrade);

  $("#trade-footer").on("click", "button.trade__footer__item--cancel", cancelarTrade);



  $.ajax({
    url: "php/obtenerTrades.php",
    type: 'GET',
    data: {
      id2: idUsuario,
    },
    dataType: 'json',
    success: function (json) {
      trades = json;
      
      var contador = 1;
      var mostrar = 0;
      seguir = true;
      $.each(json, (index, data) => {
        if (idTrade != null && seguir) {
          if (data[2] == idTrade) { //// MODIFICADO
            mostrar = index;
            seguir = false;
          }
        }



        var text = "<li value='" + index + "' class='trade__header__list__item'>" + contador + "</li>";
        $("#trade-header-list").append(text);
        contador++;
      });

      mostrarTradeX(mostrar);

      $("#trade-header-list").on("click", "li.trade__header__list__item", event => {
        mostrarTradeX(event.target.value);
      })

      $("#trade-header").on("click", "button.trade__header__button", event => {
        var pasara = $("#trade-header-list li.trade__header__list__item--selected")[0].value;
        if (event.target.value == "-1") {
          pasara -= 1;
        } else {
          pasara += 1;
        }

        if (pasara <= $("#trade-header-list").children().length - 1 && pasara >= 0) {
          mostrarTradeX(pasara);
        }
      });


    },
    error: function (jqXHR, status, error) {
      console.log("Error al traer los trades. " + error);;
      $("#trade-header").attr("hidden", "hidden");
      $("#trade-body").attr("hidden", "hidden");
      $("#trade-footer").attr("hidden", "hidden");
      $("#trade-productos").append("<div class='trade__body__nothing'><h1>No hay ningún trueke en marcha</h1></div>");
      $("#trade-productos").addClass("trade--sinProductos");
    }
  });
}

function rellenarUsuario(imagen, nombre) {
  if (!jQuery.isEmptyObject($("#perfil-contenedor-chats").children(".contenedor-chats__usuario"))) {
    $("#perfil-contenedor-chats").children(".contenedor-chats__usuario").empty();
  }
  var texto = "<div class='contenedor-chats__usuario__item'>" +
    "<img src='images/usuarios/" + imagen + "' class='contenedor-chats__usuario__imagen' />" +
    "<span class='contenedor-chats__usuario__nombre'>" + nombre + "</span>" +
    "</div>";
  $("#perfil-contenedor-chats").children(".contenedor-chats__usuario").append(texto);
}

function cambiarUsuarioTradear(evento) {  
  if (evento.target.classList.contains("lista-usuarios__item")) {
    var elemento = evento.target;
    var id = elemento.value;
  } else {
    var elemento = evento.target.parentElement;
    var id = elemento.value;
  }

  if (!elemento.classList.contains("lista-usuarios__item--clicked") && !evento.target.classList.contains("lista-usuarios__icon")) {
    $("#lista-usuarios").children(".lista-usuarios__item--clicked").removeClass("lista-usuarios__item--clicked");
    elemento.className += " lista-usuarios__item--clicked";
    var imagen = elemento.childNodes[0].src.split("/");
    var imagen = imagen[imagen.length - 1]; //Depende de la ruta de tu ordenador, ahora no    
    var nombre = elemento.childNodes[1].textContent;

    obtenerDatosId().then(response => {
      $(".contenedor-chats__chat").html("");
      rellenarUsuario(imagen, nombre);
      rellenarChat(id, imagen, response['id'], response['imagen']);
      rellenarTrade(id, null);
    });

  }

}

function mostrarTradeX(numero) { // NO se le pasa la id del Trade, se le pasa el index del array en el cual esta su trade
  if (!$.isEmptyObject($("#trade-body"))) {
    $("#trade-body").empty();
  }

  if (trades.length) {

    var trade = trades[numero];

    if (trade[0]["id"] == 0) {
      $("#trade-footer button.trade__footer__item--accept").attr("hidden", "hidden");
      $("#trade-footer button.trade__footer__item--cancel").attr("hidden", "hidden");
    } else {
      if (trade[0]["aceptado"] == 1) {
        $("#trade-footer button.trade__footer__item--accept").removeAttr('hidden');
        $("#trade-footer button.trade__footer__item--cancel").attr("hidden", "hidden");
      } else {
        $("#trade-footer button.trade__footer__item--accept").attr("hidden", "hidden");
        $("#trade-footer button.trade__footer__item--cancel").removeAttr('hidden');
      }
    }

    var texto =
      "<div class='trade__body__item' value='" + trade[1].id + "'>" +
      "<img class='trade__body__imagen' src='" + trade[1].imagen + "'>" +
      "<span class='trade__body__nombre'>" + trade[1].nombre + "</span>" +
      "</div>" +
      "<div class='trade__body__separator'></div>" +
      "<div class='trade__body__item'  value='" + trade[0].id + "'>" +
      "<img class='trade__body__imagen' src='" + trade[0].imagen + "'>" +
      "<span class='trade__body__nombre'>" + trade[0].nombre + "</span>" +
      "</div>";

    $("#trade-body").append(texto);

    if (trade[0].aceptado == 0) {
      $("#trade-body div:last-child").append("<div class='trade__body__item--accept'></div>");
    }

    if (trade[1].aceptado == 0) {
      $("#trade-body div:first-child").append("<div class='trade__body__item--accept'></div>");

    }

    numero += 1;


    $("#trade-header-list li.trade__header__list__item--selected").removeClass("trade__header__list__item--selected");
    $("#trade-header-list li:nth-child(" + numero + ")").addClass("trade__header__list__item--selected");

    //Mover el "carousel"
    var moverCantidad;
    if (numero == 1 || numero == 2) {
      moverCantidad = 0;
    } else {
      moverCantidad = -38.6 * (numero - 2);
      if (numero - 1 == $("#trade-header-list li:last-child")[0].value) {
        moverCantidad += 22.5;
      }
    }
    $(".trade__header__list").css("margin-left", moverCantidad + "px");
  } else {
    $("#trade-header").attr("hidden", "hidden");
    $("#trade-body").attr("hidden", "hidden");
    $("#trade-footer").attr("hidden", "hidden");
    $("#trade-productos").append("<div class='trade__body__nothing'><h1>No hay ningún trueke en marcha</h1></div>");
    $("#trade-productos").css("justify-content", "center");
  }
}

function rellenarInventario() {
  $.ajax({
    url: "php/misProductos.php",
    type: 'GET',
    dataType: 'json',
    success: function (json) {
      $("#modal-propio-lateral-derecho").append("<div id='container-inventario' class='container__inventario'><div id='inventario' class='inventario'></div></div>");
      $.each(json, (index, data) => {
        $("#inventario").append("<div class='inventario__item' value='" + data.id + "'><img class='inventario__imagen' src='" + data.imagen + "'><span class='inventario__nombre'>" + data.nombre + "</span></div>");
        //cambiar en el array
        //cambiar en el trade__body__item
      });
      $("#inventario").on("click", ".inventario__item", event => {
        cambiarProducto(event);
      });
    },
    error: function (jqXHR, status, error) {
      console.log("Error al traer los productos del inventario. " + error);
    }
  });
}

function mostrarInventario() {
  if ($("#container-inventario").hasClass("mostrar--normal")) {
    $("#container-inventario").removeClass("mostrar--normal");
  } else {
    $("#container-inventario").addClass("mostrar--normal");
  }
}

function aceptarCambios() {
  $("#trade-footer button.trade__footer__item--accept").attr("hidden", "hidden");
  $("#trade-footer button.trade__footer__item--cancel").removeAttr('hidden');

  var posicion = trades[$("#trade-header-list .trade__header__list__item--selected")[0].value][3];
  var idTrade = trades[$("#trade-header-list .trade__header__list__item--selected")[0].value][2];
  //SI falla al aceptar los 2 refresca porque uno de los dos abra quitado el aceptar
  if (!$("#trade-body div:last-child .trade__body__item--accept").length) {
    $("#trade-body div:last-child").append("<div class='trade__body__item--accept'></div>");
  }

  $.ajax({
    url: "php/aceptarTrade.php",
    type: 'GET',
    data: {
      posicion: posicion,
      idTrade: idTrade
    },
    dataType: 'text',
    success: function (json) {
      if (json == "true") {
        var numero = $("#trade-header-list li.trade__header__list__item--selected")[0].value;

        trades.splice(numero, 1);

        numero += 2;

        for (let index = numero; index <= $("#trade-header-list").children().length; index++) {
          $("#trade-header-list li:nth-child(" + index + ")")[0].value = index - 2;
          $("#trade-header-list li:nth-child(" + index + ")")[0].innerHTML = index - 1;
        }


        $("#trade-header-list li.trade__header__list__item--selected").remove();
        mostrarTradeX(0);
      } else {
        var numero = $("#trade-header-list li.trade__header__list__item--selected")[0].value;
        trades[numero][0]["aceptado"] = 0;        
      }
    },
    error: function (jqXHR, status, error) {
      console.log("Error al aceptar el trade. " + error);
    }
  });
}

function cambiarProducto(evento) {
  if (evento.target.classList.contains("inventario__item")) {
    var elemento = evento.target;
  } else {
    var elemento = evento.target.parentElement;
  }

  var idProducto = elemento.getAttribute('value');
  var srcImagen = elemento.childNodes[0].src;
  var textoProducto = elemento.childNodes[1].textContent;

  $("#trade-footer button.trade__footer__item--accept").removeAttr('hidden');
  $("#trade-footer button.trade__footer__item--cancel").attr("hidden", "hidden");


  $("#trade-body div:last-child")[0].value = idProducto;
  $("#trade-body div:last-child img")[0].src = srcImagen;
  $("#trade-body div:last-child span")[0].textContent = textoProducto;

  $("#trade-body div:last-child div.trade__body__item--accept").remove();
  $("#trade-body div:first-child div.trade__body__item--accept").remove();

  trades[$("#trade-header-list .trade__header__list__item--selected")[0].value][0] = {
    id: idProducto,
    nombre: textoProducto,
    imagen: srcImagen,
    aceptado: 1
  };
  trades[$("#trade-header-list .trade__header__list__item--selected")[0].value][1].aceptado = 1;

  var idTrade = trades[$("#trade-header-list .trade__header__list__item--selected")[0].value][2];
  var posicion = trades[$("#trade-header-list .trade__header__list__item--selected")[0].value][3];

  $.ajax({
    url: "php/cambiarProductoTrade.php",
    type: 'POST',
    data: {
      idProducto: idProducto,
      idTrade: idTrade,
      posicion: posicion
    },
    dataType: 'json',
    success: function (json) {

    },
    error: function (jqXHR, status, error) {
      console.log("Error al cambiar el producto" + error);
    }
  });
}

function eliminarTrade() {
  var idTrade = trades[$("#trade-header-list .trade__header__list__item--selected")[0].value][2];

  $.ajax({
    url: "php/eliminarTrade.php",
    type: 'GET',
    data: {
      idTrade: idTrade
    },
    dataType: 'text',
    success: function (json) {
      if (json == "true") {
        var numero = $("#trade-header-list li.trade__header__list__item--selected")[0].value;

        trades.splice(numero, 1);
        numero += 2;

        for (let index = numero; index <= $("#trade-header-list").children().length; index++) {
          $("#trade-header-list li:nth-child(" + index + ")")[0].value = index - 2;
          $("#trade-header-list li:nth-child(" + index + ")")[0].innerHTML = index - 1;
        }


        $("#trade-header-list li.trade__header__list__item--selected").remove();
        mostrarTradeX(0);
      }
    },
    error: function (jqXHR, status, error) {
      console.log("Error al eliminar el trade. " + error);
    }
  });
}

function cancelarTrade() {
  $("#trade-footer button.trade__footer__item--accept").removeAttr('hidden');
  $("#trade-footer button.trade__footer__item--cancel").attr("hidden", "hidden");

  var posicion = trades[$("#trade-header-list .trade__header__list__item--selected")[0].value][3];
  var idTrade = trades[$("#trade-header-list .trade__header__list__item--selected")[0].value][2];

  if ($("#trade-body div:last-child .trade__body__item--accept").length) {
    $("#trade-body div:last-child .trade__body__item--accept").remove();
  }

  $.ajax({
    url: "php/cancelarTrade.php",
    type: 'GET',
    data: {
      posicion: posicion,
      idTrade: idTrade
    },
    dataType: 'json',
    success: function (json) {
      if (json == "true") {
        var numero = $("#trade-header-list li.trade__header__list__item--selected")[0].value;
        trades[numero][0]["aceptado"] = 1;
      }
    },
    error: function (jqXHR, status, error) {
      console.log("Error al cancelar el trade. " + error);
    }
  });
}

function borrarTrades() {
  var texto = '<div id="modal-propio-trasera2" class="modal-propio modal-propio__capa-trasera">' +
    '</div>' +
    '<div id="modal-propio2" class="modal-propio">' +
    '<div class="emergent-window-container">' +
    '<div class="emergent-window">' +
    '<div id="emergent-window-body" class="emergent-window__body">' +
    '<h3 class="emergent-window__body__title">¿Estás seguro que quieres borrar este Usuario de tu lista?</h3>' +
    '<h5 class="emergent-window__body__text">Ten en cuenta que todos los truekes que esten en marcha con este usuario también serán eliminados.</h5>' +
    '<button class="btn btn-block emergent-window__body__button emergent-window__body__button--delete">Eliminar</button>' +
    '<button class="btn btn-block emergent-window__body__button emergent-window__body__button--cancel">Cancelar</button>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>';
  $("body").append(texto);
  $("#modal-propio-lateral-derecho").css("overflow", "hidden");
  $("#emergent-window-body button.emergent-window__body__button--cancel").on("click", botonCancelarBorrarTrades);
  $("#emergent-window-body button.emergent-window__body__button--delete").on("click", (event) => botonAceptarBorrarTrades(this));
}

function botonAceptarBorrarTrades(element) {
  var elemento = element.parentElement;


  if (elemento == $("#lista-usuarios .lista-usuarios__item--clicked")[0]) {
    var beforeElement = $("#lista-usuarios .lista-usuarios__item--clicked").prev()[0];
    var beforeElementId = beforeElement.value;

    if (beforeElement.length == 0) {
      beforeElement = $("#lista-usuarios .lista-usuarios__item--clicked").next()[0];
      beforeElementId = beforeElement.value;
    }

    if (beforeElement.length == 0) {
      //No quedan mas chats
    } else {      
      beforeElement.className += " lista-usuarios__item--clicked";
      var imagen = beforeElement.childNodes[0].src.split("/");
      var imagen = imagen[imagen.length - 1]; //Dependia de la ruta del ordenador, por eso se añadio esto    
      var nombre = beforeElement.childNodes[1].textContent;

      obtenerDatosId().then(response => {
        rellenarUsuario(imagen, nombre);
        rellenarChat(beforeElementId, imagen, response['id'], response['imagen']);
        rellenarTrade(beforeElementId);
      });


    }
  }

  elemento.parentElement.removeChild(elemento);


  $.ajax({
    url: "php/borrarUsuarioChats.php",
    type: 'POST',
    data: {
      idUsuario: elemento.value
    },
    dataType: 'text',
    success: function (respuesta) {

    },
    error: function (jqXHR, status, error) {
      console.log("Error al traer el usuario dueño del producto. " + error);
    }
  });


  $("#modal-propio-trasera2").remove();
  $("#modal-propio2").remove();
}

function botonCancelarBorrarTrades() {
  $("#modal-propio-trasera2").remove();
  $("#modal-propio2").remove();
}

async function obtenerDatosId() {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: 'php/obtenerID.php',
      type: 'GET',
      dataType: 'json',
      success: function (arrayDatos) {
        idUsuarioPropio = arrayDatos["id"];
        imagenUsuarioPropio = arrayDatos["imagen"];
        resolve({
          "id": idUsuarioPropio,
          "imagen": imagenUsuarioPropio
        });
      },
      //Termina success
      error: function (jqXHR, status, error) {
        reject(Error("FALSE " + error));
      }
    });
  });
}