<?php

    $conn = new mysqli('localhost', 'root', 'root', 'bdtruekup');
    if ($conn->error) {
        die('No se puede conectar a la BD' . $conn->connect_error);
    }

    session_start();
    $idProducto = number_format($_GET['idProducto'],0,".","");    
    // 
	$sql = "SELECT idPropietario from productos where id = ?;";
        
    if ($stmt = $conn -> prepare($sql)) {        
        $stmt -> bind_param("i",$idProducto);
        $stmt -> execute();
        $stmt -> bind_result($idPropietario);                    
        while ($stmt->fetch()) {                                                    
            $devolver = $idPropietario;
        }
        //Termina el while del 1 if
        $stmt -> close();           
    }    
        
    echo $devolver;
?>
