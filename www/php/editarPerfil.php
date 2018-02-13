<?php
	header('Content-type: application/json');
    session_start();
    // JSON ('Content-Type →application/json; charset=utf-8');
    
	
	$response = array();
    if ($_POST) {
        $usuario = $_SESSION['id'];
	    require_once 'configBD.php';
        $nombre=$_POST['nombre'];
        $email=$_POST['email'];
        $cpassword=$_POST['password'];
		// sha256 password hashing
		$hashed_password = hash('sha1', $cpassword);
        $provincia=$_POST['provincia'];
        $fechaNacimiento=$_POST['fechaNacimiento'];
        $direccion=$_POST['direccion'];
        $imagen=$_FILES['imagenPerfil']['name'];

        if ($_FILES['imagenPerfil']['size'] != '0' && strlen($_POST['password'])>='2') {
            require_once 'subirImagen.php';
            $query = "UPDATE usuarios " .
                "SET nombre = '" . $nombre . "'," .
                "email = '" . $email . "'," .
                "contraseña = '" . $hashed_password . "',".
                 "provincia = '" . $provincia . "'," .
                 "fechaNacimiento = '" . $fechaNacimiento . "'," .
                 "direccion = '" . $direccion . "'," .
                 "imagen = '" . $imagen . "'" .
                "WHERE id = '" . $usuario . "'";
        }else if($_FILES['imagenPerfil']['size'] != '0'&& strlen($_POST['password'])<='2'){
            require_once 'subirImagen.php';
                $query = "UPDATE usuarios " .
                "SET nombre = '" . $nombre . "'," .
                "email = '" . $email . "'," .
                "provincia = '" . $provincia . "'," .
                "fechaNacimiento = '" . $fechaNacimiento . "'," .
                "direccion = '" . $direccion . "'," .
                "imagen = '" . $imagen . "'" .
                "WHERE id = '" . $usuario . "'";
        }else if(strlen($_POST['password'])<='2'){
                $query = "UPDATE usuarios " .
                "SET nombre = '" . $nombre . "'," .
                "email = '" . $email . "'," .
                "provincia = '" . $provincia . "'," .
                "fechaNacimiento = '" . $fechaNacimiento . "'," .
                "direccion = '" . $direccion . "'" .
                "WHERE id = '" . $usuario . "'";
        }else if(strlen($_POST['password'])>='2'){
                $query = "UPDATE usuarios " .
                "SET nombre = '" . $nombre . "'," .
                "email = '" . $email . "'," .
                "contraseña = '" . $hashed_password . "',".
                "provincia = '" . $provincia . "'," .
                "fechaNacimiento = '" . $fechaNacimiento . "'," .
                "direccion = '" . $direccion . "'" .
                "WHERE id = '" . $usuario . "'";
}
        

		$stmt = $conn1->prepare( $query );

        if ( $stmt->execute() ) {
			$response['status'] = 'success';
			$response['message'] = 'Usuario editado';
        } else {
            $response['status'] = 'error; // No se puede editar';
			$response['message'] = 'No editado prueba de nuevo';
        }	
        $stmt->close();
	}

    echo json_encode($response);    
    $conn->close();

?>