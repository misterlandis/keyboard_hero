<?php

require_once 'meekrodb.2.3.class.php';
DB::$user = 'keyboard_hero';
DB::$password = 'pondscum_k';
DB::$dbName = 'keyboard_hero';

$students = DB::queryFirstColumn("SELECT username FROM students");


//$db_test = DB::queryFirstRow("SELECT username FROM teacher_actions");


//$hello = $_GET["hello"];

/*
foreach($students as $student){
	$student = $student[0];
	
}
*/
echo implode(",",$students);
?> 