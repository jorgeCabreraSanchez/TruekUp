<?php
$datos=[];
session_start();
$id=$_SESSION["id"];
require_once 'configBD.php';
$sql = "SELECT U.nombre nombre1, U2.nombre nombre2, P.nombre producto1, P.imagen imagen1, P2.nombre producto2, P2.imagen imagen2, fecha_inicio, fecha_fin
FROM historialtruekes T
INNER JOIN usuarios U INNER JOIN usuarios U2 
INNER JOIN productos P INNER JOIN productos P2 
ON T.idUsuario1=U.id AND T.idUsuario2 = U2.id
AND T.idProducto1 = P.id AND T.idProducto2 = P2.id
WHERE T.idUsuario1=$id OR T.idUsuario2='$id'";
$resultado=mysqli_query($conn,$sql);
while($row=mysqli_fetch_array($resultado)){
    array_push($datos,array("Nombre1"=>$row['nombre1'], "Nombre2"=> $row['nombre2'] ,"Producto1"=>$row['producto1'], "imagen1"=>$row['imagen1'], "Producto2"=>$row['producto2'], "imagen2"=>$row['imagen2'], "fecha_inicio"=>$row['fecha_inicio'], "fecha_fin"=>$row['fecha_fin']));
}
header('Content-type: application/json; charset=utf-8');
echo json_encode($datos);
$conn->close();
?>