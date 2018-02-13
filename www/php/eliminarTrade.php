<?php
require_once 'configBD.php';


session_start();

$idTrade = number_format($_GET["idTrade"], 2, '.', '');
$id = intval($_SESSION['id']);


    $sql="DELETE FROM trades where idTrade = ? and (idUsuario1 = ? or idUsuario2 = ?)";

    if ($stmt = $conn -> prepare($sql)) {    
        $stmt->bind_param("iii",$idTrade,$id,$id);
        $stmt -> execute(); 
        $cantidad = $stmt->affected_rows;                      
        $stmt->close();
    }

    if($cantidad>0){
        echo "true";
    } else {
        echo "false";
    }

   
$conn->close();


// header('Content-type: application/json; charset=utf-8');

?>