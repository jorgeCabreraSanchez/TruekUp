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
  var texto = '<div id="wrapper" class="toggled">' +
    ' <div class="overlay"></div>' +

    '<!-- Sidebar -->' +
    '<nav class="navbar navbar-inverse navbar-fixed-top" id="sidebar-wrapper" role="navigation">' +
    '<ul class="nav sidebar-nav">' +
    ' <li class="sidebar-brand">' +
    '<a href="#"> Bootstrap 3 </a>' +
    '</li>' +
    '<li>' +
    '<a href="#">' +
    '<i class="fa fa-fw fa-home"></i> Home</a>' +
    '</li>' +
    '<li>' +
    ' <a href="#">' +
    '<i class="fa fa-fw fa-folder"></i> Page one</a>' +
    '</li>' +
    ' <li>' +
    '<a href="#">' +
    '<i class="fa fa-fw fa-file-o"></i> Second page</a>' +
    '</li>' +
    '<li>' +
    '<a href="#">' +
    '<i class="fa fa-fw fa-cog"></i> Third page</a>' +
    '</li>' +
    '<li class="dropdown">' +
    '<a href="#" class="dropdown-toggle" data-toggle="dropdown">' +
    '<i class="fa fa-fw fa-plus"></i> Dropdown' +
    '<span class="caret"></span>' +
    '</a>' +
    '<ul class="dropdown-menu" role="menu">' +
    '<li class="dropdown-header">Dropdown heading</li>' +
    '<li>' +
    '<a href="#">Action</a>' +
    ' </li>' +
    '<li>' +
    '<a href="#">Another action</a>' +
    '</li>' +
    '<li>' +
    '<a href="#">Something else here</a>' +
    '</li>' +
    '<li>' +
    '<a href="#">Separated link</a>' +
    '</li>' +
    '<li>' +
    '<a href="#">One more separated link</a>' +
    '</li>' +
    '</ul>' +
    '</li>' +
    ' <li>' +
    ' <a href="#">' +
    '<i class="fa fa-fw fa-bank"></i> Page four</a>' +
    '</li>' +
    '<li>' +
    '<a href="#">' +
    '<i class="fa fa-fw fa-dropbox"></i> Page 5</a>' +
    '</li>' +
    '<li>' +
    '<a href="#">' +
    '<i class="fa fa-fw fa-twitter"></i> Last page</a>' +
    '</li>' +
    '</ul>' +
    '</nav>' +
    '<!-- /#sidebar-wrapper -->' +

    '<!-- Page Content -->' +
    ' <div id="page-content-wrapper">' +
    '<button type="button" class="hamburger is-closed animated fadeInLeft" data-toggle="offcanvas">' +
    '<span class="hamb-top"></span>' +
    '<span class="hamb-middle"></span>' +
    ' <span class="hamb-bottom"></span>' +
    '</button>' +
    '</div>' +
    '</div>' +
    '<!-- /#page-content-wrapper -->' +

    '</div>';

  $("body").append(texto);

  var trigger = $('.hamburger'),
    overlay = $('.overlay'),
    isClosed = false;

  //   $('[data-toggle="offcanvas"]').click(function () {
  //   $('#wrapper').toggleClass('toggled');
  // });
  
  hamburger_cross();
};

function hamburger_cross() {

  if (isClosed == true) {
    overlay.hide();
    trigger.removeClass('is-open');
    trigger.addClass('is-closed');
    isClosed = false;
  } else {
    overlay.show();
    trigger.removeClass('is-closed');
    trigger.addClass('is-open');
    isClosed = true;
  }
}