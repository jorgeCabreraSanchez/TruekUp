function prepararMostrarProductos() {
  if ($(this).hasClass("dropdown__level2__link")) {
    php = 'php/productos.php';
    key = $(this)[0].id;
  } else if ($(this).hasClass("dropdown__notlevel__link")) {
    php = 'php/productosPalabraClave.php';
    key = $(this)[0].id;
  } else if ($(this).hasClass("card-title") || $(this).parent().is("#conteiner-imagen-deporte-temporada")) {
    php = 'php/productos.php';
    key = $(this)[0].id;
  } else {
    php = 'php/productosPalabraClave.php';
    key = $("#main-desplegable-productos").children()[0].children[0].id;
  }
  mostrarProductos(key, php);
}

//Cargar productos de las subcategorias
function mostrarProductos(key, php) {

  $.ajax({
    url: php,
    data: {
      key: key
    },
    type: 'GET',
    dataType: 'json',
    success: function (json) {
      $("#contenedor-mid-interior").html("");

      json.forEach(n => {
        $("<div class='col-lg-4 col-md-6 mb-4'>" +
          "<div class='card card-cascade narrower'>" +
          "<div class='view overlay hm-white-slight hm-zoom'>" +
          "<img class='img-fluid-producto supercalifra' src=" + n.imagen + " alt=''>" +
          "<a>" +
          "<div class='mask waves-effect waves-light'></div>" +
          "</a>" +
          "</div>" +
          "<div class='card-body'>" +
          "<h4 id='supercali' class='card-title producto-titulo-centrar'>" +
          "<button class='boton-invisible boton-invisible-producto nombre-boton'>" + n.nombre + "</button>" +
          "</h4>" +
          "<p class='card-text card-text-centrado'>" + n.descripcion + "</p>" +
          "</div>" +
          "<div class='card-footer card-footer-modificado'>" +
          "<big id =" + n.id + "><i class='fa fa-heart' aria-hidden='true'></i></big>" +
          "</div>" +
          "</div>" +
          "</div>").appendTo("#contenedor-mid-interior");
      });
      $(".card").on("click", "div.card-footer", cambiarColor);
      $(".card").on("click", "div.card-footer", guardarProductoDeseado);
      $(".nombre-boton").on("click", event => {
        productosDetallados(event)
      });
      productosDeseados().then(response => {
        response.forEach(n => {
          
          $("#" + n).addClass("estrella-footer");
        });
        
      });


    },
    error: function (jqXHR, status, error) {
      console.log("Fallo en la peticion ajax para los productos");
    }

  });
}

function productosDetallados(event) {
  contador = 0;
  padre = event.target.parentNode.parentNode.parentNode;
  hijo = padre.lastChild.lastChild;
  $.ajax({
    url: 'php/productoDetallado.php',
    data: {
      key: hijo.id
    },
    type: 'GET',
    dataType: 'json',
    success: function (json) {

      $("#contenedor-mid-interior").html("");
      imagenesCarrusel = [];
      var hellooou = "";

      json.forEach(n => {
        for (let i = 0; i < n.imagenes.split(" ").length; i++) {
          imagenesCarrusel.push(n.imagenes.split(" ")[i]);
        }
        for (let i = 0; i < imagenesCarrusel.length; i++) {
          hellooou += "<div class='col-md-2 miniatura' >" +
            "<img class='img-fluid img-miniatura' src='" + imagenesCarrusel[i] + "' alt=''>" +
            "</div>";

        }

        $("<div class='row panel-central'>" +
          "<div class= 'col-md-8 panel-fotos'>" +
          "<div id='foto-grande' class='col-md-8 col-foto'>" +
          "<img id='foto' class='img-fluid imagen-detallada' src=" + n.imagen + " alt=''>" +
          "</div>" +
          "<div id='foto-miniarutas' class=fotos-miniatura>" +
          hellooou +
          "</div>" +
          "</div>" +
          "<div class='col-md-4 descripcion'>" +
          "<div class='showcase-rt-top'>" +
          "<div class='pull-left shoe-name'>" +
          "<h2 class='nombre'>" + n.nombre + "</h2>" +
          "</div>" +
          "<div class='clearfix'></div>" +
          "</div>" +
          "<div class='showcase-last'>" +
          "<h3>Detalles de producto</h3>" +
          "<p>" + n.descripcion + "</p>" +
          "<button class ='boton-invisible boton-invisible-producto' href='#'><img class='icono-back' src='images/iconos/back.ico'></button>" +
          "</div>" +
          "</div>" +
          "</div>").appendTo("#contenedor-mid-interior");
      });
      $(".estrella").on("click", cambiarColor);
      $(".img-miniatura").on("click", event => {
        cambiarImagen(event)
      });
      $(".icono-back").on("click", event => {
        mostrarProductos(key, php);
      });

    },
    error: function (jqXHR, status, error) {

    }

  });

}

function cambiarImagen(event) {
  var srcMiniatura = event.target.src;
  var divPadre = event.target.parentNode.parentNode.parentNode;
  var idHijo = divPadre.firstChild.firstChild.id;
  $("#" + idHijo).attr("src", srcMiniatura);

}

function cambiarColor() {
  
  var id = this.children[0].id;
  if ($("#" + id).hasClass("estrella-footer")) {
    $("#" + id).removeClass("estrella-footer");
  } else {
    $("#" + id).addClass("estrella-footer");
  }
}




function guardarProductoDeseado() {
  idProducto = this.children[0].id;
  if ($("#" + idProducto).hasClass("estrella-footer")) {
    $.ajax({
      url: "php/guardarProductoDeseado.php",
      data: {
        key: idProducto
      },
      type: 'POST'
    });
  } else {
    $.ajax({
      url: "php/borrarProductoDeseado.php",
      data: {
        key: idProducto      
      },
      type: 'POST'
    });
  }
}
listaProductosDeseados = [];
async function productosDeseados() {

  
    return new Promise(function (resolve, reject) {
      $.ajax({
        url: "php/productosDeseados.php",        
        type: 'POST',
        dataType: 'json',
        success: function (json) {

          json.forEach(n => {
            listaProductosDeseados.push(n.idProducto);
          });
          resolve(listaProductosDeseados);
          
        }
      });
      listaProductosDeseados.length=0;
    });  
}

function eliminarProducto() {
  idEliminar = $(this)[0].id;
  console.log(idEliminar);
  $.ajax({
    url: "php/borrarProductoDeseado.php",
    data: {
      key: idEliminar,
    },
    type: 'POST'
  });

  $("#" + idEliminar).remove();
  $("big"+"#" + idEliminar).removeClass("estrella-footer");
    
  if ($("#cuerpoCarritoProductosDeseados").children().length==0) {    
    var texto = '<tr>' +
      '<td class="carrito-vacio" COLSPAN="3"><h3>Usted no desea ningún producto</h3></td>' +
      '</tr>';

    $("#cuerpoCarritoProductosDeseados").append(texto);
  }
}



function misProductos(){
  if (!$("#perfil-contenedor-deseos").length) {
    if ($("#modal-propio-lateral-derecho").children().length!=0 ) {
      borrarContenidoCapaDerecha();
    }

    $.ajax({
      url: "php/misProductos.php",
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
          '<th style="width:10%;border-top: 0px; border-bottom: 0px;">Eliminar</th>' +
          '<th style="width:8%;border-top: 0px;border-bottom: 0px">Alta</th>' +
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
            '<td class="carrito-vacio" COLSPAN="3"><h3>Usted no tiene productos</h3></td>' +
            '</tr>';

          $("#cuerpoCarritoProductosDeseados").append(texto);
        }

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
      },
      error: function (jqXHR, status, error) {
        console.log("Fallo en la peticion de mis productos");
      }
    });
  }
}


