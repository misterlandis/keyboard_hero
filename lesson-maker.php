<?php
//setup database
	require_once 'meekrodb.2.3.class.php';
	DB::$user = 'keyboard_hero';
	DB::$password = 'pondscum_k';
	DB::$dbName = 'keyboard_hero';
	

?>

<html>
<head>

</head>

<body>
<h1>Lesson Maker</h1>


<?php
	//what are we doing?
	if(!empty($_GET['action'])){
		if($_GET['action'] == "save-lesson"){
			//saving a new lesson
			?><h2>Saving Lesson</h2><?php
			var_dump($_GET);
			
			
			
			DB::insert('lessons',array(
				'title' => $_GET['title'],
				'type' => $_GET['type'],
				'objectives' => $_GET['objectives'],
				'content' => $_GET['content'],
				'visible' => $_GET['visible']
				
			)
			);
		}
		elseif($_GET['action'] == "update-lesson"){
			//updating an old lesson
		}
		elseif($_GET['action'] == "new-lesson"){
			//writing a new lesson
			?>
			<h2>Create a new lesson</h2>
			<form action = "lesson-maker.php" method = "get">
				<input type = "hidden" name = "action" value = "save-lesson">
				<input type = "text" name = "title" placeholder = "title">
				<select name = "type">
					<option value="static">Static</option>
					<option value="letter-shuffle">letter-shuffle</option>
					<option value="word-shuffle">word-shuffle</option>
				</select>
				<fieldset>
					<legend>Prerequisites</legend><br />
						<input type = "checkbox" name = "prerequisites[]" value ="one"/>Lesson One<br />
						<input type = "checkbox" name = "prerequisites[]" value ="two"/>Lesson Two<br />
						<input type = "checkbox" name = "prerequisites[]" value ="three"/>Lesson Three<br />
				</fieldset>
				<input type = "text" name = "objectives" placeholder = objectives>
				<br/>
				<textarea name = "content" rows = "4" cols = "50"> </textarea>
				<br />
				<input type = "checkbox" name = "visible">Visible<br />
				<input type = "submit" value = "save message">
			
			</form>
			<?php
		}
	}





?>
</body>

