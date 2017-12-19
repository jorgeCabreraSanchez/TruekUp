<?php
$conn = new mysqli('localhost', 'root', 'root', 'bdtruekup');
if ($conn->error) {
    die('No se puede conectar a la BD' . $conn->connect_error);
}

$sql="SELECT * FROM productos where palabrasClave like '%" + $_POST['key'] + "%' limit 6";

$productos=[];

if ($stmt = $conn -> prepare($sql)) {
    $stmt -> execute();
    $stmt -> bind_result($id, $idSubcategoria, $nombre, $descripcion, $imagen, $palabrasClave);
    while ($stmt->fetch()) {
        $productos[$idSubcategoria][$id] = array("nombre"=> $nombre ,"descripcion"=>$descripcion, "imagen"=>$imagen, "palabrasClave"=>$palabrasClave);
    }
}
// header('Content-type: application/json; charset=utf-8');
echo json_encode($productos);
?>