/*! jQuery v3.2.1 | (c) JS Foundation and other contributors | jquery.org/license */
$(document).ready(function () {
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
        if (first) {
          first = false;
          $('<div class="carousel-item active"><img class="d-block img-fluid" src=' + value.imagen + '></img></div>').appendTo('#carousel');
          $('<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>').appendTo('#indicators');
        } else {
          if (value.imagen != null) {
            $('<div class="carousel-item"><img class="d-block img-fluid" src=' + value.imagen + '></img></div>').appendTo('#carousel');
            $('<li data-target="#carouselExampleIndicators" data-slide-to="' + contador + '"></li>').appendTo('#indicators');
            contador++;
          }
        }

        $('<li class="list-group-item dropdown__level1__item" id=' + id + '>' + value.categoria + '</li>').appendTo("#main-desplegable-categorias");
        subcategorias[id] = [];
        $.each(value.subcategorias, (index, subcategoria) => {
          subcategorias[id] = value.subcategorias;
        });
      });

    },

    error: function (jqXHR, status, error) {
      alert('Disculpe, existió un problema trayendo las categorias. Error: ' + error);
    }
  });

  $("#main-browser").on("click", function () {
    if ($("#main-drop").hasClass("mostrar")) {
      $("#main-drop").removeClass("mostrar");
      $("#main-browser").removeClass("browser-extended");
    } else {
      $("#main-drop").addClass("mostrar");
      $("#main-browser").addClass("browser-extended");
      $("#main-desplegable-subcategorias").height($("#main-desplegable-categorias").height());
    }

  });

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
    '<div class="card dropdown">' +
    '<ul class="list-group list-group-flush dropdown__level1" id="main-desplegable-categorias">' +
    '<!-- Aqui van las categorias            -->' +
    '</ul>' +
    '<ul class="list-group list-group-flush dropdown__level2" id="main-desplegable-subcategorias">' +
    '<!-- Aqui van las subcategorias                                     -->' +
    '</ul>' +
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