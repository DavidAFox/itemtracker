<?php
	function cleanString($s) {
		$s = trim($s);
		$s = stripslashes($s);
		$s = htmlspecialchars($s);
		return $s;
	}
?>