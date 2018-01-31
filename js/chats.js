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

  }
}

function rellenarUsuarios() {
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
  var texto = "";
  $("#perfil-contenedor-chats").children(".contenedor-chats__chat").append(texto);
}

function rellenarTrade() {
  var texto = "";
  $("#perfil-contenedor-chats").children(".contenedor-chats__trade").append(texto);
}

function rellenarUsuario(imagen, foto) {
  var texto = "";
  $("#perfil-contenedor-chats").children(".contenedor-chats__usuario").append(texto);
}
