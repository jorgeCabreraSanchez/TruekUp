<?php

require_once 'configBD.php';


    session_start();
    $idTrade = intval($_GET['idTrade']);
    $id = $_SESSION['id'];
    // 
	$sql = "SELECT idUsuario1 from trades where idTrade = ? and idUsuario2 = ? union Select idUsuario2 from trades where idTrade = ? and idUsuario1 = ?;";
        
    if ($stmt = $conn -> prepare($sql)) {        
        $stmt -> bind_param("iiii",$idTrade,$id,$idTrade,$id);
        $stmt -> execute();
        $stmt -> bind_result($idPropietario);                    
        $stmt->fetch();    

        echo $idPropietario;   

        $stmt -> close();           
    }    
            
    $conn->close();
?>
