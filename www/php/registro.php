<?php

	header('Content-type: application/json');

	require_once 'configBD.php';
	
	$response = array();

	if ($_POST) {
		
		$nombre = trim($_POST['nombre'])." ".trim($_POST['apellido']);
		$email = trim($_POST['email']);
		$pass = trim($_POST['cpassword']);


		$nombre_entero = strip_tags($nombre);
		$user_email = strip_tags($email);
		$user_pass = strip_tags($pass);

		// sha256 password hashing
		$hashed_password = hash('sha1', $user_pass);
		
		$query = "INSERT INTO usuarios(nombre,email,contraseña) VALUES(?,?,?)";
		
		$stmt = $conn->prepare( $query );
		$stmt->bind_param('sss',$nombre_entero,$user_email,$hashed_password);
		// $stmt->bindParam(':email', $user_email);
		// $stmt->bindParam(':pass', $hashed_password);

		// check for successfull registration
        if ( $stmt->execute() ) {
			$response['status'] = 'success';
			$response['message'] = '<span class="fa fa-check-square "></span> &nbsp; Usuario registrado, puedes loguearte';
        } else {
            $response['status'] = 'error'; // could not register
			$response['message'] = '<i class="fa fa-exclamation" aria-hidden="true"></i> &nbsp; No se a podido registrar el usuario, prueba de nuevo';
        }	
	}
	
	echo json_encode($response);
	$conn->close();