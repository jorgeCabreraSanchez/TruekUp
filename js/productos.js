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
          "<img class='img-fluid-producto' src=" + n.imagen + " alt=''>" +
          "<a>" +
          "<div class='supercalifra mask waves-effect waves-light'></div>" +
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
      $(".supercalifra").on("click", event => {
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
  if (event.target.className == "nomargin" || event.target.className == "img-responsive img-carro div-volver") {
    php = "php/misProductos.php";
    padre = event.target.parentNode.parentNode.parentNode.parentNode;
    hijo = padre.lastChild.lastChild;
  } else if (event.target.className == "nomargin volver-carrito" || event.target.className == "img-responsive img-carro volver-carrito") {
    php = "php/productosCarrito.php";
    padre = event.target.parentNode.parentNode.parentNode.parentNode;
    hijo = padre.firstChild.nextSibling.firstChild;
  }else{
    padre = event.target.parentNode.parentNode.parentNode;
    hijo = padre.lastChild.lastChild;
  }
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
      var carrusel = "";

      json.forEach(n => {
        for (let i = 0; i < n.imagenes.split(" ").length; i++) {
          imagenesCarrusel.push(n.imagenes.split(" ")[i]);
        }
        for (let i = 0; i < imagenesCarrusel.length; i++) {
          if (i == 0) {
            carrusel += '                   <div class="carousel-item active carrusel-activo">  ' +
              '                       <img class="d-block col-4 img-fluid imagen-carrusel" src="' + imagenesCarrusel[i] + '">  ' +
              '                   </div>  ';
          } else {
            carrusel += '                   <div class="carousel-item carrusel-activo">  ' +
              '                       <img class="d-block col-4 img-fluid imagen-carrusel" src="' + imagenesCarrusel[i] + '">  ' +
              '                   </div>  ';
          }


        }

        $("<div class='row panel-central'>" +
          "<div class= 'col-md-8 panel-fotos'>" +
          "<div id='foto-grande' class='col-md-8 col-foto'>" +
          "<img id='foto' class='img-fluid imagen-detallada' src=" + n.imagen + " alt=''>" +
          "</div>" +

          '   <div class="container text-center my-3 container-carrusel">  ' +
          '       <div class="row mx-auto my-auto subcontainer-carrusel">  ' +
          '           <div id="recipeCarousel" class="carousel slide w-100" data-ride="carousel">  ' +
          '               <div class="carousel-inner carrusel-items" role="listbox">  ' +
          carrusel +
          '               </div>  ' +
          '               <a class="carousel-control-prev" href="#recipeCarousel" role="button" data-slide="prev">  ' +
          '                   <span class="carousel-control-prev-icon" aria-hidden="true"></span>  ' +
          '                   <span class="sr-only">Previous</span>  ' +
          '               </a>  ' +
          '               <a class="carousel-control-next" href="#recipeCarousel" role="button" data-slide="next">  ' +
          '                   <span class="carousel-control-next-icon" aria-hidden="true"></span>  ' +
          '                   <span class="sr-only">Next</span>  ' +
          '               </a>  ' +
          '           </div>  ' +
          '       </div>  ' +
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
          "<button class ='icono-volver boton-invisible boton-invisible-producto' href='#'><img class='icono-back' src='images/iconos/back.ico'></button>" +
          "</div>" +
          "</div>" +
          "</div>").appendTo("#contenedor-mid-interior");
      });
      $(".estrella").on("click", cambiarColor);
      $(".carousel-item").on("click","img.imagen-carrusel", event => {
        cambiarImagen(event)
      });
      $(".icono-volver").on("click", event => {
        volver(key, php);
      });
      prepararCarrusel();

    },
    error: function (jqXHR, status, error) {

    }

  });

}

function volver(key, php) {
  if (key == "modal" && php == "php/misProductos.php") {
    mostrarPerfil();
    misProductos();
  } else if (key == "modal-carrito" && php == "php/productosCarrito.php") {
    mostrarPerfil();
    crearCarrito();
} else {
    mostrarProductos(key, php);
    
  }
  
}

function prepararCarrusel() {
  $('#recipeCarousel').carousel({
    interval: 10000
  })

  $('.carousel .carousel-item').each(function () {
    var next = $(this).next();
    if (!next.length) {
      next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));

    if (next.next().length > 0) {
      next.next().children(':first-child').clone().appendTo($(this));
    }
    else {
      $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
    }
  });
}

function cambiarImagen(event) {
  var srcMiniatura = event.target.src;
  var divPadre = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
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
    listaProductosDeseados.length = 0;
  });
}

function eliminarProducto() {
  idEliminar = $(this)[0].id;
  var borrarProducto = this.parentNode.parentNode;
  $.ajax({
    url: "php/borrarProductoDeseado.php",
    data: {
      key: idEliminar,
    },
    type: 'POST'
  });

  $(borrarProducto).remove();
  $("big" + "#" + idEliminar).removeClass("estrella-footer");

  if ($("#cuerpoCarritoProductosDeseados").children().length == 0) {
    var texto = '<tr>' +
      '<td class="carrito-vacio" COLSPAN="3"><h3>Usted no desea ningún producto</h3></td>' +
      '</tr>';

    $("#cuerpoCarritoProductosDeseados").append(texto);
  }
}

function misProductos() {
  if (!$("#perfil-contenedor-misproductos").length) {
    if ($("#modal-propio-lateral-derecho").children().length != 0) {
      borrarContenidoCapaDerecha();
    }

    $.ajax({
      url: "php/misProductos.php",
      type: 'POST',
      dataType: 'json',
      success: function (json) {
        var texto = '<div id="perfil-contenedor-misproductos" class="contenedor-deseos">' +
          '</div>';

        $("#modal-propio-lateral-derecho").append(texto);
        var texto = '<div class="container">' +
          '<table id="cart" class="table table-hover table-condensed">' +
          '<thead>' +
          '<tr class="carrito-header">' +
          '<th style="width:50%;border-top: 0px;border-bottom: 0px">Producto</th>' +
          '<th style="width:10%;border-top: 0px; border-bottom: 0px;">Eliminar</th>' +
          '<th style="width:8%;border-top: 0px;border-bottom: 0px">Visible</th>' +
          '</tr>' +
          '</thead>' +
          '<tbody id="cuerpoCarritoMisProductos">' +
          '</tbody>' +
          '</table>' +
          '</div>';
        $("#perfil-contenedor-misproductos").append(texto);
        if (json.length == 0) {
          var texto =
            '<tr>' +
            '<td class="carrito-vacio" COLSPAN="3"><h3>Usted no tiene productos</h3></td>' +
            '</tr>';

          $("#cuerpoCarritoMisProductos").append(texto);
        }

        json.forEach(n => {
          var texto =
            '<tr>' +
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
            '<button class="btn btn-info btn-sm boton-eliminar">Eliminar</button>' +
            '</td>' +
            '<td><big id='+ n.id +' class="boton-visible"><i class="fa fa-eye" aria-hidden="true"></i></big></td>' +
            '</tr>';


          $("#cuerpoCarritoMisProductos").append(texto);
        });
        $("td").on('click', "button.boton-eliminar", eliminarMiProducto);
        $("big").on("click", "i.fa-eye", cambiarVisible);
        comprobarMisproductos();

      },
      error: function (jqXHR, status, error) {
        console.log("Fallo en la peticion de mis productos");
      }
    });
  }
}

function cambiarVisible() {
  var id = this.parentNode.id;
  console.log(id);
  if ($("#" + id).hasClass("boton-color")) {
    
    $("#" + id).removeClass("boton-color");
    $.ajax({
      url: "php/cambiarVisible.php",
      data: {
        key: id,
        key1: "0"
      },
      type: "POST",
      error: function (jqXHR, status, error) {
        console.log("Fallo al cambiar el valor");
      }
    });
  } else {
    $("#" + id).addClass("boton-color");
    $.ajax({
      url: "php/cambiarVisible.php",
      data: {
        key: id,
        key1: "1"
      },
      type: "POST",
      error: function (jqXHR, status, error) {
        console.log("Fallo al cambiar el valor");
      }
    });
  }
}

function comprobarMisproductos() {
  $.ajax({
    url: "php/comprobarMisProductos.php",
    type: 'POST',
    dataType: "json",
    success: function (json) {
      json.forEach(n => {
        console.log(n);
        $("#" + n.id).addClass("boton-color");
      });
    }
  });


}

function eliminarMiProducto() {
  alert("hola");
  var id = this.parentNode.parentNode.children[2].children[0].id;
  var borrarProducto = this.parentNode.parentNode;
  $(borrarProducto).remove();
  $.ajax({
    url: "php/borrarMiProducto.php",
    data: {
      key: id
    },
    type: "POST",
    error: function (jqXHR, status, error) {
      console.log("Fallo al eliminar el producto");
    }
  });
}

function subirProducto() {
  if (!$("#perfil-contenedor-subirProducto").length) {
    if ($("#modal-propio-lateral-derecho").children().length != 0) {
      borrarContenidoCapaDerecha();
    }
    var texto = '<div id="perfil-contenedor-subirProducto" class="contenedor-deseos">' +
      '</div>';

    $("#modal-propio-lateral-derecho").append(texto);

    var texto = '<form class="form-horizontal">'  + 
    '<div class="capa-principal">'  + 
    '<h3 class="titulo">Nuevo Producto</h3>'  +

    '   <!-- Text input-->'  + 
    '   <div class="form-group">'  + 
    '     <label class="col-md-2 control-label control-label-texto" for="product_categorie">Nombre:</label>'  + 
    '     <div class="col-md-4">'  + 
    '     <input id="product_name" name="product_name" placeholder="" class="form-control input-md" required="" type="text">'  +
    '     </div>'  + 
    '   </div>'  + 

    '   <!-- Select Basic -->'  + 
    '   <div class="form-group">'  + 
    '     <label class="col-md-2 control-label control-label-texto" for="product_categorie">Categoria:</label>'  + 
    '     <div class="col-md-4">'  + 
    '       <select id="categoria" name="product_categorie" class="form-control" onchange="rellenarSubcategorias()">'+ 
                '<option value="" selected disabled hidden>Selecciona categoria</option>'+
    '       </select>'  + 
    '     </div>'  + 
    '   </div>'  + 

    '   <!-- Select Basic -->'  + 
    '   <div class="form-group">'  + 
    '     <label class="col-md-2 control-label control-label-texto" for="product_categorie">Subcategoria:</label>'  + 
    '     <div class="col-md-4">'  + 
    '       <select id="subcategoria" name="product_categorie" class="form-control">'+
                '<option value="" selected disabled hidden>Selecciona subcategoria</option>'+
    '       </select>'  + 
    '     </div>'  + 
    '   </div>'  + 

    '   <!-- Textarea -->'  + 
    '   <div class="form-group">'  + 
    '     <label class="col-md-2 control-label" for="product_description">Descripcion:</label>'  + 
    '     <div class="col-md-4">'  + 
    '       <textarea class="form-control" id="product_description" name="product_description"></textarea>  '  + 
    '     </div>'  + 
    '   </div>'  + 

    '   <!-- File Button --> '  + 
    '   <div class="form-group">'  + 
    '   <label class="custom-file">  '  + 
    '     <input type="file" id="file" class="custom-file-input">  '  + 
    '     <span class="custom-file-control"></span>  '  + 
    '  </label>  ' +
    '   </div>'  + 
    
    '   <!-- Button -->'  + 
    '   <div class="form-group">'  + 
    '     <label class="col-md-2 control-label" for="singlebutton"></label>'  + 
    '     <div class="col-md-4">'  + 
    '       <button id="singlebutton" name="singlebutton" class="btn btn-primary">Publicar</button>'  +
    '       <button id="singlebutton" name="singlebutton" class="btn btn-primary boton-cancelar">Cancelar</button>'  +
    '     </div>'  + 
    '     </div>'  + 
    '   </div>'  + 
    '  </form>' ; 
    $("#perfil-contenedor-subirProducto").append(texto);
    
    

  }
  rellenarCategorias();
  
    
}


function rellenarCategorias(){
  $.ajax({
    url: "php/consultarCategorias.php",
    type: "POST",
    dataType: 'json',
    success: function (json){
      json.forEach(n=>{
        console.log(n.nombre);
        $('#categoria').append('<option value="'+n.id+'">'+n.nombre+'</option>');
      });
    }
  });
  
  
}

function rellenarSubcategorias(){
  $("#subcategoria").empty()
  var valor = document.getElementById("categoria").value;
  $.ajax({
    url: "php/consultarSubcategorias.php",
    data:{
      key:valor
    },
    type: "POST",
    dataType: 'json',
    success: function (json){
      json.forEach(n=>{
        console.log(n.nombre);
        $('#subcategoria').append('<option value="'+n.nombre+'">'+n.nombre+'</option>');
      });
    }
  });
  
}
