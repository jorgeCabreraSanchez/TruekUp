<?php
	require_once 'configBD.php';

    session_start();
    $id = $_SESSION['id'];
    // 

    $sql = "SELECT id,nombre,imagen,email,direccion,provincia,fechaNacimiento,fechaAlta from usuarios where id ='$id'";
    if ($stmt = $conn -> prepare($sql)) {
        $stmt -> execute();
        $stmt -> bind_result($id,$nombre,$imagen,$email,$direccion,$provincia,$fechaNacimiento,$fechaAlta); 
        $usuarios = [];
        while ($stmt->fetch()) {                                     
            $usuarios[] = array("id"=>$id,
                                "nombre"=>$nombre,
                                "imagen"=>$imagen,
                                "email"=>$email,
                                "direccion"=>$direccion,
                                "provincia"=>$provincia,
                                "fechaNacimiento"=>$fechaNacimiento,
                                "fechaAlta"=>$fechaAlta);

        }
        $stmt -> close();           
    }     
    echo json_encode($usuarios);    
    $conn->close();
?>