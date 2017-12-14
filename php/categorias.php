<?php
    $conn = new mysqli('localhost', 'root', 'root', 'bdtruekup');
    if ($conn->error) {
        die('No se puede conectar a la BD' . $conn->connect_error);
    }

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
        $stmt -> bind_result($id, $nombre, $imagen);
        while ($stmt->fetch()) {
            if (isset($subcategorias[$id])) {
                $categorias[$id] = array("categoria" => $nombre,"imagen" => $imagen, "subcategorias" => $subcategorias[$id]);
            } else {
                $categorias[$id] = array("categoria" => $nombre,"imagen" => $imagen, "subcategorias" => "");
            }
        }
    }
    $stmt -> close();

    echo json_encode($categorias);
    
    $conn -> close();
?>
