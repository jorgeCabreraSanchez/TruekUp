<?php
$datos=[];
$id=$_GET['key'];
require_once 'configBD.php';
$sql="SELECT id,nombre,descripcion,imagen FROM productos where idSubcategoria='$id' and visible=0";
$resultado=mysqli_query($conn,$sql);
while($row=mysqli_fetch_array($resultado)){
    array_push($datos,array("id"=>$row['id'], "nombre"=> $row['nombre'] ,"descripcion"=>$row['descripcion'], "imagen"=>$row['imagen']));
}
header('Content-type: application/json; charset=utf-8');
echo json_encode($datos);
$conn->close();
?>