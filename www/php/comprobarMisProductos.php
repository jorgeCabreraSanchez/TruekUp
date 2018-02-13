<?php
$datos=[];
session_start();
$idPropietario=$_SESSION['id'];
require_once 'configBD.php';
$sql="SELECT id FROM productos where visible=1 AND idPropietario='$idPropietario'";
$resultado=mysqli_query($conn,$sql);
while($row=mysqli_fetch_array($resultado)){
    array_push($datos,array("id"=>$row['id']));
}
header('Content-type: application/json; charset=utf-8');
echo json_encode($datos);
?>