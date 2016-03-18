<html>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script src="teacher.js"></script>
</head>
	<body>

	<?php
		//setup database
		require_once 'meekrodb.2.3.class.php';
		DB::$user = 'keyboard_hero';
		DB::$password = 'pondscum_k';
		DB::$dbName = 'keyboard_hero';

		//add new student to database if one is submitted
		if(!empty($_GET['action'])){
			if($_GET['action'] == "new-student"){
				DB::query("INSERT INTO `keyboard_hero`.`students` (`username`, `fname`, `lname`, `class`, `sid`, `seatx`, `seaty`) VALUES (%s, %s, %s, %s, %i, %i, %i)", $_GET['username'], $_GET['fname'], $_GET['lname'], $_GET['class'], $_GET['sid'], $_GET['seatx'], $_GET['seaty']);
			}
			elseif($_GET['action'] == "message"){
				DB::query("INSERT INTO `keyboard_hero`.`teacher_actions` (`username`, `action`, `data1`) VALUES (%s, 'message', %s)", $_GET['username'], $_GET['content']);

			}
		}
		//get students from database
		$students = DB::query("SELECT * FROM students");



		//print_r($students);

	?>
	
	<table border = "5"><tr><td colspan = "8">STUDENTS</td></tr>
	<tr><td>id</td><td>username</td><td>first name</td><td>last name</td><td>class</td><td>sid</td><td>x</td><td>y</td></tr>
	<?php
		foreach($students as $s){
			echo "<tr>";
			foreach($s as $c){
				echo "<td>";
				echo $c;
				echo "</td>";
			}
			echo "</tr>";
		}
	?> 
	</table>
	
	<div class = "new-student">
	New Student
		<form action = "teacher.php" method="get">
			<input type = "hidden" name="action" value="new-student">
			<input type="text" name="username" placeholder="user name">
			<input type="text" name="fname" placeholder = "first name">
			<input type="text" name="lname" placeholder = "last name">
			<input type="text" name="class" placeholder = "class">
			<input type="text" name="sid" placeholder = "student id">
			<input type="text" name="seatx" placeholder = "seat x">
			<input type="text" name="seaty" placeholder = "place y">
			<input type="submit" value="New Student">
		</form>
	</div>
	
	<div class = "send message">
	Send Message to student
		<form action = "teacher.php" method ="get">
			<input type = "hidden" name="action" value="message">
			<input type = "text" name="username" placeholder="username">
			<input type = "textarea" name="content" placeholder = "message">
			<input type = "submit" value="send message">
		</form>
	</div>
	</body>
</html>