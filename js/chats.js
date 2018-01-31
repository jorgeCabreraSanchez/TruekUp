
function chats() {  
  if (!$("#perfil-contenedor-chats").length) {
    if (!jQuery.isEmptyObject($("#modal-propio-lateral-derecho"))) {
      borrarContenidoCapaDerecha();
    }

    var texto = '<div id="perfil-contenedor-chats" class="contenedor-chats">' +
      '<div class="contenedor-chats__nombre-chat"><div class="contenedor-chats__nombre-chat__item"><h3>Chats</h3></div></div>' +
      '<div class="contenedor-chats__usuario"></div>' +
      '<div class="contenedor-chats__usuarios"></div>' +
      '<div class="contenedor-chats__chat"></div>' +
      '<div class="contenedor-chats__trade"></div>' +
      '</div>';

    $("#modal-propio-lateral-derecho").append(texto);
    rellenarUsuarios();
    rellenarChat();
    rellenarTrade();
    rellenarUsuarios();    
  }
}

function rellenarUsuarios() {
  var texto = '<div class="contenedor-chats__usuarios__item">' +
    '<ul id="lista-usuarios" class="lista-usuarios">' +
    '</ul>' +
    '</div>';
  $("#perfil-contenedor-chats").children(".contenedor-chats__usuarios").append(texto);

  $("#lista-usuarios").on("click", ".lista-usuarios__item", event => {
    cambiarUsuarioTradear(event);
  });

  var usuario = 0;
  if (idProducto != null) {
    $.ajax({
      url: "php/obtenerUsuarioProducto.php",
      type: 'GET',
      dataType: 'text',
      success: function (respuesta) {
        usuario = respuesta;
      },
      error: function (jqXHR, status, error) {
        console.log("Error al traer el usuario dueño del producto. " + error);
      }
    });

  }

  $.ajax({
    url: "php/obtenerUsuarios.php",
    type: 'GET',
    dataType: 'json',
    success: function (json) {
      $.each(json,(index,data)=>{   
        var text = "<li id='"+data.id+"' class='lista-usuarios__item'><img src='images/usuarios/"+ data.imagen +"' class='lista-usuarios__imagen' />"+
        "<span class='lista-usuarios__nombre'>"+data.nombre+"</span></li>";   
        $("#lista-usuarios").append(text);
      });
    },
    error: function (jqXHR, status, error) {
      console.log("Error al traer los chats. " + error);
    }
  });

  var texto = '<div class="contenedor-chats__usuarios__item">' +
    '<ul id="lista-usuarios" class="lista-usuarios">'+
    '</ul>'+
    '</div>';
  $("#perfil-contenedor-chats").children(".contenedor-chats__usuarios").append(texto);

  rellenarUsuario("0-35x30.jpg", "Borja Orts");
}

function rellenarChat() {
      $.each(json, (index, data) => {
        var text = "<li value='" + data.id + "' class='lista-usuarios__item'><img src='images/usuarios/" + data.imagen + "' class='lista-usuarios__imagen' />" +
          "<span class='lista-usuarios__nombre'>" + data.nombre + "</span></li>";
        $("#lista-usuarios").append(text);

        if (index == usuario) {
          $("#lista-usuarios").children(".lista-usuarios__item:first").addClass("lista-usuarios__item--clicked");
          rellenarUsuario(data.imagen, data.nombre);
          rellenarChat(data.id);
          rellenarTrade(data.id, idProducto);
        }

      });
    },
    error: function (jqXHR, status, error) {
      console.log("Error al traer los usuarios. " + error);
      $.each(json, (index, data) => {
        var text = "<li id='" + data.id + "' class='lista-usuarios__item'><img src='images/usuarios/" + data.imagen + "' class='lista-usuarios__imagen' />" +
          "<span class='lista-usuarios__nombre'>" + data.nombre + "</span></li>";
        $("#lista-usuarios").append(text);
        if (index == 0) {
          $("#lista-usuarios").children(".lista-usuarios__item:first").addClass("lista-usuarios__item--clicked");
          rellenarUsuario(data.imagen, data.nombre);
          rellenarChat(data.id);
          rellenarTrade(data.id);
        }
      });
    },
    error: function (jqXHR, status, error) {
      console.log("Error al traer los chats. " + error);
    }
  });

}

function rellenarChat(idUsuario) {
  var texto = "";
  $("#perfil-contenedor-chats").children(".contenedor-chats__chat").append(texto);
}

function rellenarTrade() {
function rellenarTrade(idUsuario) {
  var texto = "";
  $("#perfil-contenedor-chats").children(".contenedor-chats__trade").append(texto);
}

function rellenarUsuario(imagen, foto) {
  var texto = "";
  $("#perfil-contenedor-chats").children(".contenedor-chats__usuario").append(texto);
}
function rellenarUsuario(imagen, nombre) {
  if(!jQuery.isEmptyObject($("#perfil-contenedor-chats").children(".contenedor-chats__usuario"))){
    $("#perfil-contenedor-chats").children(".contenedor-chats__usuario").empty();
  }
  var texto = "<div class='contenedor-chats__usuario__item'>"+
  "<img src='images/usuarios/" + imagen + "' class='contenedor-chats__usuario__imagen' />" +
  "<span class='contenedor-chats__usuario__nombre'>" + nombre + "</span>"+
   "</div>";
  $("#perfil-contenedor-chats").children(".contenedor-chats__usuario").append(texto);
}

function cambiarUsuarioTradear(evento) {     
  if(evento.target.classList.contains("lista-usuarios__item")){
    var elemento = evento.target;
    var id = evento.target.id;
  } else {
    var elemento = evento.target.parentElement;
    var id = evento.target.parentElement.id;
  }

  var imagen = elemento.childNodes[0].src.split("/")[7] ; //Depende de la ruta de tu ordenador
  var nombre = elemento.childNodes[1].textContent;  
  rellenarUsuario(imagen,nombre);
  // rellenarChat(id);
  // rellenarTrade(id);
} 
