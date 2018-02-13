<?php 
include("WebDB.php");
include("CURL.php");
include("header.inc.php");

?>


<?php



$id=$_GET['id'];


echo "<form method='POST' action='verproductos.php?id=$id'>";
echo "<table class='table'>";
		echo "<thead class='mdb-color darken-3'>";
			echo "<tr class='text-black'>";
				echo "<th class='columna-admin centrar-texto' scope='col'colspan=1></th>";
				echo "<th class='columna-admin centrar-texto' scope='col'>Nombre</th>";
				echo "<th class='columna-admin centrar-texto' scope='col'>Descripcion</th>";	
				echo "<th class='columna-admin centrar-texto' scope='col'>Imagen</th>";
				
			echo "</tr>";
		echo "</thead>";
		echo "<tbody>";

		$service_url = "http://localhost/proyecto/truekup/php/php_admin/productos/".$id;
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
					
					echo "<td class='centrar-texto'><button class='boton-trasparente' onclick='sacarIdProducto(".$respuesta[$i]['id'].");' id='".$respuesta[$i]['id']."'>Eliminar</button></td>";
					echo "<td class='centrar-texto'>".$respuesta[$i]['nombre']."</td>";
					echo "<td class='centrar-texto'>".$respuesta[$i]['descripcion']."</td>";
					echo "<td class='centrar-texto'><img style='width: 30%;' src=".'../../'.$respuesta[$i]['imagen']."></td>";
					
				echo "</tr>";
			}
    
echo "</tbody>";
echo "</table>";
echo "</form>";

?>
<div class="volver-menu">
<input type="button" class='boton' name="volver" value="Volver" onclick="window.location='menu.php';">	
</div>
<script>
	function sacarIdProducto(id) {
		$.ajax({
        url: "http://localhost/proyecto/truekup/php/php_admin/productos/"+id,
        type: 'DELETE',
        dataType: 'json',
	});
	$("#"+id).parentNode.parentNode.remove();
}
</script>
<?php
?>

