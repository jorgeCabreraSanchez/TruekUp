<?php
$datos=[];
$id=$_GET['key'];
$conn=mysqli_connect("localhost","root","root","bdtruekup");
$sql="SELECT * FROM productos where idSubcategoria='$id'";
$resultado=mysqli_query($conn,$sql);
while($row=mysqli_fetch_array($resultado)){
    array_push($datos,array("id"=>$row['id'],"idCategoria"=>$row['idSubcategoria'], "nombre"=> $row['nombre'] ,"descripcion"=>$row['descripcion'], "imagen"=>$row['imagen']));
}
header('Content-type: application/json; charset=utf-8');
echo json_encode($datos);
?>