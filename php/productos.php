<?php
$datos=[];
$conn=mysqli_connect("localhost","root","root","bdtruekup");
$sql="SELECT * FROM productos";
$resultado=mysqli_query($conn,$sql);
while($row=mysqli_fetch_array($resultado)){
    array_push($datos,array("id"=>$row['id'],"idCategoria"=>$row['idSubcategoria'], "nombre"=> $row['nombre'] ,"descripcion"=>$row['descripcion'], "imagen"=>$row['imagen'], "palabrassClave"=>$row['palabrasClave']));
}
echo json_encode($datos);
?>