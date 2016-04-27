<?php
	require_once(dirname(dirname(__FILE__)) . "/conf.php");
	//TODO: should replace echos with logging of some kind
	class DataStore {
		private $databasename;
		private $conn;
		private $connected = false;
		public function setConn($conn) {
			$this->conn = $conn;
			$this->connected = $this->conn->ping();
		}
		public function __construct($servername = DATABASE_SERVER, $username = DATABASE_USER, $password = DATABASE_PASSWORD, $databasename = DATABASE_NAME) {
			$this->databasename = $databasename;
			$this->conn = mysqli_connect($servername, $username, $password, $databasename);
			if ($this->conn->connect_error) {
				die("Connection failed: " . $this->conn->connect_error);
			}
			$this->connected = true;
		}
		public function isConnected() {
			return $this->connected;
		}
		public function validUser($name) {
			$stmt = $this->conn->prepare("SELECT id FROM user WHERE name = (?)");
			$stmt->bind_param("s", $name);
			if(!$stmt->execute()){
				echo "Query failed in validUser";
			}
			$stmt->bind_result($id);
			$stmt->fetch();
			$stmt->close();
			return !is_null($id);
		}
		public function authenticate($name, $password) {
			$stmt = $this->conn->prepare("SELECT password FROM user WHERE name = (?)");
			$stmt->bind_param("s", $name);
			if(!$stmt->execute()) {
				echo "Query failed in authenticate";
			}
			$stmt->bind_result($dbPass);
			$stmt->fetch();
			$stmt->close();
			return password_verify($password, $dbPass);
		}
		public function getPassword($name) {
			$stmt = $this->conn->prepare("SELECT password FROM user WHERE name = (?)");
			$stmt->bind_param("s", $name);
			if(!$stmt->execute()) {
				echo "Query failed in getPassword";
			}
			$stmt->bind_result($dbPass);
			$stmt->fetch();
			$stmt->close();
			return $dbPass;
		}
		public function getUserId($name) {
			$stmt = $this->conn->prepare("SELECT id FROM user WHERE name = (?)");
			$stmt->bind_param("s", $name);
			if(!$stmt->execute()) {
				echo "Query failed in getUserId";
			}
			$stmt->bind_result($id);
			$stmt->fetch();
			$stmt->close();
			return $id;
		}
		public function newUser($name, $email, $password) {
			if (strlen($name) > 45) {
				throw new Exception("That name is too long must be 45 characters or less");
			}
			if(strlen($email) > 45) {
				throw new Exception("That email is too long must be 45 characters or less");
			}
			if(strlen($password) > 500) {
				throw new Exception("That password is too long must be 500 characters or less");
			}
			if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
				throw new Exception("Not a valid email format");
			}
			if(preg_match("/[^a-zA-Z0-9_\-]+/", $name)) {
				throw new Exception("Not a valid name only alpha numeric or _ -");
			}
			$stmt = $this->conn->prepare("INSERT INTO user (name, email, password) VALUES (?, ?, ?)");
			$password = password_hash($password, PASSWORD_DEFAULT);
			$stmt->bind_param("sss", $name, $email, $password);
			$success = $stmt->execute();
			if($stmt->errno === 1062) {
				$stmt->close();
				throw new Exception("A user with that name already exists");
			}
			$stmt->close();
			return $success;
		}
		public function close() {
			$this->conn->close();
			$this->connected = false;
		}
	}


?>