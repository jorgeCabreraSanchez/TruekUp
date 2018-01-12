<?php
$datos=[];
$id=$_GET['key'];
$conn=mysqli_connect("localhost","root","root","bdtruekup");
mysqli_set_charset($conn, "utf8");
$sql="SELECT * FROM productos where id='$id'";
$resultado=mysqli_query($conn,$sql);
while($row=mysqli_fetch_array($resultado)){
    array_push($datos,array("id"=>$row['id'],"idCategoria"=>$row['idSubcategoria'], "nombre"=> $row['nombre'] ,"descripcion"=>$row['descripcion'], "imagen"=>$row['imagen'], "imagenes"=>$row['imagenes']));
}
header('Content-type: application/json; charset=utf-8');
echo json_encode($datos);
?>