<?php
require_once 'configBD.php';


session_start();

$idTrade = number_format($_GET["idTrade"], 2, '.', '');
$posicion = $_GET['posicion'];
$id = intval($_SESSION['id']);

if($posicion == 1){
    $sql="UPDATE trades set usuario1Acepta = '1' where idTrade = ? and idUsuario1 = ? and idProducto1 != '0'";    
} else {
    $sql="UPDATE trades set usuario2Acepta = '1' where idTrade = ? and idUsuario2 = ? and idProducto2 != '0'";  ;
}
    

    if ($stmt = $conn -> prepare($sql)) {    
        $stmt -> bind_param("ii",$idTrade,$id);
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