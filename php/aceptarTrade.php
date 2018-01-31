<?php
$conn = new mysqli('localhost', 'root', 'root', 'bdtruekup');
if ($conn->error) {
    die('No se puede conectar a la BD' . $conn->connect_error);
}

session_start();

$idTrade = number_format($_GET["idTrade"], 2, '.', '');
$posicion = $_GET['posicion'];
$id = $_SESSION['id'];


if($posicion == 1){
    $sql="UPDATE trades set usuario1Acepta = '0' where idTrade = ?";
} else {
    $sql="UPDATE trades set usuario2Acepta = '0' where idTrade = ?";
}

if ($stmt = $conn -> prepare($sql)) {
    $stmt -> bind_param("i",$idTrade);
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

    $sql="DELETE from trades where idTrade = ? ";

    if ($stmt = $conn -> prepare($sql)) {
        $stmt -> bind_param("i",$idTrade);
        $stmt -> execute();        
        $stmt->fetch();        
        $stmt->close();
    }

    echo "true";
} else {
    echo "false";
}

// header('Content-type: application/json; charset=utf-8');

?>