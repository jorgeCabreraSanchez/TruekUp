<?php
	require_once 'configBD.php';
    if ($conn->error) {
    die('No se puede conectar a la BD' . $conn->connect_error);
}
//   
$email = $_GET['email'];
$password = $_GET['password'];
$checked = $_GET['checked'];

if($email == null && $password == null){
    if(isset($_COOKIE["logueado"])){
        $cookie = explode("|",$_COOKIE["logueado"]);   
        $email = $cookie[0];
        $password = $cookie[1];
    } else {
        session_start();
        session_destroy();        
    }
}

$sql = "SELECT contraseña from usuarios where email = '$email'";

$devolver = array("igual" => "FALSE");
if ($stmt = $conn -> prepare($sql)) {
    $stmt -> execute();
    $stmt -> bind_result($contraseña);    
    $stmt->fetch(); 
    $stmt -> close();    
        if($contraseña == $password && $password != null){            

            $sql = "SELECT id, nombre, imagen FROM usuarios WHERE email = '$email'";
            
            if($stmt = $conn -> prepare($sql)){
                $stmt -> execute();
                $stmt -> bind_result($id,$nombre,$imagen);
                $stmt->fetch();                  
                $devolver = array("igual" => "TRUE", "nombre" => $nombre, "imagen" => $imagen);                
                $stmt -> close();                                    
        }

        session_start();
        $_SESSION['id'] = $id;
        $_SESSION['nombre'] = $nombre;
        $_SESSION['imagen'] = $imagen;

        if($checked == "true"){
            setcookie("logueado", $email."|".$password, time()+3600*24*365*10);      
        }
    }
}

echo json_encode($devolver);
$conn -> close();
?>