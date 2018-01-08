<?php
$conn = new mysqli('localhost', 'root', 'root', 'bdtruekup');
if ($conn->error) {
    die('No se puede conectar a la BD' . $conn->connect_error);
}
//   
$email = $_GET['email'];
$password = $_GET['password'];
$checked = $_GET['checked'];

if($email == null && $password == null){
    $cookie = $_COOKIE["logueado"];
    
}

$sql = "SELECT contraseña from usuarios where email = '$email'";

$devolver = array("igual" => "FALSE");
if ($stmt = $conn -> prepare($sql)) {
    $stmt -> execute();
    $stmt -> bind_result($contraseña);    
    $stmt->fetch(); 
    $stmt -> close();    
        if($contraseña == $password && $password != null){            

            $sql = "SELECT id, nombre, apellidos, imagen FROM usuarios WHERE email = '$email'";
            
            if($stmt = $conn -> prepare($sql)){
                $stmt -> execute();
                $stmt -> bind_result($id,$nombre,$apellidos,$imagen);
                $stmt->fetch();                  
                $devolver = array("igual" => "TRUE", "id" => $id, "nombre" => $nombre . " " . $apellidos, "imagen" => $imagen);                
                $stmt -> close();                                    
        }
    }
}

if($checked){
    setcookie("logueado", $email."|".$password, time()+3600*24*365*10);      
}

echo json_encode($devolver);
$conn -> close();
?>