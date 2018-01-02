<?php
$conn = new mysqli('localhost', 'root', 'root', 'bdtruekup');
if ($conn->error) {
    die('No se puede conectar a la BD' . $conn->connect_error);
}

$email = $_GET['email'];
$password = $_GET['password'];


$sql = "SELECT contraseña from usuarios where email = '$email'";

$igual = "FALSE";
if ($stmt = $conn -> prepare($sql)) {
    $stmt -> execute();
    $stmt -> bind_result($contraseña);    
    while ($stmt->fetch()) {        
        if($contraseña == $password){
            $igual = "TRUE";
        }
    }
}
$stmt -> close();
echo $igual;
?>