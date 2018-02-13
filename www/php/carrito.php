<?php
session_start();
$datos=[];
require_once 'configBD.php';
$id=intval($_SESSION['id']);

$sql="SELECT p.id 'idProducto', p.nombre 'nombre', p.descripcion 'descripcion',p.imagen 'imagen',t.idTrade 'idTrade'
from deseados d left join trades t 
on ((d.idProducto=t.idProducto1 and t.idUsuario2 = d.idUsuario) or (d.idProducto=t.idProducto2 and t.idUsuario1 = d.idUsuario))
inner join productos p 
on p.id = d.idProducto
where d.idUsuario = ?";

if ($stmt = $conn -> prepare($sql)) {
    $stmt -> bind_param('i',$id);    
    $stmt -> execute();    
    $result = $stmt->get_result();   // You get a result object now
    if($result->num_rows > 0) {     // Note: change to $result->...!;
        $anterior = "" ;   
        while ($data = $result->fetch_assoc()) {
            if($anterior != $data["idProducto"]){
                $anterior = $data["idProducto"];            
                $datos[] = ["idProducto"=>$data["idProducto"],"nombre"=>$data["nombre"],"imagen"=>$data["imagen"],"descripcion"=>$data["descripcion"],"idTrade"=>$data["idTrade"]];
            }            
        }
    }          
           
    $stmt -> close();           
}   
header('Content-type: application/json; charset=utf-8');
echo json_encode($datos);
$conn->close();
?>


