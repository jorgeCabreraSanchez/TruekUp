<?php
$datos=[];
$id=$_POST['key'];
require_once 'configBD.php';
$sql="SELECT id,nombre FROM subcategorias WHERE idCategoria='$id'";
$resultado=mysqli_query($conn,$sql);
while($row=mysqli_fetch_array($resultado)){
    array_push($datos,array("id"=> $row['id'],"nombre"=> $row['nombre']));
}
header('Content-type: application/json; charset=utf-8');
echo json_encode($datos);
$conn->close();
?>