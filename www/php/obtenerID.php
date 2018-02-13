<?php
session_start();
$datosPropios[]=$_SESSION['id'];
$datosPropios[]=$_SESSION['imagen'];
print_r($datosPropios);
?>