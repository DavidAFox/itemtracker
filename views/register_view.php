
<form class= "well" class="register-form" action="register.php" method="post">
	<table>
		<tr>
			<td><label>Name: </label></td>
			<td><input type="text" name="name" placeholder="User name" value=<?= '"' . $name . '"'?>/></td>
			<td><span class= "error"><?= $errorName ?></span></td>
		</tr>
		<tr>
			<td><label >Email: </label></td>
			<td><input type="email" name="email" placeholder="email@example.com" value=<?= '"' . $email . '"'?>/></td>
			<td><span class= "error"><?= $errorEmail ?></span></td>
		</tr>
		<tr>
			<td><label >Password: </label></td>
			<td><input type="password" name="password"  placeholder= "Enter your password."/></td>
			<td><span class= "error"><?= $errorPassword ?></span></td>
		</tr>
		<tr>
			<td><label >Password: </label></td>
			<td><input type="password" name="password2"  placeholder="Re-enter your password."/></div></td>
		</tr>
	</table>
	<div><input type="submit" value="submit"></div><br>
</form>
