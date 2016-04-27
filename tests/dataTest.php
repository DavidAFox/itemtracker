<?php
	require_once("./conf.php");
	require_once(OTHER_PATH . "data.php");
	
	class DataTest extends PHPUnit_Framework_TestCase {
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
		public function testValidUserWithValidUser() {
			$conn = $this->setUpDatabase();
			$data = new DataStore();
			$data->setConn($conn);
			$this->assertEquals($data->validUser('David'), true);
			$conn->rollback();
			$conn->close();
		}
		public function testValidUserWithInvalidUser() {
			$conn = $this->setUpDatabase();
			$data = new DataStore();
			$data->setConn($conn);
			$this->assertEquals($data->validUser('Fred'), false);
			$conn->rollback();
			$conn->close();
		}
		public function testAuthenticateWithValidUser() {
			$conn = $this->setUpDatabase();
			$data = new DataStore();
			$data->setConn($conn);
			$this->assertEquals($data->authenticate('David', '12345'), true);
			$conn->rollback();
			$conn->close();
		}
		public function testAuthenticateWithInvalidUser() {
			$conn = $this->setUpDatabase();
			$data = new DataStore();
			$data->setConn($conn);
			$this->assertEquals($data->authenticate('Fred', 'notthepassword'), false);
			$conn->rollback();
			$conn->close();
		}
		public function testAuthenticateWithValidUserInvalidPassword() {
			$conn = $this->setUpDatabase();
			$data = new DataStore();
			$data->setConn($conn);
			$this->assertEquals($data->authenticate('David', 'notthepassword'), false);
			$conn->rollback();
			$conn->close();
		}
		public function testAuthenticateWithNullPassword() {
			$conn = $this->setUpDatabase();
			$data = new DataStore();
			$data->setConn($conn);
			$this->assertEquals($data->authenticate('Fred', NULL), false);
			$conn->rollback();
			$conn->close();
		}
		public function testGetPassword() {
			$conn = $this->setUpDatabase();
			$data = new DataStore();
			$data->setConn($conn);
			$this->assertEquals(password_verify('12345', $data->getPassword('David')), true);
			$conn->rollback();
			$conn->close();
		}
		public function testGetPasswordDoesNotExist() {
			$conn = $this->setUpDatabase();
			$data = new DataStore();
			$data->setConn($conn);
			$this->assertEquals($data->getPassword('Fred'), NULL);
			$conn->rollback();
			$conn->close();
		}
		public function testGetUserId() {
			$conn = $this->setUpDatabase();
			$data = new DataStore();
			$data->setConn($conn);
			$stmt = $conn->prepare("SELECT id FROM user WHERE name = (?)");
			$name = 'David';
			$stmt->bind_param("s", $name);
			$stmt->execute();
			$stmt->bind_result($id);
			$stmt->fetch();
			$stmt->close();
			$this->assertEquals($data->getUserId('David'), $id);
		}
	}
?>