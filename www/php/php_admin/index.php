<?php
include("header.inc.php");
?>

<div class="round shadow login">
<div><h1 class="titulo">Login Administrador</h1></div>
<div class="panel-central-login">
<form  method="POST">
	<div class="form_title"><b>Usuario:&nbsp;</b></div>
	<div class='form_textarea'><input type="text" maxlength='30' class='textarea' name="u" value=""></div>

	<div class="form_title"><b>Contraseña:&nbsp;</b></div>
	<div class='form_textarea'><input type="password" maxlength='15' class='textarea'  name="p" value=""></div>
<br>
	<div class="form_button"><input type="submit" class='boton' name="entrar" value="Entrar"></div>
<br>
</form>
</div>
</div>

</body>
</html>
<?php

include("WebDB.php");
include("CURL.php");

								
	if(isset($_POST['entrar'])){
			$service_url = "http://localhost/2DAW/truekup/php/php_admin/admin";
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
				echo "<div class='panel-central-login error'>Datos erroneos compruebe que el usuario y la contraseña este bien</div>";
			}
			
		

	}

?>
