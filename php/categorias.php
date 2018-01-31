<?php
	require_once 'configBD.php';
    if ($conn->error) {
        die('No se puede conectar a la BD' . $conn->connect_error);
    }

    $subcategorias = [];
    $categorias = [];

    $sql = "SELECT * FROM subcategorias";

    if ($stmt = $conn -> prepare($sql)) {
        $stmt -> execute();
        $stmt -> bind_result($id, $nombre, $idCategoria,$imagen,$icono);
        while ($stmt->fetch()) {
            $subcategorias[$idCategoria][$id] = array("id" => $id, "nombre" => $nombre,"imagen" => $imagen,"icono" => $icono);
        }
    }
    $stmt -> close();


    $sql = "SELECT * FROM categorias";
    
    if ($stmt = $conn -> prepare($sql)) {
        $stmt -> execute();
        $stmt -> bind_result($id, $nombre, $imagen, $icono);
        while ($stmt->fetch()) {
            if (isset($subcategorias[$id])) {
                $categorias[$id] = array("categoria" => $nombre,"imagen" => $imagen, "icono" => $icono, "subcategorias" => $subcategorias[$id]);
            } else {
                $categorias[$id] = array("categoria" => $nombre,"imagen" => $imagen, "icono" => $icono, "subcategorias" => "0");
            }
        }
    }
    $stmt -> close();
    
    header('Content-type: application/json; charset=utf-8');
	
	echo json_encode($categorias);	
   

    $conn -> close();
?>
