function login() {
  if ($("#login-error").length) {
    // Si existe       
    $("#login-error").remove();
    $(".login__body").css("grid-template-rows", "repeat(2, 1fr) 10% 1fr");
    $(".login__body").css("grid-template-areas", "'email' 'password' 'rembember' 'entrar'");
    $(".login__body__remember").css("margin-bottom", "13px");
  }

  if (loginVerify()) {
    loginVerifyServer($("#login-email").val(), SHA1($("#login-password").val())).then(response => {

      if (response == "TRUE") {
        quitarLoginRegister();
      } else {
        loginBad();
      }
    });

  } else {
    loginBad();
  }
}

function quitarLoginRegister() {
  $("#miModal").remove();
  $("#modal-backdrop").remove();
  $("body").removeClass("modal-open");
  $("#navbar").removeClass("navbar-modal-open");
}


function logueado(nombre, imagen) {
  while ($("#navbar-list").children().length != 1) {
    $("#navbar-list").children()[1].remove();
  }

  img = imagen.split(".")[0] + "-35x30." + imagen.split(".")[1];

  $("<li class='navbar-list__item navbar-list__item--perfil navbar-list__item--highlighted' id='perfil'>" +
    "<button class='nav-link nav-link--movement boton-invisible'>" +
    "<span>" + nombre + "</span>" + "  <img class='navbar-list__item__imagen' src='images/usuarios/" + img + "'></img></button>" +
    "</li>").appendTo($("#navbar-list"));
  $('.navbar-list__item').css("padding-bottom", "20px");
  $(".navbar-list__item").css("height", "50px");

  $("#perfil").on("click", mostrarPerfil);
}

function loginBad() {
  $(".login__body").css("grid-template-rows", "repeat(2,1fr) repeat(2, 10%) 1fr");
  $(".login__body").css("grid-template-areas", "'email' 'password' 'remember' 'error' 'entrar'");
  $(".login__body__remember").css("margin-bottom", "20px");
  $('<span class="login__body__error" id="login-error">Usuario o contraseña incorrectos</span>').insertBefore("#login-entrar");
}

function loginVerify() {
  estado = true;
  var email = $("#login-email").val();
  if (email.length == 0 || email.indexOf("@") == -1 || $("#login-password").val().length == 0) {
    estado = false;
  }
  return estado;
}

async function loginVerifyServer(email, password) {
  if ($("#remember").length && $("#remember").prop("checked")) {
    checked = "true";
  } else {
    checked = "false";
  }

  return new Promise(function (resolve, reject) { //RESOLVER LA PROMISE o RECHAZAR
    $.ajax({
      url: 'php/login.php',
      data: {
        email: email,
        password: password,
        checked: checked
      },
      type: 'GET',
      dataType: 'JSON',
      success: function (json) {
        if (json["igual"] == "TRUE") {
          logueado(json["nombre"], json["imagen"]);
          resolve("TRUE");
        } else {
          resolve("FALSE");
        }
      },
      error: function (jqXHR, status, error) {
        reject(Error("FALSE " + error));
      },
    });
  });
  //Termina return
}

function mostrarPerfil() {


  var texto = '<div id="modal-propio-trasera" class="modal-propio modal-propio__capa-trasera">' +
    '</div>' +
    '<div id="modal-propio" class="modal-propio modal-propio__conteiner">' +
    '<div class="modal-propio__lateral modal-propio__lateral--izquierdo">' +

    '<div class="menu-lateral">' +
    '<div class="menu-lateral__body">' +
    '<ul id="menu-lateral-perfil" class="menu-lateral__body__lista">' +
    '<li class="menu-lateral__body__lista__item menu-lateral__body__lista__item--title">Mi cuenta</li>' +
    '<li class="menu-lateral__body__lista__item menu-lateral__body__lista__item--normal">' +
    '<i class="fa fa-address-card-o" aria-hidden="true"></i> Datos personales' +
    '</li>' +
    '<li class="menu-lateral__body__lista__item menu-lateral__body__lista__item--normal">' +
    '<i class="fa fa-heart-o" aria-hidden="true"></i> Productos deseados' +
    '</li>' +
    '<li class="menu-lateral__body__lista__item menu-lateral__body__lista__item--normal">' +
    '<i class="fa fa-list" aria-hidden="true"></i> Mis productos' +
    '</li>' +
    '<li class="menu-lateral__body__lista__item menu-lateral__body__lista__item--normal">' +
    '<i class="fa fa-comments-o" aria-hidden="true"></i> Chats' +
    '</li>' +
    '<li class="menu-lateral__body__lista__item menu-lateral__body__lista__item--normal">' +
    '<i class="fa fa-handshake-o" aria-hidden="true"></i> Trades realizados' +
    '</li>' +
    '<li class="menu-lateral__body__lista__item menu-lateral__body__lista__item--logout">' +
    '<i class="fa fa-sign-out" aria-hidden="true"></i> Login out' +
    '</li>' +
    '<li class="menu-lateral__body__lista__item menu-lateral__body__lista__item--normal menu-lateral__body__lista__item--salir">' +
    '<i class="fa fa-arrow-left" aria-hidden="true"></i>' +
    '</li>' +
    '</ul>' +
    '</div>' +
    '</div>' +

    '</div>' +
    '<div id="modal-propio-lateral-derecho" class="modal-propio__lateral modal-propio__lateral--derecho">' +
    '</div>' +
    '</div>';

  $("body").append(texto);
  $("body").css("overflow", "hidden");


  $("#menu-lateral-perfil").children()[2].addEventListener("click", crearCarrito);
  $("#menu-lateral-perfil").children()[3].addEventListener("click", misProductos);
  $("#menu-lateral-perfil").children()[4].addEventListener("click", chats);
  // $("#menu-lateral-perfil").children()[5].addEventListener("click", tradesRealizados);
  $("#menu-lateral-perfil").children()[6].addEventListener("click", desloguearse);
  $("#menu-lateral-perfil").children()[7].addEventListener("click", salirPerfil);

};

function crearCarrito() {
  if (!$("#perfil-contenedor-deseos").length) {
    if ($("#modal-propio-lateral-derecho").children().length!=0 ) {
      borrarContenidoCapaDerecha();
    }

    $.ajax({
      url: "php/carrito.php",
      type: 'POST',
      dataType: 'json',
      success: function (json) {
        var texto = '<div id="perfil-contenedor-deseos" class="contenedor-deseos">' +
          '</div>';

        $("#modal-propio-lateral-derecho").append(texto);
        var texto = '<div class="container">' +
          '<table id="cart" class="table table-hover table-condensed">' +
          '<thead>' +
          '<tr class="carrito-header">' +
          '<th style="width:50%;border-top: 0px;border-bottom: 0px">Producto</th>' +
          '<th style="width:10%;border-top: 0px; border-bottom: 0px;">Contacto</th>' +
          '<th style="width:8%;border-top: 0px;border-bottom: 0px">Eliminar</th>' +
          '</tr>' +
          '</thead>' +
          '<tbody id="cuerpoCarritoProductosDeseados">' +
          '</tbody>' +
          '</table>' +
          '</div>';
        $("#perfil-contenedor-deseos").append(texto);
        if (json.length == 0) {
          var texto =
            '<tr>' +
            '<td class="carrito-vacio" COLSPAN="3"><h3>Usted no desea ningún producto</h3></td>' +
            '</tr>';

          $("#cuerpoCarritoProductosDeseados").append(texto);
        }

        json.forEach(n => {
          mostrarCarrito(n.idProducto);
        });
      },
      error: function (jqXHR, status, error) {
        console.log("Fallo en la peticion de deseados");
      }
    });
  }
}

function mostrarCarrito(numero) {
  if (!$("#perfil-contenedor-deseos").length) {
    if ($("#modal-propio-lateral-derecho").children().length!=0 ) {
      borrarContenidoCapaDerecha();
    }
  $.ajax({
    url: "php/productosCarrito.php",
    data: {
      key: numero
    },
    type: 'GET',
    dataType: 'json',
    success: function (json) {

      json.forEach(n => {
        var texto =
          '<tr id=' + n.id + '>' +
          '<td data-th="Product">' +
          '<div class="row">' +
          '<div class="col-sm-2 hidden-xs"><img src="' + n.imagen + '" alt="..." class="img-responsive img-carro"/></div>' +
          '<div class="col-sm-8 td-texto--central">' +
          '<h4 class="nomargin">' + n.nombre + '</h4>' +
          '<p>' + n.descripcion + '</p>' +
          '</div>' +
          '</div>' +
          '</td>' +
          '<td  class="tabla" data-th="Quantity">' +
          '<button id=' + n.id + ' class="btn btn-info btn-sm boton-eliminar">Eliminar</button>' +
          '</td>' +
          '<td><a href="#" class="btn btn-success btn-block">Iniciar conversación  <i class="fa fa-commenting" aria-hidden="true"></i></a></td>' +
          '</tr>';


        $("#cuerpoCarritoProductosDeseados").append(texto);

      });
      $(".tabla").on('click', "button.boton-eliminar", eliminarProducto);

    },
    //Termina success    
    error: function (jqXHR, status, error) {
      console.log("Fallo en la peticion ajax para los productos");
    }

  });
  }

}



function salirPerfil() {
  $("#modal-propio-trasera").remove();
  $("#modal-propio").remove();
  $("body").css("overflow", "inherit");
}

function desloguearse() {
  borrarCookieSiExiste().then(resolve => {
    location.reload();
  });
}

async function borrarCookieSiExiste() {

  return new Promise(function (resolve, reject) {
    $.ajax({
      url: "php/desloguearse.php",
      type: 'POST',
      dataType: 'json',
      success: function (json) {
        resolve("True");
      },
      error: function (jqXHR, status, error) {
        reject(Error("FALSE"));
      }
    });
  });
}



function borrarContenidoCapaDerecha() {
  $("#modal-propio-lateral-derecho").empty();
}