<<<<<<< HEAD
function chats() {
=======
function chats(idProducto) {
>>>>>>> david
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

    $("#modal-propio-lateral-derecho").append(texto);

<<<<<<< HEAD
    rellenarUsuarios();
    rellenarChat();
    rellenarTrade();

  }
}

function rellenarUsuarios() {
=======
    rellenarUsuarios(idProducto);

    rellenarInventario();
  }
}

function rellenarUsuarios(idProducto) {
  var texto = '<div class="contenedor-chats__usuarios__item">' +
    '<ul id="lista-usuarios" class="lista-usuarios">' +
    '</ul>' +
    '</div>';
  $("#perfil-contenedor-chats").children(".contenedor-chats__usuarios").append(texto);

  $("#lista-usuarios").on("click", ".lista-usuarios__item", event => {
    cambiarUsuarioTradear(event);
  });

  var usuario = 0;
  if (idProducto != null) {
    $.ajax({
      url: "php/obtenerUsuarioProducto.php",
      type: 'GET',
      dataType: 'text',
      success: function (respuesta) {
        usuario = respuesta;
      },
      error: function (jqXHR, status, error) {
        console.log("Error al traer el usuario dueño del producto. " + error);
      }
    });

  }


>>>>>>> david
  $.ajax({
    url: "php/obtenerUsuarios.php",
    type: 'GET',
    dataType: 'json',
    success: function (json) {
<<<<<<< HEAD
      $.each(json,(index,data)=>{   
        var text = "<li id='"+data.id+"' class='lista-usuarios__item'><img src='images/usuarios/"+ data.imagen +"' class='lista-usuarios__imagen' />"+
        "<span class='lista-usuarios__nombre'>"+data.nombre+"</span></li>";   
        $("#lista-usuarios").append(text);
      });
    },
    error: function (jqXHR, status, error) {
      console.log("Error al traer los chats. " + error);
    }
  });

  var texto = '<div class="contenedor-chats__usuarios__item">' +
    '<ul id="lista-usuarios" class="lista-usuarios">'+
    '</ul>'+
    '</div>';
  $("#perfil-contenedor-chats").children(".contenedor-chats__usuarios").append(texto);

  rellenarUsuario("0-35x30.jpg", "Borja Orts");
}

function rellenarChat() {
=======
      $.each(json, (index, data) => {
        var text = "<li value='" + data.id + "' class='lista-usuarios__item'><img src='images/usuarios/" + data.imagen + "' class='lista-usuarios__imagen' />" +
          "<span class='lista-usuarios__nombre'>" + data.nombre + "</span></li>";
        $("#lista-usuarios").append(text);

        if (index == usuario) {
          $("#lista-usuarios").children(".lista-usuarios__item:first").addClass("lista-usuarios__item--clicked");
          rellenarUsuario(data.imagen, data.nombre);
          rellenarChat(data.id);
          rellenarTrade(data.id, idProducto);
        }

      });
    },
    error: function (jqXHR, status, error) {
      console.log("Error al traer los usuarios. " + error);
    }
  });

}

function rellenarChat(idUsuario) {
>>>>>>> david
  var texto = "";
  $("#perfil-contenedor-chats").children(".contenedor-chats__chat").append(texto);
}

<<<<<<< HEAD
function rellenarTrade() {
  var texto = "";
  $("#perfil-contenedor-chats").children(".contenedor-chats__trade").append(texto);
}

function rellenarUsuario(imagen, foto) {
  var texto = "";
  $("#perfil-contenedor-chats").children(".contenedor-chats__usuario").append(texto);
}
=======

function rellenarTrade(idUsuario, idProducto) {
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
    "<button class='trade__footer__item trade__footer__item--accept'><i class='fa fa-check-square-o' aria-hidden='true'></i> Aceptar Trade</button>" +
    "</div>" +
    "</div>";
  $("#perfil-contenedor-chats").children(".contenedor-chats__trade").append(texto);

  $("#trade-footer button:first-child").on("click", mostrarInventario);

  $("#trade-footer button:last-child").on("click", aceptarCambios);



  $.ajax({
    url: "php/obtenerTrades.php",
    type: 'GET',
    data: {
      id2: idUsuario,
    },
    dataType: 'json',
    success: function (json) {
      console.log(json);
      trades = json;
      var contador = 1;
      var mostrar = 0;
      seguir = true;
      $.each(json, (index, data) => {
        if (idProducto != null && seguir) {
          if (data[0].id == idProducto || data[1].id == idProducto) {
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
      console.log("Error al traer los trades. " + error);
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
    var id = evento.target.value;
  } else {
    var elemento = evento.target.parentElement;
    var id = evento.target.parentElement.value;
  }

  if (!elemento.classList.contains("lista-usuarios__item--clicked")) {
    $("#lista-usuarios").children(".lista-usuarios__item--clicked").removeClass("lista-usuarios__item--clicked");
    elemento.className += " lista-usuarios__item--clicked";
    var imagen = elemento.childNodes[0].src.split("/")[7]; //Depende de la ruta de tu ordenador
    var nombre = elemento.childNodes[1].textContent;
    rellenarUsuario(imagen, nombre);
    rellenarChat(id);
    rellenarTrade(id);
  }

}

function mostrarTradeX(numero) {
  if (!$.isEmptyObject($("#trade-body"))) {
    $("#trade-body").empty();
  }

  var trade = trades[numero];

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
  var posicion = trades[$("#trade-header-list .trade__header__list__item--selected")[0].value][3];
  var idTrade = trades[$("#trade-header-list .trade__header__list__item--selected")[0].value][2];
  //SI falla al aceptar los 2 refresca porque uno de los dos abra quitado el aceptar
  $("#trade-body div:last-child").append("<div class='trade__body__item--accept'></div>");
  $.ajax({
    url: "php/aceptarTrade.php",
    type: 'GET',
    data: {
      posicion: posicion,
      idTrade: idTrade
    },
    dataType: 'text',
    success: function (json) {
      if(json == "true"){        
        var numero = $("#trade-header-list li.trade__header__list__item--selected")[0].value;
               
        trades.splice(numero,1); 

        numero += 2;        
        
        for (let index = numero; index <= $("#trade-header-list").children().length; index++) {          
          $("#trade-header-list li:nth-child("+index+")")[0].value = index-2;          
          $("#trade-header-list li:nth-child("+index+")")[0].innerHTML = index-1;          
        }

               
        $("#trade-header-list li.trade__header__list__item--selected").remove();
        mostrarTradeX(0);
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
>>>>>>> david
