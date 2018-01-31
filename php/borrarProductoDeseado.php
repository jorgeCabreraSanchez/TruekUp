<?php
<<<<<<< HEAD
session_start();
=======
	require_once 'configBD.php';
>>>>>>> david
$datos=[];
session_start();
$idProducto=$_POST['key'];
<<<<<<< HEAD
$id  = $_SESSION['id'];
$conn=mysqli_connect("localhost","root","root","bdtruekup");
=======
$id=$_SESSION['id'];

>>>>>>> david
$sql="DELETE FROM deseados where idUsuario='$id' AND idProducto='$idProducto'";
mysqli_query($conn,$sql);
?>