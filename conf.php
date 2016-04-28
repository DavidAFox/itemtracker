<?php
	set_include_path(__DIR__);
	define("ROOT_PATH", "c://jswork/itemtracker/");
	define('VIEW_PATH' , "/views/");
	define('OTHER_PATH', "/other/");
	$url = getenv('DATABASE_URL');
	$dbparts = parse_url($url);
	$hostname = $dbparts['host'];
	$username = $dbparts['user'];
	$password = $dbparts['pass'];
	$database = ltrim($dbparts['path'], '/');
	define('DATABASE_SERVER', $hostname);
	define('DATABASE_USER', $username);
	define('DATABASE_PASSWORD', $password);
	define('DATABASE_NAME', $database);
//	define('DATABASE_SERVER', 'localhost');
//	define('DATABASE_USER', 'user');
//	define('DATABASE_PASSWORD', '12345');
//	define('DATABASE_NAME', 'tracker');
	define('TEST_DATABASE_SERVER', "localhost:5432");
	define('TEST_DATABASE_USER', "user");
	define('TEST_DATABASE_PASSWORD', "12345");
	define('TEST_DATABASE_NAME', "trackertest");
?>