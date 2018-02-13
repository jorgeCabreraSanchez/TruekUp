<?php

require_once 'configBD.php';


    session_start();
    $id = $_SESSION['id'];
    // 
	$sql = "SELECT idUsuario1 FROM chats WHERE idUsuario2 = '$id' UNION Select idUsuario2 FROM chats WHERE idUsuario1 = '$id'";
        
    if ($stmt = $conn -> prepare($sql)) {
        $stmt -> execute();
        $stmt -> bind_result($idUsuario);                    
        while ($stmt->fetch()) {                                     
            $usuarios[] = $idUsuario;
        }
        $stmt -> close();           
    }    

    $sql = "SELECT id,nombre,imagen from usuarios where id in (".implode(",", $usuarios) .");";
    if ($stmt = $conn -> prepare($sql)) {
        $stmt -> execute();
        $stmt -> bind_result($id,$nombre,$imagen); 
        $usuarios = [];
        while ($stmt->fetch()) {                                     
            $usuarios[] = array("id"=>$id,"nombre"=>$nombre,"imagen"=>$imagen);
        }
        $stmt -> close();           
    }     
    echo json_encode($usuarios);
    
$conn->close();
?>
