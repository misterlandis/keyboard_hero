
<?php
//setup database
	require_once 'meekrodb.2.3.class.php';
	DB::$user = 'keyboard_hero';
	DB::$password = 'pondscum_k';
	DB::$dbName = 'keyboard_hero';






DB::insert('lessons',array(
				'title' => $_GET['title'],
				'type' => $_GET['type'],
				'prerequisites' => implode(",",$_GET['prerequisites']),
				'objectives' => $_GET['objectives'],
				'content' => $_GET['content'],
				'visible' => $_GET['visible']
				
			)
			);
?>