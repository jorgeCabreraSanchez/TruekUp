<?php

	header('Content-type: application/json');

	require_once 'config.php';
	
	$response = array();

	if ($_POST) {
		
		$nombre = trim($_POST['nombre'])." ".trim($_POST['apellido']);
		$email = trim($_POST['email']);
		$pass = trim($_POST['cpassword']);
		
		$nombre_entero = strip_tags($nombre);
		$user_email = strip_tags($email);
		$user_pass = strip_tags($pass);
		
		// sha256 password hashing
		$hashed_password = hash('sha256', $user_pass);
		
		$query = "INSERT INTO usuarios(nombre,email,contraseña) VALUES(:nombre, :email, :pass)";
		
		$stmt = $DBcon->prepare( $query );
		$stmt->bindParam(':nombre', $nombre_entero);
		$stmt->bindParam(':email', $user_email);
		$stmt->bindParam(':pass', $hashed_password);
		
		// check for successfull registration
        if ( $stmt->execute() ) {
			$response['status'] = 'success';
			$response['message'] = '<span class="fa-check "></span> &nbsp; Usuario registrado, puedes loguearte';
        } else {
            $response['status'] = 'error'; // could not register
			$response['message'] = '<span class="fa-exclamation "></span> &nbsp; No se a podido registrar el usuario, prueba de nuevo';
        }	
	}
	
	echo json_encode($response);