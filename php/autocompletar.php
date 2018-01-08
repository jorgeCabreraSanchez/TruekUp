<?php
$conn = new mysqli('localhost', 'root', 'root', 'bdtruekup');
if ($conn->error) {
    die('No se puede conectar a la BD' . $conn->connect_error);
}

<<<<<<< HEAD
$sql="SELECT * FROM palabrasclave where palabra like '%" . $_GET["key"] ."%' ORDER BY length(palabra)";
=======
$sql="SELECT * FROM productos where palabrasClave like '%" + $_POST['key'] + "%' limit 6";
>>>>>>> 5e0bf0047292e4e5010362d0de18256dab3108d6

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