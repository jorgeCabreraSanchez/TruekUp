<?php
/**
 * Codigo que verifica que el usuario sea correcto. Si no existe el usuario en
 * la base de datos, o si han caducado las variables de session, volvemos a la
 * pagina inicial.
 * Esta pagina es llamadad desde todas las paginas de la web una vez esta el usuario
 * validado.
 */
print_r("validacion");
$result=mysqli_query($link, "select id from Users WHERE user='".addslashes($_SESSION["u"])."' AND password='".$_SESSION["p"]."'");
if(!mysqli_num_rows($result))
{
	header("location:index.php");
	return;
}
?>
