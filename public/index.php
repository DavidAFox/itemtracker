<?php
	require_once("../conf.php");
	require_once(OTHER_PATH . "sessions.php");
	require_once(OTHER_PATH . "pgdata.php");
	$data = new DataStore();
	$ses = new MySession($data);
	$ses->startSession();
	if($ses->loggedIn()) {
		header('Location: tracker.php');
		exit;
	}
	$error = "";
	if($_SERVER['REQUEST_METHOD'] === "POST") {
		if($ses->login($_POST['name'], $_POST['password'])) {
			header('Location: tracker.php');
			exit;
		} else {
			$error = "User name and password do not match.";
		}
	}
?>
<!DOCTYPE html>
<html>
	<head>
	    <script   src="https://code.jquery.com/jquery-1.12.3.min.js"   integrity="sha256-aaODHAgvwQW1bFOGXMeX+pC4PZIPsvn2h1sArYOhgXQ="   crossorigin="anonymous"></script>    
<!-- Optional theme -->
	    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">

<!-- Latest compiled and minified JavaScript -->
	    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>

		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
		<link rel="stylesheet" href="css/login.css">
		<link rel="stylesheet" href="css/main.css">
	</head>
	<body>
		<h1 class="title">Item Tracker</h1>
		<?php
			require(VIEW_PATH . "login_view.php")
		?>
		<br>
		<?= $ses->getMessage() ?>
		<br>
		<?= $error ?>
	</body>
</html>