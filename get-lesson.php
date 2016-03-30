<?php
//setup database
	require_once 'meekrodb.2.3.class.php';
	DB::$user = 'keyboard_hero';
	DB::$password = 'pondscum_k';
	DB::$dbName = 'keyboard_hero';



$lesson = DB::queryFirstRow("SELECT * FROM lessons WHERE id=%i", $_GET['id']);

echo json_encode($lesson);
?>