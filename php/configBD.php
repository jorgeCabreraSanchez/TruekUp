<?php
	
	define('DBhost', 'localhost');
	define('DBuser', 'root');
	define('DBPass', 'root');
	define('DBname', 'bdtruekup');
	
	try {
		
		$DBcon = new PDO("mysql:host=".DBhost.";dbname=".DBname,DBuser,DBPass);
		
	} catch(PDOException $e){
		
		die($e->getMessage());
	}