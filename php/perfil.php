<?php
session_start();
$devolver = [];
$devolver['id'] = $_SESSION['id'];
$devolver['nombre'] = $_SESSION['nombre'];
$devolver['imagen'] = $_SESSION['imagen'];

echo json_encode($devolver);
?>