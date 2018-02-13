<?php
session_start();
$datosPropios=array("id"=>$_SESSION['id'],"imagen"=>$_SESSION['imagen']);
echo json_encode($datosPropios);
?>