<?php
	require_once("../conf.php");
	require_once(OTHER_PATH . "sessions.php");
	require_once(OTHER_PATH . "data.php");
	require_once(OTHER_PATH . "functions.php");
	$data = new DataStore();
	$ses = new MySession($data);
	$ses->startSession();
	if($ses->loggedIn()) {
		header('Location: tracker.php');
		exit;
	}
	$error = "";
	$errorName = "";
	$errorEmail = "";
	$errorPassword = "";
	$name = "";
	$email = "";
	$password = "";
	if($_SERVER['REQUEST_METHOD']=== "POST") {
		$success = true;
		if(!isset($_POST['name'])) {
			$errorName = "You must enter a name.";
			$success = false;
		} else {
			$name = clean($_POST['name']);
			if(strlen($name) > 45) {
				$errorName = "Name is too long can only be up to 45 characters.";
				$success = false;
			} else {
				if(preg_match("/[^a-zA-Z0-9_\-]+/", $name)) {
					$errorName= "Name can only contain alpha-numeric or _ -";
					$success = false;
				}
			}
		}
		if(!isset($_POST['email'])) {
			$errorEmail = "You must enter an email address.";
			$success = false;
		} else {
			if(strlen($email) > 45) {
				$errorEmail = "Email is too long can only be up to 45 characters.";
				$success = false;
			} else {
				$email = clean($_POST['email']);
				if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
					$errorEmail = "Invalid email format.";
					$success = false;
				}
			}
		}
		if(!isset($_POST['password'])) {
			$errorPassword = "You must enter a password.";
			$success = false;
		} else {
			if(strlen($password) > 500) {
				$errorPassword = "Password is too long can only be up to 500 characters.";
				$success = false;
			}
			if(!(isset($_POST['password2']) && $_POST['password'] === $_POST['password2'])) {
				$errorPassword = "Passwords do not match.";
				$success = false;
			}
			$password = $_POST['password'];
		}
		if($success) {
			$success = false;
			try {
				$success = $data->newUser($name, $email, $password);
			}
			catch(Exception $e) {
				$error = $e->getMessage();
				$success = false;
			}
			if($success) {
				$ses->setMessage("Account Created");
				header('Location: index.php');
				exit;
			}
		}
	}

?>
<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
		<link rel="stylesheet" href="css/login.css">
		<link rel="stylesheet" href="css/main.css">
	</head>
	<body>
		<h1 class="title">Item Tracker</h1>
		<?php
			require(VIEW_PATH . "register_view.php")
		?>
		<br>
		<?= $error ?>
	</body>
</html>