<?php
	require_once(dirname(dirname(__FILE__)) . "/conf.php");
	require_once(OTHER_PATH . 'data.php');
	require_once(OTHER_PATH . 'functions.php');
	class MySession {
		private $data;
		public function __construct($data) {
			$this->data = $data;
		}
		public function startSession() {
			$httponly = true;
			$secure = false; //should be true for deployment/when a cert is available for https
			$cookieParams = session_get_cookie_params();
			session_set_cookie_params($cookieParams['lifetime'], $cookieParams['path'], $cookieParams['domain'], $secure, $httponly);
			session_name('tracker');
			session_start();
//			session_regenerate_id(true);
		}
		public function loggedIn() {
			if(!isset($_SESSION['user_id']) || !isset($_SESSION['name']) || !isset($_SESSION['token'])) {
				return false;
			}
			$userId = $_SESSION['user_id'];
			$name = $_SESSION['name'];
			$token = $_SESSION['token'];
			$user_browser = $_SERVER['HTTP_USER_AGENT'];
			if(!$this->data->validUser($name)) {
				return false;
			}
			$passwordHash = $this->data->getPassword($name);
			$dbToken = hash('sha512', $passwordHash . $user_browser);
			if (hash_equals($token, $dbToken)){
				return true;
			}
			return false;
		}
		public function login($name, $password) {
			if(!$this->data->authenticate($name, $password)) {
				return false;
			}
			$user_browser = $_SERVER['HTTP_USER_AGENT'];
			$user_id = preg_replace("/[^0-9]+/", "", $this->data->getUserId($name));
			$_SESSION['user_id'] = $user_id;
			$_SESSION['token'] = hash('sha512', $this->data->getPassword($name) . $user_browser);
			$name = preg_replace("/[^a-zA-Z0-9_\-]+/", "", $name);
			$_SESSION['name'] = $name;
			return true;
		}
		public function getUserId() {
			return $this->data->getUserId($_SESSION['name']);
		}
		public function logout() {
			$_SESSION = array();
			$params = session_get_cookie_params();
			setcookie(session_name(), '', time() - 42000, $params["path"], $params["domain"], $params["secure"], $params["httponly"]);
			session_destroy();
			header('Location: /index.php');
		}
		public function setMessage($m) {
			$_SESSION['message'] = $m;
		}
		public function getMessage() {
			if(isset($_SESSION['message'])) {
				$message = clean($_SESSION['message']);
				$_SESSION = "";
				return $message;
			}
		}
	}
?>