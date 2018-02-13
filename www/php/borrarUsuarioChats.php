<?php
require_once 'configBD.php';

session_start();

$idUsuario = intval($_POST["idUsuario"]);
$id = intval($_SESSION['id']);


    $sql="DELETE FROM trades where (idUsuario1 = ? and idUsuario2 = ?) or (idUsuario2 = ? and idUsuario1 = ?)";

    if ($stmt = $conn -> prepare($sql)) {    
        $stmt->bind_param("iiii",$id,$idUsuario,$id,$idUsuario);
        $stmt -> execute();                              
        $stmt->close();
    }

    
    $sql="DELETE FROM chats where (idUsuario1 = ? and idUsuario2 = ?) or (idUsuario2 = ? and idUsuario1 = ?)";

    if ($stmt = $conn -> prepare($sql)) {    
        $stmt->bind_param("iiii",$id,$idUsuario,$id,$idUsuario);
        $stmt -> execute();                              
        $stmt->close();
    }



// header('Content-type: application/json; charset=utf-8');
$conn->close();
?>