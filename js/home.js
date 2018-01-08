/*! jQuery v3.2.1 | (c) JS Foundation and other contributors | jquery.org/license */
$(document).ready(function () {
  home();
});
//Termina de cargar la página

function home() {
  mostrarNavHome();
  mostrarBodyHome();
  loginVerifyServer(null, null);


  $.ajax({
    url: 'php/categorias.php',
    type: 'GET',
    dataType: 'json',
    success: function (json) {
      first = true;
      contador = 1;
      subcategoriasImagen = [];
      subcategorias = [];
      //Recorro las categorias
      $.each(json, (id, value) => {
        //Cargo el carousel
        if (value.imagen != null) {
          if (first) {
            first = false;
            $('<div class="carousel-item active"><img class="d-block img-fluid" src=' + value.imagen + '></img><div class="carousel-text carousel-caption d-none d-md-block">' +
              '<h1>Amplia tus horizontes</h1>' +
              '</div></div>').appendTo('#carousel');
            $('<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>').appendTo('#indicators');
          } else {
            $('<div class="carousel-item"><img class="d-block img-fluid" src=' + value.imagen + '></img><div class="carousel-text carousel-caption d-none d-md-block">' +
              '<h1>Amplia tus horizontes</h1>' +
              '</div></div>').appendTo('#carousel');
            $('<li data-target="#carouselExampleIndicators" data-slide-to="' + contador + '"></li>').appendTo('#indicators');
            contador++;
          }
        }

        /*Cargo las categorias y me guardo las subcategorias en un Array llamado subcategorias[] 
         con la key de la id de la categoria a la que pertenece. */
        $('<li class="list-group-item dropdown__level1__item" id=' + id + '><img src=' + value.icono + '>' + "  " + value.categoria + '</li>').appendTo("#main-desplegable-categorias");
        subcategorias[id] = [];
        i = 1;
        //Recorro las subCategorias
        $.each(value.subcategorias, (index, subcategoria) => {
          subcategorias[id] = value.subcategorias;
          if (subcategoria.imagen != null && subcategoria.imagen.startsWith(estacion()) && i <= 3) {
            subcategoriasImagen[subcategoria.id] = {
              'id':subcategoria.id,
              'nombre': subcategoria.nombre,
              'imagen': subcategoria.imagen
            };
            console.log(subcategoriasImagen[subcategoria.id]);
            i++;
          }
        });

      });

      //Fin recorrer JSON
      mostrarMiddleContainer();
    },

    error: function (jqXHR, status, error) {
      alert('Disculpe, existió un problema trayendo las categorias. Error: ' + error);
    }
  });
  //Acaba petición AJAX

  //Si escribe se autocompleta
  $("#main-browser").on("keyup", function (event) {
    if ($(this).val() == "") {
      $("#main-desplegable-categorias,#main-desplegable-subcategorias").removeClass("ocultar");
      $("#main-desplegable-productos").removeClass("mostrar");
      $("#main-desplegable-productos").children().remove();
      anterior = undefined;
    } else {
      if (event.which == 13) {
        //Se muestran los productos relacionados con lo introducido
      } else {
        if (!$("#main-desplegable-productos").hasClass("mostrar")) {
          $("#main-desplegable-subcategorias").height($("#main-desplegable-categorias").height());
          $("#main-desplegable-categorias,#main-desplegable-subcategorias").addClass("ocultar");
          $("#main-desplegable-productos").addClass("mostrar");
          anterior = undefined;
        }

        if (event.which == 9) {
          $(this).val() = palabrasClaveAmpliado[0];
        }


        if ($(this).val().length == 1 && typeof anterior === 'undefined') {
          $.ajax({
            url: 'php/autocompletar.php',
            data: {
              key: $(this).val()
            },
            type: 'GET',
            dataType: 'json',
            success: function (json) {
              $("#main-desplegable-productos").children().remove();
              palabrasClave = [];
              $.each(json, (index, value) => {
                palabrasClave.push({
                  "id": value.id,
                  "palabra": value.palabra
                });
                añadirPalabraclave(value);
              });
              console.log(palabrasClave);
              if (palabrasClave.length == 0) {
                value = {
                  id: 0,
                  palabra: "No se ha obtenido ningún resultado para tu búsqueda"
                };
                añadirPalabraclave(value);
              }
            },
            error: function (jqXHR, status, error) {
              //No digo nada
            }
          });
          //Acaba peticion Ajax       
        } else {

          $("#main-desplegable-productos").children().remove();
          if (event.which != 8 && $(this).val().length != 2) {
            lista = palabrasClaveAmpliado;
          } else {
            lista = palabrasClave;
          }

          palabrasClaveAmpliado = lista.filter(n => {
            return ~n.palabra.toLowerCase().indexOf($(this).val().toLowerCase());
          });
          
          if (palabrasClaveAmpliado.length == 0) {
            value = {
              id: 0,
              palabra: "No se ha encontrado ninguna palabra"
            };
            añadirPalabraclave(value);
          } else {
            $.each(palabrasClaveAmpliado, (index, value) => {
              añadirPalabraclave(value);
            });
          }
          

        }
        anterior = $(this).val();
      }
      //Acabe tecla normal
    }
    //Acaba no esta vacio
  });
  //Acaba autocompletar

  //Mostrar la capa de categorias
  $("#main-browser,#browser-icon").on("click", function () {
    //Crear capa solo para el textfield --> Tamaño pequeño
    if ($(window).width() < 575) {
      if (!$("#navbar,#contenedor,#footer").hasClass("ocultar")) {
        $("<div class='main-browser-min' id='main-browser-min'><span class='contenedor-boton-invisible' id='contenedor-boton-invisible'><button type='button' class='boton-invisible'><i class='fa fa-times boton-invisible__icon' aria-hidden='true'></i></button></span></div>").append($("#main-browser-dropdown-conteiner")).appendTo("body");
        $("#navbar,#contenedor,#footer").addClass("ocultar");
        $("#main-browser-dropdown-conteiner").addClass("main-browser-dropdown-conteiner-mini");
        //La x del texfield en tamaño pequeño
        $("#contenedor-boton-invisible").on("click", function () {
          quitarMainBrowserMin();
        });
        $("#main-browser").focus();
      }
    }

    if ($("#main-drop").hasClass("mostrar")) {
      $("#main-drop").removeClass("mostrar");
      $("#main-browser-conteiner").removeClass("browser-extended");
      $("#main-desplegable-categorias").children(".dropdown__level1__item--marked").removeClass("dropdown__level1__item--marked");
      $("#main-desplegable-subcategorias").children().remove();
    } else {
      $("#main-drop").addClass("mostrar");
      $("#main-browser-conteiner").addClass("browser-extended");
      $("#main-desplegable-subcategorias").height($("#main-desplegable-categorias").height());
    }

  });


  $("#button-cancel").on("click", function () {
    $("#main-browser").val("");
  });

  $("#main-desplegable-categorias").on("mouseover", ".dropdown__level1__item", function () {
    $("#main-desplegable-categorias").children(".dropdown__level1__item--marked").removeClass("dropdown__level1__item--marked");
    $(this).addClass("dropdown__level1__item--marked");
    $("#main-desplegable-subcategorias").html("");
    $.each(subcategorias[this.id], (id, value) => {
      $('<li class="list-group-item dropdown__level2__item"><button  type="button" class="dropdown__level2__link boton-invisible" href="" id="' + id + '"><img class="dropdown__level2__icon" src="' + value.icono + '" alt="">' + value.nombre + '</button></li>').appendTo("#main-desplegable-subcategorias");
    })
  });


  $("#login").on("click", (event) => {
    $("body").addClass("modal-open");
    $("#navbar").addClass("navbar-modal-open");
    ventanaModal = '<div class="modal fade window-modal" id="miModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
      '<div class="modal-dialog window-dialog" role="document">' +
      '<div class="modal-content login" id="window-modal">' +
      '<div class="modal-header login__header">' +
      '<button type="button" class="boton-invisible login__header__cancel">' +
      '<i class="fa fa-times" aria-hidden="true"></i>' +
      '</button>' +
      '<h3 class="modal-title login__header__title">Log in</h3>' +
      '</div>' +
      '<div class="modal-body login__body">' +
      '<input type="email" id="login-email" class="login__body__input login__body__input--email" placeholder="correo@ejemplo.com">' +
      '<input type="password" maxlength="20" id="login-password" class="login__body__input login__body__input--password" placeholder="Contraseña">' +
      '<div class="login__body__remember"><input type="checkbox" id="remember" class="login__body__checkbox" value="Entrar"><label for="remember" class="login__body__checkbox__text">Recordarme</label></div>' +
      '<input type="button" id="login-entrar" class="login__body__entrar" value="Entrar">' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<!-- Termina Div -->' +
      '<div id="modal-backdrop" class="modal-backdrop fade show"></div>';

    $("body").append(ventanaModal);

    $("#login-entrar").on("click", login);

    // $(document).on("click", loginout);


  });
    
  $("#main-desplegable-subcategorias").on("click", ".dropdown__level2__link", mostrarProductos);

}
//Acaba el HOME --> ready del home /////////////////
//////////////////////////////////////
/////////////////////////


function mostrarNavHome() {
  nav = '<div class="container nav-container">' +
    '<img class="navbar-brand navbar-logo" src="images/logoPequeno.png">' +

    '<!-- Boton Collapse -->' +

    '<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive"' +
    'aria-expanded="false" aria-label="Toggle navigation">' +
    '<span class="navbar-toggler-icon"></span>' +
    '</button>' +

    ' <!-- Menu Principal -->   ' +
    ' <div class="collapse navbar-collapse nav-main-collapse" id="navbarResponsive">' +
    '<ul class="navbar-nav navbar-list ml-auto" id="navbar-list">' +
    '<li class="navbar-list__item active navbar-list__item--highlighted">' +
    '<button class="nav-link boton-invisible" id="home">Home</button>' +
    '</li>' +
    '<li class="navbar-list__item  navbar-list__item--highlighted">' +
    '<button class="nav-link boton-invisible" id="login">Entrar</button>' +
    '</li>' +
    '<li class="navbar-list__item navbar-list__item--highlighted">' +
    '<button class="boton-invisible nav-link" href="">Registrarse</button>' +
    '</li>' +
    '</ul>' +
    '</div>' +


    '</div>';
  $("#navbar").append(nav);
};


function mostrarBodyHome() {
  $(".main-conteiner").html('<div class="row">' +

    '<div class="col-lg-12 col-carousel">' +

    '<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">' +
    '<ol class="carousel-indicators" id="indicators">' +
    '<!-- Para pasar las fotos -->' +
    '</ol>' +
    '<div class="carousel-inner" id="carousel">' +
    '<!-- Aquí van las fotos del carousel -->' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<!-- /.col-lg-9 -->' +

    '</div>' +
    '<!-- /.row -->' +



    '<div class="row main-browser-dropdown-conteiner" id="main-browser-dropdown-conteiner">' +

    '<div class="col-lg-12">' +

    '<div class="browser" id="main-browser-conteiner">' +
    '<i class="fa fa-search browser__icon browser__icon--search" id="browser-icon" aria-hidden="true"></i>' +
    '<input type="text" class="browser__textfield" id="main-browser" placeholder="¿Que buscas?">' +
    '<button class="browser__button browser__button--search" type="button">Buscar</button>' +
    '<div class="browser__button--cancel">' +
    '<button type="button" id="button-cancel" class="boton-invisible"><i class="fa fa-times boton-invisible__icon" aria-hidden="true"></i></button>' +
    '</div>' +
    // '<button class="browser__button browser__button--"  type="button">' +
    // '<i class="fa fa-times browser__icon browser__icon--" aria-hidden="true"></i>' +
    // '</button>' +
    '</div>' +

    '<div class="main-dropdown" id="main-drop">' +
    '<div class="card dropdown">' +
    '<ul class="list-group list-group-flush dropdown__level1" id="main-desplegable-categorias">' +
    '<!-- Aqui van las categorias            -->' +
    '</ul>' +
    '<ul class="list-group list-group-flush dropdown__level2" id="main-desplegable-subcategorias">' +
    '<!-- Aqui van las subcategorias                                     -->' +
    '</ul>' +
    '<ul class="list-group list-group-flush dropdown__notlevel" id="main-desplegable-productos">' +
    '<!-- Aqui van los productos AUTOCOMPLETAR                              -->' +
    '</ul>' +
    '</div>' +
    '</div>' +

    '</div>' +
    '</div>' +

    '<!-- <div class="row"> -->' +

    '<div id="contenedor-mid" class="container middle-conteiner">' +
    '<div class="row row-middle" id="contenedor-mid-interior">' +

    '<h1 class="row-middle-title col-lg-12">Deportes de temporada</h1>' +

    // '<div class="col-lg-4 col-md-6 mb-4">' +
    // '<div class="card-body">' +
    // ' <h4 class="card-title">' +
    // ' <a id="titulo1" class="titulo-categoria"href="#"></a>' +
    // '</div>' +
    // ' <div class="card h-80">' +
    // '<a id="imagen-cat href="#">' +
    // '<img id="img1" class="card-img-top" src="./images/middle/" alt="">' +
    // '</a>' +
    // '</div>' +
    // '</div>' +

    // '<div class="col-lg-4 col-md-6 mb-4">' +
    // '<div class="card-body">' +
    // ' <h4 class="card-title">' +
    // ' <a id="titulo2" href="#"></a>' +
    // '</div>' +
    // ' <div class="card h-80">' +
    // '<a href="#">' +
    // '<img id="img2" class="card-img-top" src="./images/middle/" alt="">' +
    // '</a>' +
    // '</div>' +
    // '</div>' +

    // '<div class="col-lg-4 col-md-6 mb-4">' +
    // '<div class="card-body">' +
    // ' <h4 class="card-title">' +
    // ' <a id="titulo3" href="#"></a>' +
    // '</div>' +
    // ' <div class="card h-80">' +
    // '<a href="#">' +
    // '<img id="img3" class="card-img-top" src="./images/middle/" alt="">' +
    // '</a>' +
    // '</div>' +
    // '</div>' +
    '</div>' +
    '</div>' +
    '</div>');


    
};

function quitarMainBrowserMin() {
  $("#navbar,#contenedor,#footer").removeClass("ocultar");
  $("#main-browser-dropdown-conteiner").removeClass("main-browser-dropdown-conteiner-mini");
  $("#main-browser-dropdown-conteiner").insertBefore($("#contenedor").children("div")[1]);
  $("#main-browser-min").remove();
  $("#main-drop").removeClass("mostrar");
  $("#main-browser").val("");
}

function mostrarMiddleContainer() {
  // contador = 1;
  // subcategoriasImagen.forEach(url => {

  //   nombreEntero = $("#img" + contador).attr("src") + url.imagen;
  //   $("#img" + contador).attr("src", nombreEntero);
  //   $("#titulo" + contador).html(url.nombre);
  //   contador++;
  // });
  subcategoriasImagen.forEach(url=>{
    $("<div class='col-lg-4 col-md-6 mb-4'>" +
    "<div class='card-body'>" +
    " <h4 class='card-title'>" +
    " <a id="+url.id+" href='#'>"+url.nombre+"</a>" +
    "</div>" +
    "<div class='card h-80'>" +
    "<a href='#'>" +
    "<img id="+url.id+" class='card-img-top' src="+'images/middle/'+url.imagen+" alt=''>" +
    "</a>" +
    "</div>" +
    "</div>").appendTo("#contenedor-mid-interior");
  });
  $(".card-title").on("click", mostrarProductos);
  $(".card-img-top").on("click",mostrarProductos);

};

function estacion() {
  var dt = new Date();
  var estacion;
  if (dt.getMonth() + 1 >= 5 && dt.getMonth() + 1 <= 9) {
    estacion = "verano";
  } else {
    estacion = "invierno";
  };
  return estacion;
};


function login() {
  if ($("#login-error").length) {
    // Si existe       
    $("#login-error").remove();
    $(".login__body").css("grid-template-rows", "repeat(2, 1fr) 10% 1fr");
    $(".login__body").css("grid-template-areas", "'email' 'password' 'rembember' 'entrar'");
    $(".login__body__remember").css("margin-bottom", "13px");
  }
  if (loginVerify()) {
    console.log("Respuesta: " + loginVerifyServer($("#login-email").val(), SHA1($("#login-password").val())));
    if (loginVerifyServer($("#login-email").val(), SHA1($("#login-password").val())) == "TRUE") {
      console.log("Bien");
      // quitarLogin();      
    } else {
      console.log("mal");
      loginBad();
    }
    //Acaba peticion AJAX
  } else {
    loginBad();
  }
}

// function loginout() {
//     console.log(this.target);
//     console.log("Dentro");
//     if ($(event.target).closest('#window-modal').length == 0) {
//       console.log("Clicka fuera");        
//       quitarLogin();        
//     } else {
//       console.log("Clicka dentro");
//     }
// }

// function quitarLogin() {
//   $("#miModal").remove();
//   $("#modal-backdrop").remove();
//   $("body").removeClass("modal-open");
//   $("#navbar").removeClass("navbar-modal-open");
//   // document.removeEventListener("click", event);
// }

function logueado(nombre, imagen) {
  while ($("#navbar-list").children().length != 1) {
    $("#navbar-list").children()[1].remove();
  }

  img = imagen.split(".")[0] + "-35x30." + imagen.split(".")[1];

  $("<li class='navbar-list__item navbar-list__item--perfil navbar-list__item--highlighted' id='perfil'>" +
    "<button class='nav-link nav-link--movement boton-invisible'>" +
    "<span>" + nombre + "</span>" + "  <img class='navbar-list__item__imagen' src='images/usuarios/" + img + "'></img></button>" +
    "</li>").appendTo($("#navbar-list"));
}

// pointer-events con el valor “none”

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

function añadirPalabraclave(value) {
  $('<li class="list-group-item dropdown__notlevel__item"><a class="dropdown__notlevel__link" href="" id="' + value.id + '">' + value.palabra + '</a></li>').appendTo("#main-desplegable-productos");
}

function loginVerifyServer(email, password) {
  if ($("#remember").length && $("#remember").prop("checked")) {
    checked = "true";
  } else {
    checked = "false";
  }

  devolver = "FALSE";
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
      entra = true;
      console.log(json);
      if (json["igual"] == "TRUE") {
        devolver = "TRUE";
        id = json["id"];
        logueado(json["nombre"], json["imagen"]);
        console.log("Dentro de  la funcion: " + devolver);
      }
    },
    error: function (jqXHR, status, error) {
      console.log("Ocurrio un error al traer el usuario");
    },
  });

  console.log("Fuera de la funcion AJAX: " + devolver);
  return devolver;
}

//Cargar productos de las subcategorias
function mostrarProductos() {
  contador = 0;
  $.ajax({
    url: 'php/productos.php',
    data: {
      key: $(this)[0].id
    },
    type: 'GET',
    dataType: 'json',
    success: function (json) {
      $("#contenedor-mid-interior").html("");

      json.forEach(n => {
        $("<div class='col-lg-4 col-md-6 mb-4'>" +
          "<div class='card h-100'>" +
          "<a href='#'><img class='card-img-top' src=" + n.imagen + " alt=''></a>" +
          "<div class='card-body'>" +
          "<h4 class='card-title'>" +
          "<a href='#'>" + n.nombre + "</a>" +
          "</h4>" +
          "<h5>$24.99</h5>" +
          "<p class='card-text'>" + n.descripcion + "</p>" +
          "</div>" +
          "<div class='card-footer'>" +
          "<big id =" + n.id + "><i class='fa fa-star' aria-hidden='true'></i></big>" +
          "</div>" +
          "</div>" +
          "</div>").appendTo("#contenedor-mid-interior");

      });
      $(".card").on("click", "div.card-footer", cambiarColor);

    },
    error: function (jqXHR, status, error) {

    }

  });

}


function cambiarColor() {
  var id = this.children[0].id;
  if ($("#" + id).hasClass("estrella-footer")) {
    $("#" + id).removeClass("estrella-footer");
  } else {
    $("#" + id).addClass("estrella-footer");
  }
}