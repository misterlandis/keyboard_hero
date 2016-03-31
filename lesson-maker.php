<html>
<head>
 <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Anonymous Pro">
<link rel="stylesheet" type="text/css" href="style.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script src="lesson-maker.js"></script>
</head>
<body>
	<h1> Lesson Manager</h1>
	
	<div id = "lesson-menu"></div>
	
	<br />
	<form id = "lesson-edit">
	<input type="hidden" name="id" id="lesson-id" value="new">
	Title: <input type="text" placeholder="title" id="title"></input>
	<br />
	Type: <select id = "type">
		<option value = "static">Static</option>
		<option value = "letter-shuffle">Letter Shuffle</option>
		<option value = "word-shuffle">Word Shuffle</option>
	</select>
	<br/>
	Prerequisites:<div id = "prerequisites"></div>
	<br/>
	Objectives: <input type="text" id= "objectives" placeholder="objectives"></input>
	<br/>
	Content:<textarea rows = "4", cols = "50" id="content"></textarea>
	<br/>
	Visible: <input type="checkbox" class = "visible" id="visible" value = "visible">
	<input type = "button" value="save" id="save-lesson"></input>
	</form>
	<div id = "debug"/>
</body>
</html>