<?php
//setup database
	require_once 'meekrodb.2.3.class.php';
	DB::$user = 'keyboard_hero';
	DB::$password = 'pondscum_k';
	DB::$dbName = 'keyboard_hero';



$lessons = DB::query("SELECT id, title FROM lessons");

echo json_encode($lessons);
?>