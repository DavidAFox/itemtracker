<?php
	require_once(dirname(dirname(__FILE__)) . "/conf.php");
    class ApiData {
        private $user_id;
        private $connected;
        private $conn;
        public function __construct($user_id, $servername = DATABASE_SERVER, $username = DATABASE_USER, $password = DATABASE_PASSWORD, $databasename = DATABASE_NAME) {
            $this->user_id = $user_id;
			$this->conn = mysqli_connect($servername, $username, $password, $databasename);
			if ($this->conn->connect_error) {
				die("Connection failed: " . $this->conn->connect_error);
			}
			$this->connected = true;
		}
		public function isConnected() {
			return $this->connected;
		}
        public function getItems() {
            $stmt = $this->conn->prepare("SELECT id, name, price, salePrice, quantity, description, date FROM items WHERE user_id = ?");
            if(!$stmt) {
                echo $this->conn->error;
            }
            $stmt->bind_param("i", $this->user_id);
            if(!$stmt->execute()) {
                throw new Exception("Error getting items");
            }
            $stmt->store_result();
            $stmt->bind_result($id, $name, $price, $salePrice, $quantity, $description, $date);
            $items = array();
            $i = 0;
            while($stmt->fetch()) {
                $item = array();
                $item['id'] = $id;
                $item['name'] = $name;
                $item['price'] =  $price;
                $item['salePrice'] =  $salePrice;
                $item['quantity'] = $quantity;
                $item['description'] = $description;
                $item['date'] = $date;
                $items[$i] = $item;
                $i += 1;
            }
            $stmt->close();
            return $items;
        }
        public function getItem($id) {
            $stmt = $this->conn->prepare("SELECT id, name, price, salePrice, quantity, description, date FROM items WHERE user_id = ? AND id = ?");
            $stmt->bind_param("ii", $this->user_id, $id);
            if(!$stmt->execute()) {
                throw new Exception("Error getting item");
            }
            $stmt->store_result();
            $stmt->bind_result($id, $name, $price, $salePrice, $quantity, $description, $date);
            $stmt->fetch();
            if($stmt->num_rows === 0) {
                throw new Exception("No item with that id found");
            }
            $item = array();
            $item['id'] = $id;
            $item['name'] = $name;
            $item['price'] =  $price;
            $item['salePrice'] =  $salePrice;
            $item['quantity'] = $quantity;
            $item['description'] = $description;
            $item['date'] = $date;
            $stmt->close();
            return $item;
        }
        public function validItemId($id) {
            $stmt = $this->conn->prepare("SELECT id FROM items WHERE user_id = ? AND id = ?");
            $stmt->bind_param("ii", $this->user_id, $id);
            if(!$stmt->execute()) {
                throw new Exception("Error checking id");
            }
            $stmt->store_result();
            $stmt->bind_result($foundid);
            $stmt->fetch();
            return $stmt->num_rows > 0;
        }
        public function newItem($item) {
            $this->validateItem($item);
            if($this->validItemId($item['id'])) {
                throw new Exception("An item with that id already exists");
            }
            $stmt = $this->conn->prepare("INSERT INTO items (user_id, id, name, price, salePrice, quantity, description, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("iisiiiss", $this->user_id, $item['id'], $item['name'], $item['price'], $item['salePrice'], $item['quantity'], $item['description'], $item['date']);
            if(!$stmt->execute()) {
                throw new Exception("Error adding item");
            }
            $stmt->close();
        }
        public function updateItem($item) {
            $this->validateItem($item);
            if(!$this->validItemId($item['id'])) {
                throw new Exception("No item with that id found");
            }
            $stmt = $this->conn->prepare("UPDATE items SET name = ?, price = ?, salePrice = ?, quantity = ?, description = ?, date = ? WHERE user_id = ? AND id = ?");
            $stmt->bind_param("siiissii", $item['name'], $item['price'], $item['salePrice'], $item['quantity'], $item['description'], $item['date'], $this->user_id, $item['id']);
            if(!$stmt->execute()) {
                throw new Exception("Error adding item");
            }
            $stmt->close();            
        }
        public function getSales($req) {
            if(isset($req->getQuery()['starting']) && isset($req->getQuery()['ending'])) {
                $stmt = $this->conn->prepare("SELECT id, date, price, originalPrice, originalSalePrice, sTaxRate, quantity, fee, itemId, whereSold, comment FROM sales WHERE user_id = ? AND STRCMP(date, ?) = 1 AND STRCMP (date, ?) = -1");
                if(!$stmt) {
                    echo $this->conn->error;
                }
                $stmt->bind_param("iss", $this->user_id, $req->getQuery()['starting'], $req->getQuery()['ending']);
            } else if (isset($req->getQuery()['starting'])) {
                $stmt = $this->conn->prepare("SELECT id, date, price, originalPrice, originalSalePrice, sTaxRate, quantity, fee, itemId, whereSold, comment FROM sales WHERE user_id = ? AND STRCMP(date, ?) = 1");
                $stmt->bind_param("is", $this->user_id, $req->getQuery()['starting']);
            } else {
                $stmt = $this->conn->prepare("SELECT id, date, price, originalPrice, originalSalePrice, sTaxRate, quantity, fee, itemId, whereSold, comment FROM sales WHERE user_id = ?");
                if(!$stmt) {
                    echo $this->conn->error;
                }
                $stmt->bind_param("i", $this->user_id);
            }
            if(!$stmt->execute()) {
                throw new Exception("Error getting sale list");
            }
            $stmt->bind_result($id, $date, $price, $originalPrice, $originalSalePrice, $sTaxRate, $quantity, $fee, $itemId, $where, $comment);
            $sales = array();
            $i = 0;
            while($stmt->fetch()) {
                $sale = array();
                $sale['id'] = $id;
                $sale['date'] = $date;
                $sale['price'] =  $price;
                $sale['originalPrice'] =  $originalPrice;
                $sale['originalSalePrice'] =  $originalSalePrice;
                $sale['sTaxRate'] =  $sTaxRate;
                $sale['quantity'] = $quantity;
                $sale['fee'] =  $fee;
                $sale['itemId'] = $itemId;
                $sale['where'] = $where;
                $sale['comment'] = $comment;
                $sales[$i] = $sale;
                $i += 1;
            }
            $stmt->close();
            return $sales;
        }
        public function getSale($id) {
            $stmt = $this->conn->prepare("SELECT id, date, price, originalPrice, originalSalePrice, sTaxRate, quantity, fee, itemId, whereSold, comment FROM sales WHERE user_id = ? AND id = ?");
            $stmt->bind_param("ii", $this->user_id, $id);
            if(!$stmt->execute()) {
                throw new Exception("Error getting sale list");
            }
            $stmt->store_result();
            $stmt->bind_result($id, $date, $price, $originalPrice, $originalSalePrice, $sTaxRate, $quantity, $fee, $itemId, $where, $comment);
            $stmt->fetch();            
            if($stmt->num_rows < 1) {
                throw new Exception("Sale not found");
            }
            $sale = array();
            $sale['id'] = $id;
            $sale['date'] = $date;
            $sale['price'] =  $price;
            $sale['originalPrice'] =  $originalPrice;
            $sale['originalSalePrice'] =  $originalSalePrice;
            $sale['sTaxRate'] =  $sTaxRate;
            $sale['quantity'] = $quantity;
            $sale['fee'] =  $fee;
            $sale['itemId'] = $itemId;
            $sale['where'] = $where;
            $sale['comment'] = $comment;
            $stmt->close();
            return $sale;
        }
        public function newSale($sale) {
            $this->validateSale($sale);
            if(!$this->validItemId($sale['itemId'])) {
                throw new Exception("Item not found");
            }
            $this->conn->begin_transaction(MYSQLI_TRANS_START_READ_WRITE);
            $stmt2 = $this->conn->prepare("SELECT quantity FROM items WHERE user_id = ? AND id = ?");
            $stmt2->bind_param("ii", $this->user_id, $sale['itemId']);
            if(!$stmt2->execute()) {
                $this->conn->rollback();
                throw new Exception("Error getting item quantity");
            }
            $stmt2->bind_result($startingQuantity);
            $stmt2->fetch();
            $stmt2->close();
            if($sale['quantity'] > $startingQuantity) {
                $this->conn->rollback();
                throw new Exception("More sold than exists of item");
            }
            $newQuantity = $startingQuantity - $sale['quantity'];
            $stmt3 = $this->conn->prepare("UPDATE items SET quantity = ? WHERE user_id = ? AND id = ?");
            $stmt3->bind_param("iii", $newQuantity, $this->user_id, $sale['itemId']);
            if(!$stmt3->execute()) {
                $this->conn->rollback();
                throw new Exception("Error updating item quantity");
            }
            $stmt3->close();
            $stmt = $this->conn->prepare("INSERT INTO sales (user_id, date, price, originalPrice, originalSalePrice, sTaxRate, quantity, fee, itemId, whereSold, comment) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("isiiidiiiss", $this->user_id, $sale['date'], $sale['price'], $sale['originalPrice'], $sale['originalSalePrice'], $sale['sTaxRate'], $sale['quantity'], $sale['fee'], $sale['itemId'], $sale['where'], $sale['comment']);
            if(!$stmt->execute()) {
                echo $this->conn->error;
                $this->conn->rollback();
                throw new Exception("Error adding sale");
            }
            $stmt->close();
            $this->conn->commit();
        }
        public function updateSale($sale) {
            $this->validateSale($sale);
            if(!$this->validSaleId($sale['id'])) {
                throw new Exception("No sale with that id exists");
            }
            if(!$this->validItemId($sale['itemId'])) {
                throw new Exception("No item with that id exists");
            }
            $stmt = $this->conn->prepare("UPDATE sales SET date = ?, price = ?, originalPrice = ?, originalSalePrice = ?, sTaxRate = ?, quantity = ?, fee = ?, itemId = ?, whereSold = ?, comment = ? WHERE user_id = ? AND id = ?");
            $stmt->bind_param("siiidiiissii", $sale['date'], $sale['price'], $sale['originalPrice'], $sale['originalSalePrice'], $sale['sTaxRate'], $sale['quantity'], $sale['fee'], $sale['itemId'], $sale['where'], $sale['comment'], $this->user_id, $sale['id']);
            if(!$stmt->execute()) {
                throw new Exception("Error updating sale");
            }
            $stmt->close();
        }
        public function getStolens($req) {            
            if(isset($req->getQuery()['starting']) && isset($req->getQuery()['ending'])) {
                $stmt = $this->conn->prepare("SELECT id, itemId, quantity, date, price FROM stolen WHERE user_id = ? AND STRCMP(date, ?) = 1 AND STRCMP(date, ?) = -1");
                $stmt->bind_param("iss", $this->user_id, $req->getQuery()['starting'], $req->getQuery()['ending']);
            } else if (isset($req->getQuery()['starting'])) {
                $stmt = $this->conn->prepare("SELECT id, itemId, quantity, date, price FROM stolen WHERE user_id = ? AND STRCMP(date, ?) = 1");
                $stmt->bind_param("is", $this->user_id, $req->getQuery()['starting']);
            } else {
                $stmt = $this->conn->prepare("SELECT id, itemId, quantity, date, price FROM stolen WHERE user_id = ?");
                $stmt->bind_param("i", $this->user_id);
            }
            if(!$stmt->execute()) {
                throw new Exception("Error getting stolen list");
            }
            $stmt->bind_result($id, $itemId, $quantity, $date, $price);
            $stolens = array();
            $i = 0;
            while($stmt->fetch()) {
                $stolen = array();
                $stolen['id'] = $id;
                $stolen['itemId'] = $itemId;
                $stolen['quantity'] = $quantity;
                $stolen['date'] = $date;
                $stolen['price'] =  $price;
                $stolens[$i] = $stolen;
                $i += 1;
            }
            $stmt->close();
            return $stolens;            
        }
        public function getStolen($id) {
            $stmt = $this->conn->prepare("SELECT id, itemId, quantity, date, price FROM stolen WHERE user_id = ? AND id = ?");
            $stmt->bind_param("ii", $this->user_id, $id);
            if(!$stmt->execute()) {
                throw new Exception("Error getting stolen list");
            }
            $stmt->bind_result($id, $itemId, $quantity, $date, $price);
            $stmt->fetch();
            $stolen = array();
            $stolen['id'] = $id;
            $stolen['itemId'] = $itemId;
            $stolen['quantity'] = $quantity;
            $stolen['date'] = $date;
            $stolen['price'] =  $price;
            $stmt->close();
            return $stolen;                        
        }
        public function newStolen($stolen) {
            $this->validateStolen($stolen);
            if(!$this->validItemId($stolen['itemId'])) {
                throw new Exception("Item not found");
            }
            $stmt2 = $this->conn->prepare("SELECT quantity FROM items WHERE user_id = ? AND id = ?");
            $stmt2->bind_param("ii", $this->user_id, $stolen['itemId']);
            if(!$stmt2->execute()) {
                throw new Exception("Error getting item quantity");
            }
            $stmt2->bind_result($startingQuantity);
            $stmt2->fetch();
            $stmt2->close();
            if($stolen['quantity'] > $startingQuantity) {
                throw new Exception("More items stolen than present");
            }
            $newQuantity = $startingQuantity - $stolen['quantity'];
            $this->conn->begin_transaction(MYSQLI_TRANS_START_READ_WRITE);
            $stmt3 = $this->conn->prepare("UPDATE items SET quantity = ? WHERE user_id = ? AND id = ?");
            $stmt3->bind_param("iii", $newQuantity, $this->user_id, $stolen['itemId']);
            if(!$stmt3->execute()) {
                $this->conn->rollback();
                throw new Exception("Error updating item quantity");
            }
            $stmt3->close();
            $stmt = $this->conn->prepare("INSERT INTO stolen (user_id, itemId, quantity, date, price) VALUES (?, ?, ?, ?, ?)");
            $stmt->bind_param("iiisi", $this->user_id, $stolen['itemId'], $stolen['quantity'], $stolen['date'], $stolen['price']);
            if(!$stmt->execute()) {
                $this->conn->rollback();
                throw new Exception("Error creating new stolen");
            }
            $stmt->close();
            $this->conn->commit();            
        }
        public function updateStolen($stolen) {
            $this->validateStolen($stolen);
            $stmt = $this->conn->prepare("UPDATE stolen SET itemId = ?, quantity = ?, date = ?, price = ? WHERE user_id = ? AND id = ?");
            $stmt->bind_param("iisiii", $stolen['itemId'], $stolen['quantity'], $stolen['date'], $stolen['price'], $this->user_id, $stolen['id']);
            if(!$stmt->execute()) {
                throw new Exception("Error updating stolen");
            }
            $stmt->close();
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
            $stmt = $this->conn->prepare("SELECT id FROM sales WHERE user_id = ? AND id = ?");
            $stmt->bind_param("ii", $this->user_id, $id);
            if(!$stmt->execute()) {
                throw new Exception("Error checking id");
            }
            $stmt->store_result();
            $stmt->bind_result($foundid);
            $stmt->fetch();
            return $stmt->num_rows > 0;
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
            if(!$this->validItemId($sale['itemId'])) {
                throw new Exception("Invalid item id");
            }
        }
    }
