<?php
require_once 'configBD.php';

session_start();

$idProducto = number_format($_POST["idProducto"], 2, '.', '');
$idTrade = number_format($_POST["idTrade"], 2, '.', '');
$posicion = $_POST['posicion'];
$id = $_SESSION['id'];


$sql="SELECT idPropietario from productos where id = ?";


if ($stmt = $conn -> prepare($sql)) {
    $stmt -> bind_param("i",$idProducto);
    $stmt -> execute();
    $stmt -> bind_result($idPropietario);
    $stmt->fetch();        
    $stmt->close();
}

if($idPropietario == $id){
    if($posicion=="1"){
        $sql="UPDATE trades set idProducto1 = ?,usuario1Acepta='1',usuario2Acepta='1' WHERE idTrade = ?";
    } else {
        $sql="UPDATE trades set idProducto2 = ?,usuario1Acepta='1',usuario2Acepta='1' WHERE idTrade = ?";
    }
    
    if ($stmt = $conn -> prepare($sql)) {
        $stmt -> bind_param("ii",$idProducto,$idTrade);
        $stmt -> execute();       
        $stmt->fetch(); 
               
        $stmt->close();
    }
}

// header('Content-type: application/json; charset=utf-8');
$conn->close();
?>