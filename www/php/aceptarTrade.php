<?php
require_once 'configBD.php';
session_start();
$idTrade = number_format($_GET["idTrade"], 2, '.', '');
$posicion = $_GET['posicion'];
$id = intval($_SESSION['id']);
if($posicion == 1){
    $sql="UPDATE trades set usuario1Acepta = '0' where idTrade = ? and idUsuario1 = ? and idProducto1 != '0'";
} else {
    $sql="UPDATE trades set usuario2Acepta = '0' where idTrade = ? and idUsuario2 = ? and idProducto2 != '0'";
}
if ($stmt = $conn -> prepare($sql)) {
    $stmt -> bind_param("ii",$idTrade,$id);
    $stmt -> execute();    
    $stmt->fetch();        
    $stmt->close();
}
$sql="SELECT usuario1Acepta,usuario2Acepta,idUsuario1,idUsuario2,idProducto1,idProducto2,fecha from trades where idTrade = ?";
if ($stmt = $conn -> prepare($sql)) {
    $stmt -> bind_param("i",$idTrade);
    $stmt -> execute();
    $stmt -> bind_result($idUsuario1Acepta,$idUsuario2Acepta,$idUsuario1,$idUsuario2,$idProducto1,$idProducto2,$fecha);
    $stmt->fetch();        
    $stmt->close();
}
    
if($idUsuario1Acepta == '0' && $idUsuario2Acepta == '0'){
    
    $sql="INSERT into historialtruekes values (null,?,?,?,?,?,null) ";
    if ($stmt = $conn -> prepare($sql)) {
        $stmt -> bind_param("sssss",$idUsuario1,$idUsuario2,$idProducto1,$idProducto2,$fecha);
        $stmt -> execute();        
        $stmt->fetch();        
        $stmt->close();
    }
    $sql="UPDATE trades set estado = 'Finalizado' where idTrade = ? ";
    if ($stmt = $conn -> prepare($sql)) {
        $stmt -> bind_param("i",$idTrade);
        $stmt -> execute();        
        $stmt->fetch();        
        $stmt->close();
    }
    $sql="UPDATE productos set idPropietario = $idUsuario1,visible = '1' where id = $idProducto2 ";
    if ($stmt = $conn -> prepare($sql)) {               
        $stmt -> execute();        
        $stmt->fetch();        
        $stmt->close();
    }
    $sql="UPDATE productos set idPropietario= $idUsuario2,visible = '1' where id = $idProducto1 ";
    if ($stmt = $conn -> prepare($sql)) {               
        $stmt -> execute();        
        $stmt->fetch();        
        $stmt->close();
    }
    echo "true";
} else {
    echo "false";
}
$conn->close();
// header('Content-type: application/json; charset=utf-8');
?>