<?php
include("header.inc.php");
include("WebDB.php");
include("CURL.php");
?>

<div class="round formUsuario">
	<center>
	<h2>Añadir nuevo usuario</H2>
	
<form  method="POST">
	
	
	
	<div class="form_error" id="euser"></div>
	<div>
		<div class="form_title"><b>Nombre:&nbsp;</b></div>
		<div class='form_textarea'><input type="text" id="name" maxlength='50' class='textarea' name="nombre" value=""></div>
	</div>

	<div class="form_error" id="eu"></div>
	<div>
		<div class="form_title"><b>Email:&nbsp;</b></div>
		<div class='form_textarea'><input type="text" id="u" maxlength='30' class='textarea' name="email" value=""></div>
	</div>

	<div class="form_error" id="fc"></div>
	<div>
		<div class="form_title"><b>Contraseña:&nbsp;</b></div>
		<div class='form_textarea'><input type="password" id="u" maxlength='30' class='textarea' name="pass" value=""></div>
	</div>

	<div class="form_button"><input type="submit" class='boton' name="guardar" value="Guardar">&nbsp;<input type="button" class='boton' name="volver" value="Volver" onclick="window.location='menu.php';"></div>
</form>
</div>

<?php
if (isset($_POST['guardar'])) {
	
    $nombre=$_POST['nombre'];
    $email=$_POST['email'];
    $pass=$_POST['pass'];
    
		$service_url = "http://localhost/proyecto/truekup/php/php_admin/admin";
			$method="POST";
			$CURL = new CURL($service_url,$method);
    	$fields = ['nombre'=>$nombre, 'email'=>$email, 'pass'=>$pass];
      	$CURL->setFields(json_encode($fields));
    	
    		$respuesta = $CURL->ejecutar();

    		$code = $respuesta[1];
			$respuesta = $respuesta[0];	
		header("Location:menu.php");	
}
?>









