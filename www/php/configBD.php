<?php
	define('DBhost', 'localhost');
	define('DBuser', 'root');
	define('DBPass', 'root');
	define('DBname', 'bdtruekup');
	
	try {		
			$conn=mysqli_connect(DBhost,DBuser,DBPass,DBname);
			mysqli_set_charset($conn, "utf8");
		} catch(mysqli_error $e){			
			die($e->getMessage());
		}

	try {		
			$conn1 = new PDO("mysql:host=".DBhost.";dbname=".DBname,DBuser,DBPass);	
			mysqli_set_charset($conn, "utf8");			
		} catch(mysqli_error $e){				
			die($e->getMessage());
		}

		// $conn->close();
?>