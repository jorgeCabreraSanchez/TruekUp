<?php

	require_once 'configBD.php';

	if ( isset($_REQUEST['email']) && !empty($_REQUEST['email']) ) {
		
		$email = trim($_REQUEST['email']);
		$email = strip_tags($email);
		
		$query = "SELECT email FROM usuarios WHERE email=:email";
		$stmt = $conn1->prepare( $query );
		$stmt->execute(array(':email'=>$email));
		
		if ($stmt->rowCount() == 1) {
			echo 'false'; // email already taken
		} else {
			echo 'true'; 
		}
	}

?>