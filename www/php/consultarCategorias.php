<?php
$datos=[];
$conn=mysqli_connect("localhost","root","root","bdtruekup");
$sql="SELECT id,nombre FROM categorias";
$resultado=mysqli_query($conn,$sql);
while($row=mysqli_fetch_array($resultado)){
    array_push($datos,array("id"=>$row['id'],"nombre"=> $row['nombre']));
}
header('Content-type: application/json; charset=utf-8');
echo json_encode($datos);
?>