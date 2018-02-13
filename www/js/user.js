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
    '</li>' +
    '<li class="menu-lateral__body__lista__item menu-lateral__body__lista__item--normal">' +
    '<i class="fa fa-upload" aria-hidden="true"></i> Subir producto' +
    '</li>' +
    '<li class="menu-lateral__body__lista__item menu-lateral__body__lista__item--logout">' +
    '<i class="fa fa-sign-out" aria-hidden="true"></i> Login out' +
    '</li>' +
    '<li class="menu-lateral__body__lista__item menu-lateral__body__lista__item--normal menu-lateral__body__lista__item--salir">' +
    '<i class="fa fa-arrow-left" aria-hidden="true"></i> Volver' +
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
  perfilExtendido();
  $("#menu-lateral-perfil").children()[1].addEventListener("click", perfilExtendido);
  $("#menu-lateral-perfil").children()[2].addEventListener("click", crearCarrito);
  $("#menu-lateral-perfil").children()[3].addEventListener("click", misProductos);
  $("#menu-lateral-perfil").children()[4].addEventListener("click", function(){
    chats(null);
  });
  $("#menu-lateral-perfil").children()[5].addEventListener("click", tradesRealizados);
  $("#menu-lateral-perfil").children()[6].addEventListener("click", subirProducto);
  $("#menu-lateral-perfil").children()[7].addEventListener("click", desloguearse);
  $("#menu-lateral-perfil").children()[8].addEventListener("click", salirPerfil);

};

function crearCarrito() {
  if (!$("#perfil-contenedor-deseos").length) {
    if ($("#modal-propio-lateral-derecho").children().length != 0) {
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
          '<th style="width:10%;border-top: 0px; border-bottom: 0px;">Eliminar</th>' +
          '<th style="width:8%;border-top: 0px;border-bottom: 0px">Contacto</th>' +
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
          '<div class="col-sm-2 hidden-xs"><img src="' + n.imagen + '" alt="..." class="img-responsive img-carro volver-carrito"/></div>' +
          '<div class="col-sm-8 td-texto--central">' +
          '<h4 class="nomargin volver-carrito">' + n.nombre + '</h4>' +
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
      $(".volver-carrito").on("click", event => {
        key = "modal-carrito";
        productosDetallados(event)
        salirPerfil()
      });

    },
    //Termina success    
    error: function (jqXHR, status, error) {
      console.log("Fallo en la peticion ajax para los productos");
    }

  });


}

function tradesRealizados() {
  if (!$("#perfil-contenedor-trades").length) {
    if ($("#modal-propio-lateral-derecho").children().length != 0) {
      borrarContenidoCapaDerecha();
    }

    $.ajax({
      url: "php/misTruekes.php",
      type: 'POST',
      dataType: 'json',
      success: function (json) {
        var texto = '<div id="perfil-contenedor-trades" class="contenedor-deseos">' +
          '</div>';

        $("#modal-propio-lateral-derecho").append(texto);
        var texto = '<div class="container contenedor-historial">' +
        '<h1>Historial de Truekes</h1>'+
          '<table id="cart" class="table table-hover table-condensed">' +
          '<thead>' +
          '<tr class="carrito-header">' +
          '<th style="width:10%;border-top: 0px;border-bottom: 0px">Usuario 1</th>' +
          '<th style="width:10%;border-top: 0px;border-bottom: 0px">Usuario 2</th>' +
          '<th style="width:10%;border-top: 0px;border-bottom: 0px">Produc 1</th>' +
          '<th style="width:15%;border-top: 0px;border-bottom: 0px">Foto 1</th>' +
          '<th style="width:10%;border-top: 0px;border-bottom: 0px">Produc 2</th>' +
          '<th style="width:15%;border-top: 0px;border-bottom: 0px">Foto 2</th>' +
          '<th style="width:15%;border-top: 0px;border-bottom: 0px">Fecha Inicio</th>' +
          '<th style="width:15%;border-top: 0px;border-bottom: 0px">Fecha Fin</th>' +
          '</tr>' +
          '</thead>' +
          '<tbody id="cuerpoCarritoMisProductos">' +
          '</tbody>' +
          '</table>' +
          '</div>';
        $("#perfil-contenedor-trades").append(texto);
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
            '<td>' + n.Nombre1 + '</td>' +
            '<td>' + n.Nombre2 + '</td>' +
            '<td>' + n.Producto1 + '</td>' +
            '<td><img src="' + n.imagen1 + '" alt="..." class="img-responsive imagen-pequeña"/></td>' +
            '<td>' + n.Producto2 + '</td>' +
            '<td><img src="' + n.imagen2 + '" alt="..." class="img-responsive imagen-pequeña"/></td>' +
            '<td>' + n.fecha_inicio + '</td>' +
            '<td>' + n.fecha_fin + '</td>' +
          
            '</tr>';


          $("#cuerpoCarritoMisProductos").append(texto);
        });
        comprobarMisproductos();

      },
      error: function (jqXHR, status, error) {
        console.log("Fallo en la peticion de mis productos");
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

function perfilExtendido() {

  if (!$("#container-perfil").length) {
    if (!jQuery.isEmptyObject($("#modal-propio-lateral-derecho"))) {
      borrarContenidoCapaDerecha();
    }

    $.ajax({
      url: "php/obtenerPerfil.php",
      type: 'POST',
      dataType: 'json',
      success: function (json) {
        json.forEach(n => {
          nombre = n.nombre;
          imagen = n.imagen;
          email = n.email;
          direccion = n.direccion;
          provincia = n.provincia;
          fechaNacimiento = n.fechaNacimiento;
          const meses = [
            "Enero", "Febrero", "Marzo",
            "Abril", "Mayo", "Junio", "Julio",
            "Agosto", "Septiembre", "Octubre",
            "Noviembre", "Diciembre"
          ]
          const date = new Date(n.fechaAlta)
          const dia = date.getDate()
          const mes = date.getMonth()
          const ano = date.getFullYear()
          fechaAlta = `${dia} de ${meses[mes]} del ${ano}`;
          if (n.fechaNacimiento != null && n.fechaNacimiento != "" ||
            n.fechaNacimiento == "Introduce tu fecha de nacimiento") {
            if (n.fechaNacimiento.search('1') &&
              !n.fechaNacimiento.length <= '11' && fechaNacimiento != "Introduce tu fecha de nacimiento") {
              const date1 = new Date(n.fechaNacimiento)
              const dia1 = date1.getDate()
              const mes1 = date1.getMonth()
              const ano1 = date1.getFullYear()
              fechaNacimiento = `${dia1} de ${meses[mes1]} del ${ano1}`;
            }

          } else {

          }
          if (!fechaNacimiento.search("undefined")) {
            fechaNacimiento = "Introduce tu fecha de nacimiento";
          }

        });
        var texto = '   <div id="container-perfil" class="container container-perfil">  ' +
          '    <form enctype="multipart/form-data" class="form-horizontal" method="post" role="form" id="edit-form1" autocomplete="off">  ' +
          '<div class="container-perfil--titulo">' +
          '       <h1>Editar el perfil de @' + nombre + '</h1>  ' + '       <h3>Miembro desde el ' + fechaAlta + '</h3>  ' +
          ' </div>' +
          '     	<hr>  ' +
          '   	<div class="row">  ' +
          '         <!-- left column -->  ' +
          '         <div class="col-md-3">  ' +
          '           <div class="text-center">  ' +
          '<div class="form-group">  ' +
          '             <img src="images/usuarios/' + imagen + '"  class="avatar img-circle imagen-perfil"  alt="avatar">  ' +
          // console.log(imagen);
          '             <h6>Cambiar foto de perfil...</h6>  ' +
          '   <input type="file" name="imagenPerfil" id="file-5" class="inputfile inputfile-5"/>  ' +
          '   <label for="file-5">  ' +
          '   <svg xmlns="" class="iborrainputfile" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path></svg>  ' +
          '  <br> <span class="iborrainputfile">Subir</span>  ' +
          '  </label>  ' +
          '           </div>  ' +
          '         </div>  ' +
          // '         </form>  ' +
          '           </div>  ' +
          '         <!-- edit form column -->  ' +
          '         <div class="col-md-9 personal-info personal-info--right">  ' +
          '           <div id="alertmessageperfil" class="alert alert-info alert-dismissable">  ' +
          '             <a class="panel-close close" data-dismiss="alert">×</a>   ' +
          '             <i class="fa fa-coffee"></i>  ' +
          '              <strong>Alertas!</strong>. No tiene avisos importantes.  ' +
          '           </div>  ' +
          '           <h3>Información Personal</h3>  ' +
          // '           <form class="form-horizontal" method="post" role="form" id="edit-form" autocomplete="off" enctype="multipart/form-data">  ' +
          '             <div class="form-group">  ' +
          '               <label class="col-lg-3 control-label">Nombre:</label>  ' +
          '               <div class="col-lg-8">  ' +
          '                 <input id="idNombre" name="nombre" class="form-control" value="' + nombre + '" type="text">  ' +
          '               </div>  ' +
          '             </div>  ' +
          '             <div class="form-group">  ' +
          '               <label class="col-lg-3 control-label">Direccion</label>  ' +
          '               <div class="col-lg-8">  ' +
          '                 <input id="idDireccion" name="direccion" class="form-control" placeholder"Escribe tu direccion" value="' + direccion + '" type="text">  ' +
          '               </div>  ' +
          '             </div>  ' +
          ' <div class="form-group">  ' +
          '               <label class="col-lg-3 control-label">Provincia</label>  ' +
          '               <div class="col-lg-8">  ' +
          '                 <div class="ui-select">  ' +
          '                   <select id="idProvincia" name="provincia" id="user_zone" class="form-control">  ' +
          '<option value"' + provincia + '" selected="selected">' + provincia + '</option> ' +
          '   <option value="">' + provincia + '</option>  ' +
          '   <option value="A coru&#241;a">A coru&#241;a</option>  ' +
          '   <option value="&#193;lava">&#193;lava</option>  ' +
          '   <option value="Albacete">Albacete</option>  ' +
          '   <option value="Alicante">Alicante</option>  ' +
          '   <option value="Almer&#237;a">Almer&#237;a</option>  ' +
          '   <option value="Asturias">Asturias</option>  ' +
          '   <option value="&#193;vila">&#193;vila</option>  ' +
          '   <option value="Badajoz>Badajoz</option>  ' +
          '   <option value="Baleares">Baleares</option>  ' +
          '   <option value="Barcelona">Barcelona</option>  ' +
          '   <option value="Burgos">Burgos</option>  ' +
          '   <option value="C&#225;ceres">C&#225;ceres</option>  ' +
          '   <option value="C&#225;diz">C&#225;diz</option>  ' +
          '   <option value="Cantabria">Cantabria</option>  ' +
          '   <option value="Castell&#243;n">Castell&#243;n</option>  ' +
          '   <option value="Ceuta">Ceuta</option>  ' +
          '   <option value="Ciudad Real">Ciudad Real</option>  ' +
          '   <option value="C&#243;rdoba">C&#243;rdoba</option>  ' +
          '   <option value="Cuenca">Cuenca</option>  ' +
          '   <option value="Extranjero">Extranjero</option>  ' +
          '   <option value="Girona">Girona</option>  ' +
          '   <option value="Granada">Granada</option>  ' +
          '   <option value="Guadalajara">Guadalajara</option>  ' +
          '   <option value="Guip&#250;zcoa">Guip&#250;zcoa</option>  ' +
          '   <option value="Huelva">Huelva</option>  ' +
          '   <option value="Huesca">Huesca</option>  ' +
          '   <option value="Ja&#233;n">Ja&#233;n</option>  ' +
          '   <option value="La rioja>La rioja</option>  ' +
          '   <option value="Las palmas">Las palmas</option>  ' +
          '   <option value="Le&#243;n">Le&#243;n</option>  ' +
          '   <option value="Lleida">Lleida</option>  ' +
          '   <option value="Lugo">Lugo</option>  ' +
          '   <option value="Madrid">Madrid</option>  ' +
          '   <option value="M&#225;laga">M&#225;laga</option>  ' +
          '   <option value="Melilla">Melilla</option>  ' +
          '   <option value="Murcia">Murcia</option>  ' +
          '   <option value="Navarra">Navarra</option>  ' +
          '   <option value="Ourense">Ourense</option>  ' +
          '   <option value="Palencia">Palencia</option>  ' +
          '   <option value="Pontevedra">Pontevedra</option>  ' +
          '   <option value="Salamanca">Salamanca</option>  ' +
          '   <option value="Santa cruz de tenerife">Santa cruz de tenerife</option>  ' +
          '   <option value="Segovia">Segovia</option>  ' +
          '   <option value="Sevilla">Sevilla</option>  ' +
          '   <option value="Soria">Soria</option>  ' +
          '   <option value="Tarragona">Tarragona</option>  ' +
          '   <option value="Teruel">Teruel</option>  ' +
          '   <option value="Toledo">Toledo</option>  ' +
          '   <option value="Valencia">Valencia</option>  ' +
          '   <option value="Valladolid">Valladolid</option>  ' +
          '   <option value="Vizcaya">Vizcaya</option>  ' +
          '   <option value="Zamora">Zamora</option>  ' +
          '   <option value="Zaragoza">Zaragoza</option>  ' +
          '                   </select>  ' +
          '                 </div>  ' +
          '               </div>  ' +
          '             </div>  ' +
          '             <div class="form-group">  ' +
          '               <div class="col-lg-8">  ' +
          '       			<label>Fecha de Nacimiento</label>  ' +
          '     <p><input  name="fechaNacimiento" class="form-control" type="text" id="datepicker"  value="' + fechaNacimiento + '" placeholder="' + fechaNacimiento + '"/></p>     ' +
          '      		</div>  ' +
          '               </div>  ' +
          '             <div class="form-group">  ' +
          '               <label class="col-lg-3 control-label">Email:</label>  ' +
          '               <div class="col-lg-8">  ' +
          '                 <input id="idEmail" name="email" class="form-control" value="' + email + '" type="text">  ' +
          '               </div>  ' +
          '             </div>  ' +
          // '             <div class="form-group">  ' +
          // '               <label class="col-md-3 control-label">Username:</label>  ' +
          // '               <div class="col-md-8">  ' +
          // '                 <input class="form-control" value="janeuser" type="text">  ' +
          // '               </div>  ' +
          // '             </div>  ' +
          '             <div class="form-group">  ' +
          '               <label class="col-md-3 control-label">Contraseña:</label>  ' +
          '               <div class="col-md-8">  ' +
          '                 <input name="password" class="form-control"  placeholder="Escribe una nueva contraseña" type="password">  ' +
          '               </div>  ' +
          '             </div>  ' +
          '             <div class="form-group">  ' +
          '               <label class="col-md-3 control-label">Confirma la contraseña:</label>  ' +
          '               <div class="col-md-8">  ' +
          '                 <input name="cpassword" class="form-control"  placeholder="Repite la contraseña" type="password">  ' +
          '               </div>  ' +
          '             </div>  ' +
          '             <div class="form-group">  ' +
          '               <label class="col-md-3 control-label"></label>  ' +
          '                   <div class="col-md-8">  ' +
          '                 <input name="botonGuardar" id="btn-edit" class="btn btn-primary" value="Guardar cambios" type="button">  ' +
          '                 <span></span>  ' +
          '                 <input name="botonBorrar" class="btn btn-default" value="Borrar" type="reset">  ' +
          '               </div>  ' +
          '             </div>  ' +
          '         </div>  ' +
          '     </div>  ' +
          '           </form>  ' +
          '   </div>  ' +
          '  <hr>  ';
        $("#modal-propio-lateral-derecho").append(texto); //añade el perfil a la capa derecha
        $("#btn-edit").on("click", editar); // lanza la funcion editar perfil
        $(function () {
          $("#datepicker").datepicker();
        });
        // alert para avisos
        if ($("#idNombre").val().length > 0 &&
          $("#idEmail").val().length > 0 &&
          $("#idProvincia").val().length > 0 &&
          $("#idDireccion").val().length > 0 && $("#idDireccion").val() != "Introducir nueva direccion" &&
          $("#datepicker").val().length > 0 && $("#datepicker").val() != "Introduce tu fecha de nacimiento") {

          mensaje = '<a class="panel-close close" data-dismiss="alert">X' +
            '</a><i class="fa fa-coffee"></i>' +
            '<strong>Aviso!</strong>. Datos correctos, puede realizar trukes.';
          $('#alertmessageperfil').removeClass('alert-info').addClass('alert-success');
          $('#alertmessageperfil').removeClass('alert-danger').addClass('alert-success');
          $('#alertmessageperfil').html("");
          $('#alertmessageperfil').html('</div>' + mensaje + '</div>');

        } else {
          mensaje = '<a class="panel-close close" data-dismiss="alert">X' +
            '</a><i class="fa fa-coffee"></i>' +
            '<strong>Aviso!</strong>. No podra realizar truekes hasta que complete todos sus datos.';
          $('#alertmessageperfil').removeClass('alert-info').addClass('alert-danger');
          $('#alertmessageperfil').html("");
          $('#alertmessageperfil').html('</div>' + mensaje + '</div>');
        }



        function hideIt() {
          $("#datepicker").datepicker("destroy");
          $("#datepicker").hide();
        }

        function showIt() {
          $("#datepicker").show();
          $("#datepicker").datepicker();
        }
        //var currentDate = $( ".datapicker" ).datepicker( "getDate" );

      },
      error: function (jqXHR, status, error) {
        console.log("Fallo en la recuperacion del perfil");
      }
    });

    function editar() {
      var datos = $('#edit-form1').serializeArray();
      // console.log($('#file-5')[0].value);   
      // alert('Datos serializados: ' + dataString);

      var almacen = new FormData($('#edit-form1')[0]);
      // for (var pair of almacen.entries()) {
      //   console.log(pair[0] + ', ' + pair[1]);
      // }
      $.ajax({
        url: 'php/editarPerfil.php',
        type: 'POST',
        data: almacen,
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function (json) {
          console.log("success");
          if ($("#container-perfil").length) {
            if (!jQuery.isEmptyObject($("#modal-propio-lateral-derecho"))) {
              borrarContenidoCapaDerecha();
              perfilExtendido();
            }
          }
        },
        //Termina success    
        error: function (jqXHR, status, error) {
          console.log("Fallo en la peticion ajax para los productos");
          console.log(error);
          if ($("#container-perfil").length) {
            if (!jQuery.isEmptyObject($("#modal-propio-lateral-derecho"))) {
              borrarContenidoCapaDerecha();
              perfilExtendido();
            }
          }
        }
      });


      // .done(function (data) {
      //   if (data.status === 'success') {
      //     console.log("success");
      //   } else {
      //     console.log("no success");

      //   }
      // })
      // .fail(function () {


      //     }
      //   }

      // });




    };
    //DEJAR POR SI ACASO

    // .done(function (data) {

    //   $('#btn-signup').html('<img src="images/ajax-loader.gif" /> &nbsp; registrando...').prop('disabled', true);
    //   $('input[type=text],input[type=email],input[type=password]').prop('disabled', true);

    //   setTimeout(function () {

    //     if (data.status === 'success') {
    //       console.log("ok");

    //       $('#alertmessage').slideDown('fast', function () {
    //         $('#errorDiv').html('<div class="alert alert-info">' + data.message + '</div>');
    //         $("#edit-form").trigger('reset');
    //         $('input[type=text],input[type=email],input[type=password]').prop('disabled', false);
    //         $('#btn-signup').html('<span class="glyphicon glyphicon-log-in"></span> &nbsp; Registrar').prop('disabled', false);
    //         console.log("ok");


    //       }).delay(3000).slideUp('fast');


    //     } else {
    //       console.log("no ok");

    //       $('#alertmessage').slideDown('fast', function () {
    //         console.log("no ok");

    //         $('#errorDiv').html('<div class="alert alert-danger">' + data.message + '</div>');
    //         $("#edit-form").trigger('reset');
    //         $('input[type=text],input[type=email],input[type=password]').prop('disabled', false);
    //         $('#btn-signup').html('<span class="glyphicon glyphicon-log-in"></span> &nbsp; Registrar').prop('disabled', false);
    //       }).delay(3000).slideUp('fast');
    //     }

    //   }, 3000);

    // })
    // .fail(function () {
    //   $("#edit-form").trigger('reset');
    //   alert('Ocurrio un error, prueba de nuevo mas tarde...');
    // });
  }

}