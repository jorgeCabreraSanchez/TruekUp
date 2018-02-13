<?php
	require_once 'configBD.php';

$sql="SELECT * FROM palabrasclave where palabra like '%" . $_GET["key"] ."%' ORDER BY length(palabra)";

$palabras=[];

if ($stmt = $conn -> prepare($sql)) {
    $stmt -> execute();
    $stmt -> bind_result($id, $palabra);
    while ($stmt->fetch()) {
        $palabras[] = array("id" =>  $id, "palabra" => $palabra);
    }
    $stmt->close();
}
// header('Content-type: application/json; charset=utf-8');
echo json_encode($palabras);
$conn->close();
?>