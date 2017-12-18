/*! jQuery v3.2.1 | (c) JS Foundation and other contributors | jquery.org/license */
<<<<<<< HEAD
$(document).ready(function () {
=======
subcategoriasImagen = [];
$(document).ready(function () {
  home();
});
//Termina de cargar la página

// patata
function home() {
>>>>>>> jorge
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
<<<<<<< HEAD
        if (first) {
          first = false;
          $('<div class="carousel-item active"><img class="d-block img-fluid" src=' + value.imagen + '></img></div>').appendTo('#carousel');
          $('<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>').appendTo('#indicators');
        } else {
          if (value.imagen != null) {
            $('<div class="carousel-item"><img class="d-block img-fluid" src=' + value.imagen + '></img></div>').appendTo('#carousel');
=======
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
>>>>>>> jorge
            $('<li data-target="#carouselExampleIndicators" data-slide-to="' + contador + '"></li>').appendTo('#indicators');
            contador++;
          }
        }

<<<<<<< HEAD
        $('<li class="list-group-item dropdown__level1__item" id=' + id + '>' + value.categoria + '</li>').appendTo("#main-desplegable-categorias");
        subcategorias[id] = [];
        $.each(value.subcategorias, (index, subcategoria) => {
          subcategorias[id] = value.subcategorias;
        });
      });

=======
        /*Cargo las categorias y me guardo las subcategorias en un Array llamado subcategorias[] 
         con la key de la id de la categoria a la que pertenece. */
        $('<li class="list-group-item dropdown__level1__item" id=' + id + '>' + value.categoria + '</li>').appendTo("#main-desplegable-categorias");
        subcategorias[id] = [];
        i = 1;
        $.each(value.subcategorias, (index, subcategoria) => {
          subcategorias[id] = value.subcategorias;                         
          if (subcategoria.imagen != null && subcategoria.imagen.indexOf(estacion()) != -1 && i <= 3 ) {
            subcategoriasImagen[subcategoria.id] = { 'nombre' : subcategoria.nombre, 'imagen' : subcategoria.imagen };
            i++;            
          }
        });

      });

      //Fin recorrer JSON
      mostrarMiddleContainer();
>>>>>>> jorge
    },

    error: function (jqXHR, status, error) {
      alert('Disculpe, existió un problema trayendo las categorias. Error: ' + error);
    }
  });
<<<<<<< HEAD

  $("#main-browser").on("click", function () {
    if ($("#main-drop").hasClass("mostrar")) {
      $("#main-drop").removeClass("mostrar");
      $("#main-browser").removeClass("browser-extended");
    } else {
      $("#main-drop").addClass("mostrar");
      $("#main-browser").addClass("browser-extended");
=======
  //Acaba petición AJAX

  //Si escribe se autocompleta
  $("#main-browser").on("keyup", function () {
    console.log($(this));
    if ($(this).val() == "") {
      $("#main-desplegable-categorias,#main-desplegable-subcategorias").removeClass("ocultar");
      $("#main-desplegable-productos").removeClass("mostrar");
    } else {
      $("#main-desplegable-categorias,#main-desplegable-subcategorias").addClass("ocultar");
      $("#main-desplegable-productos").addClass("mostrar");
      $.ajax({
        url: 'php/autocompletar.php',
        data: {
          key: $(this).val()
        },
        type: 'POST',
        dataType: 'json',
        success: function (json) {
          $.each(json, (idSubcategoria, value) => {
            $.each(value, (id, value) => {
              $('<li class="list-group-item dropdown__notlevel__item"><a class="dropdown__notlevel__link" href="" id="' + id + '"><img class="dropdown__level2__icon" src="' + value.icono + '" alt="">' + value.nombre + '</a></li>').appendTo("#main-desplegable-subcategorias");
            });
          });
        },
        error: function (jqXHR, status, error) {
          //No digo nada
        }
      });
    }
  });

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
>>>>>>> jorge
      $("#main-desplegable-subcategorias").height($("#main-desplegable-categorias").height());
    }

  });

<<<<<<< HEAD
  $("#button-cancel").on("click",function(){
    $("#main-browser").value("");
  });

  $("#main-desplegable-categorias").on("mouseover", ".dropdown__level1__item", function () {
    $("#main-desplegable-subcategorias").html("");
    $.each(subcategorias[this.id], (id, value) => {
      $('<li class="list-group-item dropdown__level2__item"><a class="dropdown__level2__link" href="" id="c1">' + value.nombre + '</a></li>').appendTo("#main-desplegable-subcategorias");
    })
    if($("#main-desplegable-subcategorias")){
      console.log("Sobresale");
    } else {
      console.log("NO sobresale");
    }
  });


});




function mostrarBodyHome() {
  $(".main-conteiner").html('<div class="row">' +
    '<div class="col-lg-9 main-conteiner-text">' +
    '<span class="main-text">Consigue el material deportivo que necesitas para poder realizar todos los deportes que quieras</span>' +
    '</div>' +
    '  </div>' +
    '<!-- <div class="row"> -->' +



    '<div class="row main-browser-dropdown-conteiner">' +
    
    '<div class="col-lg-12">' +

    '<div class="browser" id="main-browser">' +
    '<i class="fa fa-search browser__icon browser__icon--search" aria-hidden="true"></i>' +
    '<input type="text" class="browser__textfield" id="main-browser" placeholder="¿Que buscas?">' +
    '<button class="browser__button browser__button--search" type="button">Buscar</button>' +
    '<button class="browser__button browser__button--cancel" id="button-cancel" type="button">' +
    '<i class="fa fa-times browser__icon browser__icon--cancel" aria-hidden="true"></i>' +
    '</button>' +
    '</div>' +

    '<div class="main-dropdown" id="main-drop">'+
=======

  $("#button-cancel").on("click", function () {
    $("#main-browser").val("");
  });

  $("#main-desplegable-categorias").on("mouseover", ".dropdown__level1__item", function () {
    $("#main-desplegable-categorias").children(".dropdown__level1__item--marked").removeClass("dropdown__level1__item--marked");
    $(this).addClass("dropdown__level1__item--marked");
    $("#main-desplegable-subcategorias").html("");
    $.each(subcategorias[this.id], (id, value) => {
      $('<li class="list-group-item dropdown__level2__item"><a class="dropdown__level2__link" href="" id="' + id + '"><img class="dropdown__level2__icon" src="' + value.icono + '" alt="">' + value.nombre + '</a></li>').appendTo("#main-desplegable-subcategorias");
    })
  });

}

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
>>>>>>> jorge
    '<div class="card dropdown">' +
    '<ul class="list-group list-group-flush dropdown__level1" id="main-desplegable-categorias">' +
    '<!-- Aqui van las categorias            -->' +
    '</ul>' +
    '<ul class="list-group list-group-flush dropdown__level2" id="main-desplegable-subcategorias">' +
    '<!-- Aqui van las subcategorias                                     -->' +
    '</ul>' +
<<<<<<< HEAD
    '</div>' +
    '</div>'+

    '</div>'+
    '</div>'+

    
    

    
    
  

    '<!-- <div class="row"> -->' +


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
    '<!-- /.row -->');
};
=======
    '<ul class="list-group list-group-flush dropdown__notlevel" id="main-desplegable-productos">' +
    '<!-- Aqui van los productos AUTOCOMPLETAR                              -->' +
    '</ul>' +
    '</div>' +
    '</div>' +

    '</div>' +
    '</div>' +

    '<!-- <div class="row"> -->' +

    '<div id="contenedor-mid" class="container middle-conteiner">' +
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
  $(".middle-conteiner").html('<div class="row row-middle">' +
    '<h1 class="row-middle-title col-lg-12">Deportes de temporada</h1>'+    
    '<div class="col-lg-4 col-md-6 mb-4">' +
    '<div class="card-body">' +
    ' <h4 class="card-title">' +
    ' <a id="titulo1" class="titulo-categoria"href="#"></a>' +
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
    ' <a id="titulo2" href="#"></a>' +
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
    ' <a id="titulo3" href="#"></a>' +
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

   contador = 1;
  console.log(subcategoriasImagen);
  subcategoriasImagen.forEach(url => {    
    nombreEntero = $("#img" + contador).attr("src") + url.imagen;
    $("#img" + contador).attr("src", nombreEntero);    
    $("#titulo" + contador).html(url.nombre);
    contador++;
  });

};

function estacion(){
  var dt = new Date();
  var estacion;
  if (dt.getMonth() + 1 >= 5 && dt.getMonth() + 1 <= 9) {
    estacion = "verano";
  } else {
    estacion = "invierno";
  };
  return estacion;
}

>>>>>>> jorge
