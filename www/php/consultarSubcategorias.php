<?php
$datos=[];
$id=$_POST['key'];
$conn=mysqli_connect("localhost","root","root","bdtruekup");
$sql="SELECT nombre FROM subcategorias WHERE idCategoria='$id'";
$resultado=mysqli_query($conn,$sql);
while($row=mysqli_fetch_array($resultado)){
    array_push($datos,array("nombre"=> $row['nombre']));
}
header('Content-type: application/json; charset=utf-8');
echo json_encode($datos);
?>