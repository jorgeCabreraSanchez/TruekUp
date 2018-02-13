<?php
session_start();
$datos=[];
// $id=$_POST['key'];
require_once 'configBD.php';
$id=$_SESSION['id'];
$sql="SELECT idProducto FROM deseados where idUsuario='$id'";
$resultado=mysqli_query($conn,$sql);
while($row=mysqli_fetch_array($resultado)){
    array_push($datos,array("idProducto"=>$row['idProducto']));
}
header('Content-type: application/json; charset=utf-8');
echo json_encode($datos);
?>