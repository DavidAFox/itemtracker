<?php
    require_once(dirname(dirname(__FILE__)) . "/conf.php");
    class DataStore {
        private $databasename;
        private $conn;
        private $connected = false;
        public function setConn($conn) {
            $this->conn = $conn;
            $this->connected = $this->conn->ping();
        }
        public function __construct($servername = DATABASE_SERVER, $username = DATABASE_USER, $password = DATABASE_PASSWORD, $databasename = DATABASE_NAME) {
            $this->databaseName = $databasename;
            try {
                $this->conn = new PDO('pgsql:host=' . $servername . ';dbname=' . $databasename, $username, $password);
            } catch (PDOException $e) {
                echo "Error connecting to database: ". $e->getMessage();
                die();
            }
            $this->connected = true;
        }
        public function isConnected() {
            return $this->connected;
        }
        public function validUser($name) {
  			try {
                $stmt = $this->conn->prepare("SELECT id FROM users WHERE name = (?)");
                $stmt->execute(array($name));
                $res = $stmt->fetch();
              } catch (PDOException $e) {
                  echo "Query failed in validUser";
              }
           return !isset($id);            
       } 
       public function authenticate($name, $password) {
           try {
                $stmt = $this->conn->prepare("SELECT password FROM users WHERE name = ?");
                $stmt->execute(array($name));
                $res = $stmt->fetch();
           } catch (PDOException $e) {
               echo "Query failed in authenticate";
           }
           if(!isset($res['password'])) {
               return false;
           }
           return password_verify($password, $res['password']);
       }
       public function getPassword($name) {
           try {
                $stmt = $this->conn->prepare("SELECT password FROM users WHERE name = (?)");
                $stmt->execute(array($name));
                $res = $stmt->fetch();
           } catch (PDOException $e) {
               echo "Query failed in getPassword";
           }
           if(!isset($res['password'])) {
               return null;
           }
           return $res['password'];
       }
       public function getUserId($name) {
           try {
               $stmt = $this->conn->prepare("SELECT id FROM users WHERE name = ?");
               $stmt->execute(array($name));
               $res = $stmt->fetch();
           } catch(PDOException $e) {
               echo "Query fialed in getUserId";
           }
           if(!isset($res['id'])) {
               return null;
           }
           return $res['id'];
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
            $password = password_hash($password, PASSWORD_DEFAULT);
            try {
			    $stmt = $this->conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
                $success = $stmt->execute(array($name, $email, $password));
            } catch(PDOException $e) {
                if ($stmt->errorCode() == 2601 || 2627) {
                    throw new Exception("A user with that name already exists");
                } else {
                    echo "Insert failed in newUser";
                }
            }
            if(!$success) {
                echo $stmt->errorInfo()[2];
                echo $stmt->errorInfo()[0];
            }
           return $success;
       }
       public function close() {
           $this->conn = null;
           $this->connected = false;
       }
    }

?>