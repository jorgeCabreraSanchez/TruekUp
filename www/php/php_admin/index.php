

<div class="round shadow login">
	<form  method="POST">
		<div class="form_title">Usuario:&nbsp;</div>
		<div class='form_textarea'><input type="text" maxlength='30' class='textarea' name="u" value=""></div>

		<div class="form_title">Contraseña:&nbsp;</div>
		<div class='form_textarea'><input type="password" maxlength='15' class='textarea'  name="p" value=""></div>

		<div class="form_button"><input type="submit" class='boton' name="entrar" value="Enviar"></div>
	</form>
</div>

</body>
</html>
<?php

include("WebDB.php");
include("CURL.php");

								
	if(isset($_POST['entrar'])){
			$service_url = "http://localhost/proyecto/truekup/php/php_admin/admin";
			$method="GET";
			$CURL = new CURL($service_url,$method);
    	if(isset($fields)){
      	$CURL->setFields(json_encode($fields));
    	}
    	$respuesta = $CURL->ejecutar();

    	$code = $respuesta[1];
			$respuesta = $respuesta[0];
			if($_POST['u']==$respuesta[0]['nombre'] && $_POST['p']==$respuesta[0]['pass']){
				session_start();
				$_SESSION['usuario'] = $_POST['u'];
				header("Location: menu.php");
			}else{
				echo "Datos erroneos compruebe que el usuario y la contraseña este bien";
			}
			
		

	}

?>
