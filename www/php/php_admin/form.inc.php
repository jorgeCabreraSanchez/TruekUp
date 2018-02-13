<?php
/**
 * Contiene el formulario que se utiliza en las altas y modificaciones de los usuarios
 */
?>

<form action="<?php echo $_SERVER["PHP_SELF"]?>" method="POST" onSubmit="return validateForm();">
	<input type='hidden' name='id' value='<?php echo $id?>'>
	<input type='hidden' name='opc' value='1'>
	
	<div class="form_error" id="euser"></div>
	<div>
		<div class="form_title">Nombre:&nbsp;</div>
		<div class='form_textarea'><input type="text" id="name" maxlength='50' class='textarea' name="name" value=""></div>
	</div>

	<div class="form_error" id="eu"></div>
	<div>
		<div class="form_title">Email:&nbsp;</div>
		<div class='form_textarea'><input type="text" id="u" maxlength='30' class='textarea' name="u" value=""></div>
	</div>

	<div class="form_error" id="pv"></div>
	<div>
		<div class="form_title">Provincia:&nbsp;</div>
		<div class='form_textarea'><input type="text" id="u" maxlength='30' class='textarea' name="u" value=""></div>
	</div>
	
	<div class="form_error" id="fc"></div>
	<div>
		<div class="form_title">Fecha Nacimiento:&nbsp;</div>
		<div class='form_textarea'><input type="text" id="u" maxlength='30' class='textarea' name="u" value=""></div>
	</div>

	<div class="form_error" id="fc"></div>
	<div>
		<div class="form_title">Direccion:&nbsp;</div>
		<div class='form_textarea'><input type="text" id="u" maxlength='30' class='textarea' name="u" value=""></div>
	</div>

	<div class="form_error" id="fc"></div>
	<div>
		<div class="form_title">Fecha Alta:&nbsp;</div>
		<div class='form_textarea'><input type="text" id="u" maxlength='30' class='textarea' name="u" value=""></div>
	</div>

	<div class="form_button"><input type="submit" class='boton' value="Guardar">&nbsp;<input type="button" class='boton' name="volver" value="Volver" onclick="window.location='menu.php';"></div>
</form>
