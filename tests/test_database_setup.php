<?php
	require("../other/database_setup.php");
	$conn = new mysqli("localhost", "user", "12345");
	if($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
	$sql = "CREATE DATABASE diplomacyTest";
	if($conn->query($sql) === TRUE) {
		echo "Database created successfully";
	} else {
		echo "Error creating Database: " . $conn->error;
	}
	$conn->close();
	setupDatabase("localhost", "user", "12345", "diplomacyTest");
?>