/*! jQuery v3.2.1 | (c) JS Foundation and other contributors | jquery.org/license */
subcategoriasImagen = [];
$(document).ready(function () {
  home();
});
//Termina de cargar la página

// patata
function home() {
  mostrarBodyHome();

  $.ajax({
    url: 'php/categorias.php',
    type: 'GET',
    dataType: 'json',
    success: function (json) {
      first = true;
      contador = 1;
      subcategorias = [];
      $.each(json, (id, value) => {
        //Cargo el carousel
        if (value.imagen != null) {
          if (first) {
            first = false;
            $('<div class="carousel-item active"><img class="d-block img-fluid" src=' + value.imagen + '></img></div>').appendTo('#carousel');
            $('<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>').appendTo('#indicators');
          } else {
            $('<div class="carousel-item"><img class="d-block img-fluid" src=' + value.imagen + '></img></div>').appendTo('#carousel');
            $('<li data-target="#carouselExampleIndicators" data-slide-to="' + contador + '"></li>').appendTo('#indicators');
            contador++;
          }
        }

        /*Cargo las categorias y me guardo las subcategorias en un Array llamado subcategorias[] 
         con la key de la id de la categoria a la que pertenece. */
        $('<li class="list-group-item dropdown__level1__item" id=' + id + '>' + value.categoria + '</li>').appendTo("#main-desplegable-categorias");
        subcategorias[id] = [];
        $.each(value.subcategorias, (index, subcategoria) => {
          subcategorias[id] = value.subcategorias;
          if (subcategoria.imagen != null) {
            subcategoriasImagen.push(subcategoria.imagen);            
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

  //Mostrar la capa de categorias
  $("#main-browser,#browser-icon").on("click", function () {

    //Crear capa solo para el textfield --> Tamaño pequeño
    if ($(window).width() < 575) {
      if (!$("#navbar,#contenedor,#footer").hasClass("ocultar")) {
        $("<div class='main-browser-min' id='main-browser-min'><span class='contenedor-boton-invisible'><button type='button' class='boton-invisible'><i class='fa fa-times boton-invisible__icon' aria-hidden='true'></i></button></span></div>").append($("#main-browser-dropdown-conteiner")).appendTo("body");
        $("#navbar,#contenedor,#footer").addClass("ocultar");
        $("#main-browser-dropdown-conteiner").addClass("main-browser-dropdown-conteiner-mini");
        //La x del texfield en tamaño pequeño
        $("#main-browser-min").on("click", function () {
          quitarMainBrowserMin();
        });
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
      $('<li class="list-group-item dropdown__level2__item"><a class="dropdown__level2__link" href="" id="' + id + '"><img class="dropdown__level2__icon" src="'+value.icono+'" alt="">'  + value.nombre + '</a></li>').appendTo("#main-desplegable-subcategorias");
    })
  });


<<<<<<< HEAD
  // $("#main-desplegable-categorias").on("mouseout", ".dropdown__level1__item", function () {
  //   $(this).removeClass("dropdown__level1__item--marked");    
  // });

=======
>>>>>>> 209758c57d437db53090eaad6d51bf2ee10892ec
}

function mostrarBodyHome() {
  $(".main-conteiner").html('<div class="row">' +
    '<div class="col-lg-9 main-conteiner-text">' +
    '<span class="main-text">Amplia tus horizontes</span>' +
    '</div>' +
    '  </div>' +
    '<!-- <div class="row"> -->' +



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
    '</div>' +
    '</div>' +

    '</div>' +
    '</div>' +

    '<!-- <div class="row"> -->' +

    '<div class="row">' +

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

    '<div id="contenedor-mid" class="container middle-conteiner">' +
    '</div>');
};

function quitarMainBrowserMin() {
  $("#navbar,#contenedor,#footer").removeClass("ocultar");
  $("#main-browser-dropdown-conteiner").removeClass("main-browser-dropdown-conteiner-mini");
  $("#main-browser-dropdown-conteiner").insertBefore($("#contenedor").children("div")[1]);
  $("#main-browser-min").remove();
  if ($("#main-drop").hasClass("mostrar")) {
    $("#main-drop").removeClass("mostrar");
  }
}

function mostrarMiddleContainer() {
  $(".middle-conteiner").html('<div class="row row-middle">' +

    '<div class="col-lg-4 col-md-6 mb-4">' +
    '<div class="card-body">' +
    ' <h4 class="card-title">' +
    ' <a class="titulo-categoria"href="#">Running</a>' +
    '</div>' +
    ' <div class="card h-80">' +
    '<a id="imagen-cat href="#">' +
    '<img id="img1" class="card-img-top" src="./images/middle/" alt="">' +
    '</a>' +
    // '<div class="card-body">' +
    // '<p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!</p>' +
    // '  </div>' +
    '</div>' +
    ' </div>' +

    '<div class="col-lg-4 col-md-6 mb-4">' +
    '<div class="card-body">' +
    ' <h4 class="card-title">' +
    ' <a href="#">Acuaticos</a>' +
    '</div>' +
    ' <div class="card h-80">' +
    '<a href="#">' +
    '<img id="img2" class="card-img-top" src="./images/middle/" alt="">' +
    '</a>' +
    // '<div class="card-body">' +
    // '<p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!</p>' +
    // '  </div>' +
    '</div>' +
    ' </div>' +

    '<div class="col-lg-4 col-md-6 mb-4">' +
    '<div class="card-body">' +
    ' <h4 class="card-title">' +
    ' <a href="#">Montaña</a>' +
    '</div>' +
    ' <div class="card h-80">' +
    '<a href="#">' +
    '<img id="img3" class="card-img-top" src="./images/middle/" alt="">' +
    '</a>' +
    // '<div class="card-body">' +
    // '<p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!</p>' +
    // '  </div>' +
    '</div>' +
    ' </div>');

  //Guardamos el mes actual en una variable
  var dt = new Date();
  if (dt.getMonth() + 1 >= 5 && dt.getMonth() + 1 <= 9) {
    estacion = "verano";
  } else {
    estacion = "invierno";    
  };

  contador = 1; 
  subcategoriasImagen.forEach(url => {
    
      nombreEntero = $("#img" + contador).attr("src") + estacion +"/"+  url.split("/")[1];
      $("#img" + contador).attr("src", nombreEntero);            
      contador++;
    
  });

};