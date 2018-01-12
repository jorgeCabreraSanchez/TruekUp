<?php 
if(isset($_COOKIE["logueado"])){
    setcookie('logueado','',time()-100);
}

    session_start();
    unset($_SESSION['id']);
    unset($_SESSION['nombre']);
    unset($_SESSION['imagen']);
echo json_encode("Fin");
?>