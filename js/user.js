function saludar() {
  alert("hola");
}


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

function loginout(event) {
  if ($(event.target).closest('#window-modal').length == 0 || $(event.target)[0] === $("#login-cancel")[0]) {
    quitarLoginRegister();
    document.removeEventListener("click", event);
    console.log("Clicka fuera");
  } else {
    console.log("Clicka dentro");
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
          id = json["id"];
          logueado(json["nombre"], json["imagen"]);
          resolve("TRUE");
        } else {
          resolve("FALSE");
        }
      },
      error: function (jqXHR, status, error) {
        reject(Error("FALSE"));
      },
    });
  });
  //Termina return
}

function mostrarPerfil() {
 
     
    var texto = '<div class="modal-propio modal-propio__capa-trasera">' +
    '</div>' +
    '<div class="modal-propio modal-propio__conteiner">' +
      '<div class="modal-propio__lateral modal-propio__lateral--izquierdo">' +

        '<div class="menu-lateral">' +          
          '<div class="menu-lateral__body">' +
            '<ul id="menu-lateral-perfil" class="menu-lateral__body__lista">'+
              '<li class="menu-lateral__body__lista__item menu-lateral__body__lista__item--title">Mi cuenta</li>'+
              '<li class="menu-lateral__body__lista__item menu-lateral__body__lista__item--normal">'+
              '<i class="fa fa-address-card-o" aria-hidden="true"></i> Datos personales'+              
              '</li>'+
              '<li class="menu-lateral__body__lista__item menu-lateral__body__lista__item--normal">'+
              '<i class="fa fa-heart-o" aria-hidden="true"></i> Productos deseados'+
              '</li>'+
              '<li class="menu-lateral__body__lista__item menu-lateral__body__lista__item--salir">'+
              '<button class="menu-lateral__body__lista__item__button"><i class="fa fa-sign-out" aria-hidden="true"></i> Login out</button>'+
              '</li>'+
            '</ul>'+
          '</div>' +
        '</div>' +

      '</div>' +
      '<div class="modal-propio__lateral modal-propio__lateral--derecho">' +
      '</div>' +
    '</div>';

  $("body").append(texto);
};