<?php
/*
	//Right now it uses too many things that can't be easily tested in phpunit

	require_once("./conf.php");
	require_once(OTHER_PATH . "data.php");
	require_once(OTHER_PATH . "sessions.php");
	
	class SessionsTest extends PHPUnit_Framework_TestCase {
		private function setUpDatabase() {
			$conn = new mysqli(TEST_DATABASE_SERVER,TEST_DATABASE_USER, TEST_DATABASE_PASSWORD, TEST_DATABASE_NAME);
			if($conn->connect_errno) {
				die("Error connecting to database");
			}
			$conn->begin_transaction(MYSQLI_TRANS_START_READ_WRITE);
			$password = password_hash('12345', PASSWORD_DEFAULT);
			$name = 'David';
			$email = 'david@example.com';
			$stmt = $conn->prepare("INSERT INTO user (name, email, password) VALUES (?, ?, ?)");
			$stmt->bind_param('sss', $name, $email, $password);
			if(!$stmt->execute()){
				die("Error inserting: " . $conn->error);
			}
			return $conn;			
		}
		public function testLoggedInNotLogged() {
			$conn = $this->setUpDatabase();
			$data = new DataStore();
			$data->setConn($conn);
			$ses = new MySession($data);
			$ses->startSession();
			$this->assertEquals($ses->loggedIn(), false);
			session_destroy();
			$conn->rollback();
			$conn->close();
		}
		public function testLoggedInLogged() {
			$conn = $this->setUpDatabase();
			$data = new DataStore();
			$data->setConn($conn);
			$ses = new MySession($data);
			$ses->startSession();
			$ses->login('David', '12345');
			$this->assertEquals($ses->loggedIn(), false);
			session_destroy();
			$conn->rollback();
			$conn->close();
		}

	}
*/

?>