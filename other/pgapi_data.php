<?php
	require_once(dirname(dirname(__FILE__)) . "/conf.php");
    class ApiData {
        private $user_id;
        private $connected;
        private $conn;
        public function __construct($user_id, $servername = DATABASE_SERVER, $username = DATABASE_USER, $password = DATABASE_PASSWORD, $databasename = DATABASE_NAME) {
            $this->user_id = $user_id;
            try {
			    $this->conn = new PDO('pgsql:host=' . $servername . ';dbname=' . $databasename, $username, $password);
            } catch (PDOException $e) {
                die("Database connection failed");
            }
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			$this->connected = true;
		}
		public function isConnected() {
			return $this->connected;
		}
        public function getItems() {
            try {
                $stmt = $this->conn->prepare("SELECT id, name, price, salePrice, quantity, description, date FROM items WHERE user_id = ?");
                $stmt->execute(array($this->user_id));
            } catch(PDOException $e) {
                throw new Exception("Error getting items: " . $e->getMessage());
            }
            $items = array();
            $i = 0;
            while($row = $stmt->fetch()) {
                $item = array();
                $item['id'] = $row['id'];
                $item['name'] = $row['name'];
                $item['price'] =  $row['price'];
                $item['salePrice'] =  $row['saleprice'];
                $item['quantity'] = $row['quantity'];
                $item['description'] = $row['description'];
                $item['date'] = $row['date'];
                $items[$i] = $item;
                $i += 1;
            }            
            return $items;
        }
        public function getItem($id) {
            try {
                $stmt = $this->conn->prepare("SELECT id, name, price, salePrice, quantity, description, date FROM items WHERE user_id = ? AND id = ?");
                $stmt->execute(array($this->user_id, $id));
            } catch(PDOException $e) {           
                throw new Exception("Error getting item");
            }
            $row = $stmt->fetch();
            if(!$row) {
                throw new Exception("No item with that id found");
            }
            $item = array();
            $item['id'] = $row['id'];
            $item['name'] = $row['name'];
            $item['price'] =  $row['price'];
            $item['salePrice'] =  $row['saleprice'];
            $item['quantity'] = $row['quantity'];
            $item['description'] = $row['description'];
            $item['date'] = $row['date'];
            return $item;
        }
        public function existingItemId($id) {
            try {
            $stmt = $this->conn->prepare("SELECT id FROM items WHERE user_id = ? AND id = ?");
            $stmt->execute(array($this->user_id, $id));
            } catch(PDOException $e) {
                throw new Exception("Error checking id");
            }
            $row = $stmt->fetch();
            return $row;
        }
        //return a suggested id for the next item insertion but does not control for concurrency
        public function nextItemId() {
            try{
                $stmt = $this->conn->prepare("SELECT * FROM (SELECT t1.id as id FROM items t1 WHERE NOT EXISTS(SELECT * FROM items t2 WHERE t2.id=t1.id + 1 AND user_id = ?)UNION SELECT 1 AS id WHERE NOT EXISTS (SELECT* FROM items t3 WHERE t3.id=1 AND user_id = ?)) ot ORDER BY 1");
                $stmt->execute(array($this->user_id, $this->user_id));
            } catch(PDOException $e) {
                throw new Exception("Error getting next id");
            }
            $row = $stmt->fetch();
            if(isset($row[0])) {
                return $row[0] + 1;
            }
            return null;
        }
        public function newItem($item) {
            $this->validateItem($item);
            if($this->existingItemId($item['id'])) {
                throw new Exception("An item with that id already exists");
            }
            try {
                $stmt = $this->conn->prepare("INSERT INTO items (user_id, id, name, price, salePrice, quantity, description, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
                $stmt->execute(array($this->user_id, $item['id'], $item['name'], $item['price'], $item['salePrice'], $item['quantity'], $item['description'], $item['date']));
            } catch(PDOException $e) {
                throw new Exception("Error adding item");
            }
            return $stmt->fetch();
        }
        public function updateItem($item) {
            $this->validateItem($item);
            if(!$this->existingItemId($item['id'])) {
                throw new Exception("No item with that id found");
            }
            try {
                $stmt = $this->conn->prepare("UPDATE items SET name = ?, price = ?, salePrice = ?, quantity = ?, description = ?, date = ? WHERE user_id = ? AND id = ?");
                $stmt->execute(array($item['name'], $item['price'], $item['salePrice'], $item['quantity'], $item['description'], $item['date'], $this->user_id, $item['id']));
            } catch(PDOException $e) {
                throw new Exception("Error adding item");
            }
            return $stmt->fetch();
        }
        public function getSales($req) {
            if(isset($req->getQuery()['starting']) && isset($req->getQuery()['ending'])) {
                try {
                    $stmt = $this->conn->prepare("SELECT id, date, price, originalPrice, originalSalePrice, sTaxRate, quantity, fee, itemId, whereSold, comment FROM sales WHERE user_id = ? AND date > ? AND date < ?");
                    $stmt->execute(array($this->user_id, $req->getQuery()['starting'], $req->getQuery()['ending']));
                } catch(PDOException $e) {
                    throw new Exception("Error getting sales: " . $e->getMessage());
                }
            } else if (isset($req->getQuery()['starting'])) {
                try {
                    $stmt = $this->conn->prepare("SELECT id, date, price, originalPrice, originalSalePrice, sTaxRate, quantity, fee, itemId, whereSold, comment FROM sales WHERE user_id = ? AND date > ?");
                    $stmt->execute(array($this->user_id, $req->getQuery()['starting']));
                } catch(PDOException $e) {
                    throw new Exception("Error getting sales");
                }
            } else {
                try {
                    $stmt = $this->conn->prepare("SELECT id, date, price, originalPrice, originalSalePrice, sTaxRate, quantity, fee, itemId, whereSold, comment FROM sales WHERE user_id = ?");
                    $stmt->execute(array($this->user_id));
                } catch(PDOException $e) {
                    throw new Exception("Error getting sales");
                }
            }
            $sales = array();
            $i = 0;
            while($row = $stmt->fetch()) {
                $sale = array();
                $sale['id'] = $row['id'];
                $sale['date'] = $row['date'];
                $sale['price'] =  $row['price'];
                $sale['originalPrice'] =  $row['originalprice'];
                $sale['originalSalePrice'] =  $row['originalsaleprice'];
                $sale['sTaxRate'] =  $row['staxrate'];
                $sale['quantity'] = $row['quantity'];
                $sale['fee'] =  $row['fee'];
                $sale['itemId'] = $row['itemid'];
                $sale['where'] = $row['wheresold'];
                $sale['comment'] = $row['comment'];;
                $sales[$i] = $sale;
                $i += 1;
            }
            return $sales;
        }
        public function getSale($id) {
            try {
                $stmt = $this->conn->prepare("SELECT id, date, price, originalPrice, originalSalePrice, sTaxRate, quantity, fee, itemId, whereSold, comment FROM sales WHERE user_id = ? AND id = ?");
                $stmt->execute(array($this->user_id, $id));
            } catch(PDOException $e) {
                throw new Exception("Error getting sale list");
            }
            $row = $stmt->fetch();            
            if(!$row) {
                throw new Exception("Sale not found");
            }
            $sale = array();
            $sale['id'] = $row['id'];
            $sale['date'] = $row['date'];
            $sale['price'] =  $row['price'];
            $sale['originalPrice'] =  $row['originalprice'];
            $sale['originalSalePrice'] =  $row['originalsaleprice'];
            $sale['sTaxRate'] =  $row['staxrate'];
            $sale['quantity'] = $row['quantity'];
            $sale['fee'] =  $row['fee'];
            $sale['itemId'] = $row['itemid'];
            $sale['where'] = $row['wheresold'];
            $sale['comment'] = $row['comment'];;
            return $sale;
        }
        public function newSale($sale) {
            $this->validateSale($sale);
            if(!$this->existingItemId($sale['itemId'])) {
                throw new Exception("Item not found");
            }
            try {
                $this->conn->beginTransaction();
                $stmt2 = $this->conn->prepare("SELECT quantity FROM items WHERE user_id = ? AND id = ?");
                $stmt2->execute(array($this->user_id, $sale['itemId']));
            } catch(PDOException $e) {
                throw new Exception("Error getting item quantity");
            }
            $row = $stmt2->fetch();
            if($sale['quantity'] > $row['quantity']) {
                $this->conn->rollback();
                throw new Exception("More sold than exists of item");
            }
            $newQuantity = $row['quantity'] - $sale['quantity'];
            try {
                $stmt3 = $this->conn->prepare("UPDATE items SET quantity = ? WHERE user_id = ? AND id = ?");
                $stmt3->execute(array($newQuantity, $this->user_id, $sale['itemId']));
            } catch(PDOException $e) {
                $this->conn->rollback();
                throw new Exception("Error updating item quantity");
            }
            try {
                $stmt = $this->conn->prepare("INSERT INTO sales (user_id, date, price, originalPrice, originalSalePrice, sTaxRate, quantity, fee, itemId, whereSold, comment) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                $stmt->execute(array($this->user_id, $sale['date'], $sale['price'], $sale['originalPrice'], $sale['originalSalePrice'], $sale['sTaxRate'], $sale['quantity'], $sale['fee'], $sale['itemId'], $sale['where'], $sale['comment']));
            } catch(PDOException $e) {
                $this->conn->rollback();
                throw new Exception("Error adding sale");
            }
            $this->conn->commit();
        }
        public function updateSale($sale) {
            $this->validateSale($sale);
            if(!$this->validSaleId($sale['id'])) {
                throw new Exception("No sale with that id exists");
            }
            if(!$this->existingItemId($sale['itemId'])) {
                throw new Exception("No item with that id exists");
            }
            try {
                $stmt = $this->conn->prepare("UPDATE sales SET date = ?, price = ?, originalPrice = ?, originalSalePrice = ?, sTaxRate = ?, quantity = ?, fee = ?, itemId = ?, whereSold = ?, comment = ? WHERE user_id = ? AND id = ?");
                $stmt->execute(array($sale['date'], $sale['price'], $sale['originalPrice'], $sale['originalSalePrice'], $sale['sTaxRate'], $sale['quantity'], $sale['fee'], $sale['itemId'], $sale['where'], $sale['comment'], $this->user_id, $sale['id']));
            } catch(PDOException $e) {
                throw new Exception("Error updating sale");
            }
        }
        public function getStolens($req) {
            try {            
                if(isset($req->getQuery()['starting']) && isset($req->getQuery()['ending'])) {
                    $stmt = $this->conn->prepare("SELECT id, itemId, quantity, date, price FROM stolen WHERE user_id = ? AND date > ? AND date < ?");
                    $stmt->execute(array($this->user_id, $req->getQuery()['starting'], $req->getQuery()['ending']));
                } else if (isset($req->getQuery()['starting'])) {
                    $stmt = $this->conn->prepare("SELECT id, itemId, quantity, date, price FROM stolen WHERE user_id = ? AND date > ?");
                    $stmt->execute(array($this->user_id, $req->getQuery()['starting']));
                } else {
                    $stmt = $this->conn->prepare("SELECT id, itemId, quantity, date, price FROM stolen WHERE user_id = ?");
                    $stmt->execute(array($this->user_id));
                }
            } catch(PDOException $e) {
                throw new Exception("Error getting stolen list");
            }
            $stolens = array();
            $i = 0;
            while($row = $stmt->fetch()) {
                $stolen = array();
                $stolen['id'] = $row['id'];
                $stolen['itemId'] = $row['itemid'];
                $stolen['quantity'] = $row['quantity'];
                $stolen['date'] = $row['date'];
                $stolen['price'] =  $row['price'];
                $stolens[$i] = $stolen;
                $i += 1;
            }
            return $stolens;            
        }
        public function getStolen($id) {
            try {
                $stmt = $this->conn->prepare("SELECT id, itemId, quantity, date, price FROM stolen WHERE user_id = ? AND id = ?");
                $stmt->execute(array($this->user_id, $id));
            } catch(PDOException $e) {
                throw new Exception("Error getting stolen list");
            }
            $row = $stmt->fetch();
            $stolen = array();
            $stolen['id'] = $row['id'];
            $stolen['itemId'] = $row['itemid'];
            $stolen['quantity'] = $row['quantity'];
            $stolen['date'] = $row['date'];
            $stolen['price'] =  $row['price'];
            return $stolen;                        
        }
        public function newStolen($stolen) {
            $this->validateStolen($stolen);
            if(!$this->existingItemId($stolen['itemId'])) {
                throw new Exception("Item not found");
            }
            try {
                $stmt2 = $this->conn->prepare("SELECT quantity FROM items WHERE user_id = ? AND id = ?");
                $stmt2->execute(array($this->user_id, $stolen['itemId']));
            } catch(PDOException $e) {
                throw new Exception("Error getting item quantity");
            }
            $row = $stmt2->fetch();
            $startingQuantity = $row['quantity'];
            if($stolen['quantity'] > $startingQuantity) {
                throw new Exception("More items stolen than present");
            }
            $newQuantity = $startingQuantity - $stolen['quantity'];
            $this->conn->beginTransaction();
            try {
                $stmt3 = $this->conn->prepare("UPDATE items SET quantity = ? WHERE user_id = ? AND id = ?");
                $stmt3->execute(array($newQuantity, $this->user_id, $stolen['itemId']));
            } catch(PDOException $e) {
                $this->conn->rollback();
                throw new Exception("Error updating item quantity");
            }
            try {
                $stmt = $this->conn->prepare("INSERT INTO stolen (user_id, itemId, quantity, date, price) VALUES (?, ?, ?, ?, ?)");
                $stmt->execute(array($this->user_id, $stolen['itemId'], $stolen['quantity'], $stolen['date'], $stolen['price']));
            } catch(PDOException $e) {
                $this->conn->rollback();
                throw new Exception("Error creating new stolen");
            }
            $this->conn->commit();            
        }
        public function updateStolen($stolen) {
            $this->validateStolen($stolen);
            try {
                $stmt = $this->conn->prepare("UPDATE stolen SET itemId = ?, quantity = ?, date = ?, price = ? WHERE user_id = ? AND id = ?");
                $stmt->execute(array($stolen['itemId'], $stolen['quantity'], $stolen['date'], $stolen['price'], $this->user_id, $stolen['id']));
            } catch(PDOException $e) {
                throw new Exception("Error updating stolen");
            }
        }
        private function validateStolen($stolen) {
            if(!isset($stolen['itemId'])) {
                throw new Exception("Missing itemId");
            }
            if(!isset($stolen['quantity'])) {
                throw new Exception("Missing quantity");
            }
            if(!isset($stolen['date'])) {
                throw new Exception("Missing date");
            }
            if(!isset($stolen['price'])) {
                throw new Exception("Missing price");
            }
        }
        public function validSaleId($id) {
            try {
                $stmt = $this->conn->prepare("SELECT id FROM sales WHERE user_id = ? AND id = ?");
                $stmt->execute(array($this->user_id, $id));
            } catch(PDOException $e) {
                throw new Exception("Error checking id");
            }
            $row = $stmt->fetch();
            return isset($row['id']);
        }
        private function validateItem($item) {
            if(!isset($item['id'])) {
                throw new Exception("Missing id");
            }
            if(!isset($item['name'])) {
                throw new Exception("Missing name");
            }
            if(!isset($item['price'])) {
                throw new Exception("Missing price");
            }
            if(!isset($item['salePrice'])) {
                throw new Exception("Missing sale price");
            }
            if(!isset($item['quantity'])) {
                throw new Exception("Missing quantity");
            }
            if(!isset($item['description'])) {
                throw new Exception("Missing description");
            }
            if(!isset($item['date'])) {
                throw new Exception("Missing date");
            }
            if(preg_match("/[^0-9]+/", $item['id'] !== 0)) {
                throw new Exception("Invalid id, id can only contain 0-9");
            }
            if($item['id'] < 0) {
                throw new Exception("id must be greater than 0");
            }
            if(strlen($item['name']) > 90) {
                throw new Exception("Name too long can only be up to 90 characters");
            }
            if(preg_match("/[\"<>&]+/", $item['name']) !== 0) {
                throw new Exception("Name cannot contain \" < > &");
            }
            if(strlen($item['description']) > 1000) {
                throw new Exception("Description too long can only be up to 1000 characters");
            }
            if(preg_match("/[\"<>&]+/", $item['description']) !== 0) {
                throw new Exception("Description cannot contain \" < > &");
            }
        }
        private function validateSale($sale) {
            if(!isset($sale['date'])) {
                throw new Exception("Missing date");
            }
            if(!isset($sale['price'])) {
                throw new Exception("Missing price");
            }
            if(!isset($sale['originalPrice'])) {
                throw new Exception("Missing originalPrice");
            }
            if(!isset($sale['originalSalePrice'])) {
                throw new Exception("Missing original sale price");
            }
            if(!isset($sale['sTaxRate'])) {
                throw new Exception("Missing sales tax rate");
            }
            if(!isset($sale['quantity'])) {
                throw new Exception("Missing quantity");
            }
            if(!isset($sale['fee'])) {
                throw new Exception("Missing fee");
            }
            if(!isset($sale['itemId'])) {
                throw new Exception("Missing item Id");
            }
            if(!isset($sale['where'])) {
                throw new Exception("Missing where");
            }
            if(!isset($sale['comment'])) {
                throw new Exception("Missing comment");
            }
            if(preg_match("/[^0-9]+/", $sale['itemId'] !== 0)) {
                throw new Exception("Invalid item id, id can only contain 0-9");
            }
            if(strlen($sale['where']) > 90) {
                throw new Exception("Invalid where, can only be up to 90 characters");
            }
            if(strlen($sale['comment']) > 1000) {
                throw new Exception("Invalid comment, can only be up to 1000 characters");
            }
            if(preg_match("/[\"<>&]+/", $sale['where']) !== 0) {
                throw new Exception("Where cannot contain \" < > &");
            }
            if(preg_match("/[\"<>&]+/", $sale['comment']) !== 0) {
                throw new Exception("Comment cannot contain \" < > &");
            }
            if(!$this->existingItemId($sale['itemId'])) {
                throw new Exception("Invalid item id");
            }
        }
    }
