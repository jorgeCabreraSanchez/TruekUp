<?php
/**
 * Pagina donde se permite actualizar los datos de los usuarios
 */

include("WebDB.php");
include("CURL.php");
include("header.inc.php");


// include("validate.inc.php");

# si no recibimos ningun identificador nos salimos ya que no podemos realizar la
# modificacion.


$id=(int)$_GET["id"]?$_GET["id"]:$_POST["id"];

		$service_url = "http://localhost/proyecto/truekup/php/php_admin/usuarios/".$id;
		$method="GET";
		$CURL = new CURL($service_url,$method);
    	if(isset($fields)){
      	$CURL->setFields(json_encode($fields));
    	}
    	$respuesta = $CURL->ejecutar();
    	$code = $respuesta[1];
		$usuarios = $respuesta[0];
		

	
	?>
	<div class="round formUsuario">
	<center>
	<h2 class="titulo">Modificar usuario</H2>
	
<form  method="POST">
	<input type='hidden' name='id' value='<?php echo $id?>'>
	
	
	<div class="form_error" id="euser"></div>
	<div>
		<div class="form_title"><b>Nombre:&nbsp;</b></div>
		<div class='form_textarea'><input type="text" id="name" maxlength='50' class='textarea' name="nombre" value="<?php echo $usuarios[0]['nombre']?>"></div>
	</div>

	<div class="form_error" id="eu"></div>
	<div>
		<div class="form_title"><b>Email:&nbsp;</b></div>
		<div class='form_textarea'><input type="text" id="u" maxlength='30' class='textarea' name="email" value="<?php echo $usuarios[0]['email']?>"></div>
	</div>

	<div class="form_error" id="pv"></div>
	<div>
		<div class="form_title"><b>Provincia:&nbsp;</b></div>
		<div class='form_textarea'><input type="text" id="u" maxlength='30' class='textarea' name="provincia" value="<?php echo $usuarios[0]['provincia']?>"></div>
	</div>
	
	<div class="form_error" id="fc"></div>
	<div>
		<div class="form_title"><b>Fecha Nacimiento:&nbsp;</b></div>
		<div class='form_textarea'><input type="text" id="u" maxlength='30' class='textarea' name="fechanac" value="<?php echo $usuarios[0]['fechaNacimiento']?>"></div>
	</div>

	<div class="form_error" id="fc"></div>
	<div>
		<div class="form_title"><b>Direccion:&nbsp;</b></div>
		<div class='form_textarea'><input type="text" id="u" maxlength='30' class='textarea' name="direccion" value="<?php echo $usuarios[0]['direccion']?>"></div>
	</div>
	<br>

	<div class="form_button"><input type="submit" class='boton' name="guardar" value="Guardar">&nbsp;<input type="button" class='boton' name="volver" value="Volver" onclick="window.location='menu.php';"></div>
</form>
</div> 
<?php

 if(isset($_POST['guardar'])){
    $nombre=$_POST['nombre'];
    $email=$_POST['email'];
    $provincia=$_POST['provincia'];
	$fechanac=$_POST['fechanac'];
	$direccion=$_POST['direccion'];

	$service_url = "http://localhost/proyecto/truekup/php/php_admin/usuarios/".$id;
		$method="PUT";
		$CURL = new CURL($service_url,$method);
		$fields = ['nombre'=>$nombre, 'email'=>$email, 'provincia'=>$provincia, 'fechaNacimiento'=>$fechanac, 'direccion'=>$direccion];
      	$CURL->setFields(json_encode($fields));
    	$respuesta = $CURL->ejecutar();
    	$code = $respuesta[1];
		$respuesta = $respuesta[0];
		header("Location:menu.php");
	
    
  }
?>

