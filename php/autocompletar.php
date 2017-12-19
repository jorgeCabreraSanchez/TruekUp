<?php
$conn = new mysqli('localhost', 'root', 'root', 'bdtruekup');
if ($conn->error) {
    die('No se puede conectar a la BD' . $conn->connect_error);
}

$sql="SELECT * FROM palabrasclave where palabra like '" . $_GET["key"] ."%' ORDER BY length(palabra) limit 6";

$palabras=[];

if ($stmt = $conn -> prepare($sql)) {
    $stmt -> execute();
    $stmt -> bind_result($id, $palabra);
    while ($stmt->fetch()) {
        $palabras[] = array("id"=> $id ,"palabra"=>$palabra);
    }
}
// header('Content-type: application/json; charset=utf-8');
echo json_encode($palabras);
?>