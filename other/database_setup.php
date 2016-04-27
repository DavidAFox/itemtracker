<?php
	function setupDatabase($database_server, $database_user, $database_password, $database_name) {
		$conn = mysqli_connect($database_server, $database_user, $database_password, $database_name);
		$sql = "CREATE TABLE `game` (
			`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  			`name` VARCHAR(45) NOT NULL,
  			`current_turn` INT UNSIGNED NOT NULL DEFAULT 1,
  			PRIMARY KEY (`id`))";
		if(!$conn->query($sql) === TRUE) {
			echo "Error creating game: " . $conn->error;
		}


		$sql = "ALTER TABLE `game` 
			ADD COLUMN `phase` VARCHAR(45) NOT NULL DEFAULT 'order' AFTER `current_turn`";

		if(!$conn->query($sql) === TRUE) {
			echo "Error creating game: " . $conn->error;
		}
		$sql = "CREATE TABLE `turn` (
  			`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  			`board_status` JSON NULL,
  			`turn_number` INT UNSIGNED NOT NULL,
  			`game_id` INT UNSIGNED NOT NULL,
  			PRIMARY KEY (`id`),
  			UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  			INDEX `game_id_idx` (`game_id` ASC),
  			CONSTRAINT `game_id`
	    		FOREIGN KEY (`game_id`)
    			REFERENCES `diplomacy`.`game` (`id`)
    			ON DELETE CASCADE
    			ON UPDATE NO ACTION)";
		if(!$conn->query($sql) === TRUE) {
			echo "Error creating turn: " . $conn->error;
		}

		$sql = "CREATE TABLE `order` (
	  		`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	  		`turn_id` INT UNSIGNED NOT NULL,
	  		`player_id` INT UNSIGNED NOT NULL,
	  		`game_id` INT UNSIGNED NOT NULL,
	  		`unit` VARCHAR(45) NOT NULL,
	  		`starting_location` VARCHAR(45) NOT NULL,
	  		`target_location` VARCHAR(45) NULL,
	  		`order` VARCHAR(45) NOT NULL,
	  		PRIMARY KEY (`id`))";
		if(!$conn->query($sql) === TRUE) {
			echo "Error creating order: " . $conn->error;
		}
		$sql = "CREATE TABLE `user` (
	  		`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	  		`email` VARCHAR(45) NOT NULL,
	  		`name` VARCHAR(45) NOT NULL,
	  		`password` VARCHAR(45) NOT NULL,
	  		PRIMARY KEY (`id`))";
		if(!$conn->query($sql) === TRUE) {
			echo "Error creating user: " . $conn->error;
		}
		$sql = "CREATE TABLE `player` (
	  		`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	  		`user_id` INT UNSIGNED NOT NULL,
	  		`nation` VARCHAR(45) NOT NULL,
	  		`game_id` INT UNSIGNED NOT NULL,
	  		PRIMARY KEY (`id`),
	  		INDEX `user_id_player_idx` (`user_id` ASC),
	  		INDEX `game_id_player_idx` (`game_id` ASC),
	  		CONSTRAINT `user_player_id`
	    		FOREIGN KEY (`user_id`)
	    		REFERENCES `diplomacy`.`user` (`id`)
	    		ON DELETE NO ACTION
	    		ON UPDATE NO ACTION,
	  		CONSTRAINT `game_player_id`
	    		FOREIGN KEY (`game_id`)
	    		REFERENCES `diplomacy`.`game` (`id`)
	    		ON DELETE CASCADE
	    		ON UPDATE NO ACTION)";

		if(!$conn->query($sql) === TRUE) {
			echo "Error creating user: " . $conn->error;
		}
		$sql = "ALTER TABLE `order` 
			CHANGE COLUMN `turn_id` `turn_number` INT(10) UNSIGNED NOT NULL ,
			ADD INDEX `game_id_order_idx` (`game_id` ASC),
			ADD INDEX `player_id_order_idx` (`player_id` ASC);
			ALTER TABLE `diplomacy`.`order` 
			ADD CONSTRAINT `game_id_order`
	  		FOREIGN KEY (`game_id`)
	  		REFERENCES `diplomacy`.`game` (`id`)
	  		ON DELETE CASCADE
	  		ON UPDATE NO ACTION,
			ADD CONSTRAINT `player_id_order`
	  		FOREIGN KEY (`player_id`)
	  		REFERENCES `diplomacy`.`player` (`id`)
	  		ON DELETE NO ACTION
	  		ON UPDATE NO ACTION";
		if(!$conn->query($sql) === TRUE) {
			echo "Error updating order: " . $conn->error;
		}
		$sql = "CREATE TABLE `finished` (
	  		`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	  		`game_id` INT UNSIGNED NOT NULL,
	  		`player_id` INT UNSIGNED NOT NULL,
	  		`turn_number` INT UNSIGNED NOT NULL,
	  		`phase` VARCHAR(45) NOT NULL,
	  		PRIMARY KEY (`id`),
	  		INDEX `finished_game_id_idx` (`game_id` ASC),
	  		INDEX `finished_player_id_idx` (`player_id` ASC),
	  		CONSTRAINT `finished_game_id`
	    		FOREIGN KEY (`game_id`)
	    		REFERENCES `diplomacy`.`game` (`id`)
	    		ON DELETE CASCADE
	    		ON UPDATE NO ACTION,
	  		CONSTRAINT `finished_player_id`
	    		FOREIGN KEY (`player_id`)
	    		REFERENCES `diplomacy`.`player` (`id`)
	    		ON DELETE NO ACTION
	    		ON UPDATE NO ACTION)";
		if(!$conn->query($sql) === TRUE) {
			echo "Error creating finished: " . $conn->error;
		}
		$sql = "CREATE TABLE `dislodged` (
	  		`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	  		`unit_type` VARCHAR(45) NOT NULL,
	  		`player_id` INT UNSIGNED NOT NULL,
	  		`location` VARCHAR(45) NOT NULL,
	  		`turn_number` INT UNSIGNED NOT NULL,
	  		`attacked_from` VARCHAR(45) NULL,
	  		`standoffs` JSON NULL,
	  		PRIMARY KEY (`id`),
	  		INDEX `dislodged_player_id_idx` (`player_id` ASC),
	  		CONSTRAINT `dislodged_player_id`
	    		FOREIGN KEY (`player_id`)
	    		REFERENCES `diplomacy`.`player` (`id`)
	    		ON DELETE NO ACTION
	    		ON UPDATE NO ACTION)";
		if(!$conn->query($sql) === TRUE) {
			echo "Error creating dislodged: " . $conn->error;
		}
		$sql = "ALTER TABLE `user` 
			ADD UNIQUE INDEX `name_email_unq` (`email` ASC, `name` ASC)";
		if(!$conn->query($sql) === TRUE) {
			echo "Error updating user: " . $conn->error;
		}
	}
?>
