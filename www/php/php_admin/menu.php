<?php
/**
 * Pantalla inicial donde se muestra el listado de usuarios
 */

include("WebDB.php");
include("CURL.php");
// include("validate.inc.php");

include("header.inc.php");

include("menu.inc.php");
?>

<div class="listUsers">
<div class="listUsers-titulo">
	<h1 class="titulo">Listado de usuarios</h1>
	</div>
	<div>
		<p>Opciones de administrador: <a href='add.php'>Añadir nuevo usuario </a>--
		<a href='index.php'> Cerrar sesion</a></p>
		
	</div>
	<?php
	if(isset($_GET['id'])){
		$id=$_GET["id"];
		$service_url = "http://localhost/proyecto/truekup/php/php_admin/usuarios/".$id;
		$method="DELETE";
		$CURL = new CURL($service_url,$method);
    	if(isset($fields)){
      	$CURL->setFields(json_encode($fields));
    	}
    	$respuesta = $CURL->ejecutar();
    	$code = $respuesta[1];
		$respuesta = $respuesta[0];

	}
	# Titulos del listado
	echo "<table class='table'>";
		echo "<thead class='mdb-color darken-3'>";
			echo "<tr class='text-black'>";
				echo "<th class='columna-admin centrar-texto' scope='col'>ID</th>";
				echo "<th class='columna-admin centrar-texto' scope='col'colspan=3>Acciones</th>";
				echo "<th class='columna-admin centrar-texto' scope='col'>Nombre</th>";
				echo "<th class='columna-admin centrar-texto' scope='col'>Email</th>";	
				echo "<th class='columna-admin centrar-texto' scope='col'>Provincia</th>";
				echo "<th class='columna-admin centrar-texto' scope='col'>Fecha Nacimiento</th>";
				echo "<th class='columna-admin centrar-texto' scope='col'>Imagen</th>";	
				echo "<th class='columna-admin centrar-texto' scope='col'>Direccion</th>";
				echo "<th class='columna-admin centrar-texto' scope='col'>Fecha Alta</th>";
			echo "</tr>";
		echo "</thead>";

		echo "<tbody>";

			# realizamos un bucle por toda la base de datos para mostrar todos los registros
			$service_url = "http://localhost/proyecto/truekup/php/php_admin/usuarios";
			$method="GET";
			$CURL = new CURL($service_url,$method);
    	if(isset($fields)){
      	$CURL->setFields(json_encode($fields));
    	}
    		$respuesta = $CURL->ejecutar();

    		$code = $respuesta[1];
			$respuesta = $respuesta[0];
			$longitud=count($respuesta);
			for ($i=0; $i < $longitud; $i++) { 
				echo "<tr>";
					echo"<th scope='row'>".$respuesta[$i]['id']."</th>";
					echo "<td class='centrar-texto'><a href='menu.php?id=".$respuesta[$i]['id']."'>Eliminar</a></td>";
					echo "<td class='centrar-texto'><a href='update.php?id=".$respuesta[$i]['id']."'>Modificar</a></td>";
					echo "<td class='centrar-texto'><a href='verproductos.php?id=".$respuesta[$i]['id']."'>Ver productos</a></td>";
					echo "<td class='centrar-texto'>".$respuesta[$i]['nombre']."</td>";
					echo "<td class='centrar-texto'>".$respuesta[$i]['email']."</td>";
					echo "<td class='centrar-texto'>".$respuesta[$i]['provincia']."</td>";
					echo "<td class='centrar-texto'>".$respuesta[$i]['fechaNacimiento']."</td>";
					echo "<td class='centrar-texto'>".$respuesta[$i]['imagen']."</td>";
					echo "<td class='centrar-texto'>".$respuesta[$i]['direccion']."</td>";
					echo "<td class='centrar-texto'>".$respuesta[$i]['fechaAlta']."</td>";
				echo "</tr>";
			}
		echo "</tbody>";
	echo "</table>";

	
	?>

</div>

<?php
include("footer.inc.php");

?>
